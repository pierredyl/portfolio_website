// Shared by the home project cards and the project detail page, so the color
// per language stays in one place instead of drifting between two copies.
const colorMap = {
  cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-400' },
  yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-400' },
}

export default function LangBadge({ label, color }) {
  const c = colorMap[color]
  return (
    <span
      className={`meta inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${c.border} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {label}
    </span>
  )
}
