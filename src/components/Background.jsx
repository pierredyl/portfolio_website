/**
 * Minimal now that sections carry their own tonal bands — just one soft glow
 * at the top of the page so the hero doesn't start on flat color.
 */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
    >
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-accent-soft) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
