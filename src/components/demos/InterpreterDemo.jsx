import { useEffect, useRef, useState } from 'react'

/**
 * Scripted terminal playback for the interpreter demo — not a live-executing
 * reimplementation. `output` is hand-traced from the real source (see
 * src/data/projects.js for exactly how), then revealed progressively when
 * "Run" is pressed to read like a real program executing.
 */
export default function InterpreterDemo({ examples }) {
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState('')
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  const example = examples[active]

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  const selectExample = (i) => {
    if (i === active) return
    clearInterval(timerRef.current)
    setActive(i)
    setShown('')
    setRunning(false)
  }

  const run = () => {
    clearInterval(timerRef.current)
    const full = example.output
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setShown(full)
      return
    }

    setRunning(true)
    setShown('')
    let i = 0
    timerRef.current = setInterval(() => {
      i += 2
      setShown(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(timerRef.current)
        setRunning(false)
      }
    }, 12)
  }

  return (
    <div className="card p-6 md:p-8">
      {/* Example picker */}
      <div className="flex flex-wrap gap-2 mb-5">
        {examples.map((ex, i) => (
          <button
            key={ex.label}
            onClick={() => selectExample(i)}
            className={`meta px-3 py-1.5 rounded-full border transition-colors duration-200 ${
              i === active
                ? 'border-accent text-accent'
                : 'border-border text-text-faint hover:text-text-muted hover:border-border-hi'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Source */}
      <pre className="text-xs md:text-[13px] leading-relaxed text-text-muted bg-bg border border-border rounded-lg p-4 overflow-x-auto mb-5 whitespace-pre">
        {example.source}
      </pre>

      <button
        onClick={run}
        disabled={running}
        className="meta px-5 py-2.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-hi disabled:opacity-60 transition-colors duration-200 mb-5"
      >
        {running ? 'Running…' : 'Run ▸'}
      </button>

      {/* Output */}
      <div className="bg-bg border border-border rounded-lg p-4 min-h-[3.5rem]">
        <span className="meta text-text-faint block mb-2">output</span>
        <p className="text-xs md:text-[13px] leading-relaxed text-text font-mono whitespace-pre-wrap break-words">
          {shown}
          {running && <span className="animate-pulse">▍</span>}
          {!shown && !running && <span className="text-text-faint">— not run yet —</span>}
        </p>
      </div>
    </div>
  )
}
