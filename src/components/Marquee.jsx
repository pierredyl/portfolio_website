import { marqueeItems } from '../data/site'

function Row({ ariaHidden }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="meta text-text-muted">{item}</span>
          <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-accent/60" />
        </li>
      ))}
    </ul>
  )
}

/**
 * Full-bleed scrolling tech strip between About and Projects.
 * Pure CSS animation — no JS, no rAF. The list is duplicated so the -50%
 * keyframe lands exactly on a seam; the copy is aria-hidden.
 *
 * Edge fade is done with static gradient overlays rather than mask-image —
 * a CSS mask combined with an animated transform child is a known
 * flicker/blank-out combination in Chromium and WebKit (the mask gets
 * recomposited against the moving content and briefly loses it). Overlays
 * sit on top and never touch the animation, so there's nothing to glitch.
 */
export default function Marquee() {
  return (
    <div className="marquee relative bg-bg-band border-y border-border py-5 overflow-hidden">
      <div className="marquee-track flex w-max">
        <Row />
        <Row ariaHidden />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-bg-band to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-bg-band to-transparent" />
    </div>
  )
}
