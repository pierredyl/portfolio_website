import { useEffect, useState } from 'react'

/**
 * Returns the id of whichever section is currently in view.
 * Used by the navbar to highlight the active link.
 *
 * Picks the entry closest to the top of the viewport rather than simply the
 * first intersecting one, so tall sections don't keep the highlight after the
 * next section has taken over the screen.
 */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) setActive(visible[0].target.id)
      },
      // Band across the upper-middle of the viewport: a section counts as
      // "active" once its top passes the header and before it leaves upward.
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  // Off the home page there are no sections to be inside of.
  return enabled ? active : null
}
