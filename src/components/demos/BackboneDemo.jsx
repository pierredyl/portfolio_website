import { useState } from 'react'

/**
 * Explanatory demo for the fracture-detection pipeline: two real figures from
 * the project's notebook, and the shape of the label file they come from.
 */
export default function BackboneDemo({ figures, dataset }) {
  const [figure, setFigure] = useState(0)

  const active = figures[figure]

  return (
    <div className="flex flex-col gap-6">
      {/* Figures from the notebook */}
      <div className="card p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-5">
          {figures.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setFigure(i)}
              className={`meta px-3 py-1.5 rounded-full border transition-colors duration-200 ${
                i === figure
                  ? 'border-accent text-accent'
                  : 'border-border text-text-faint hover:text-text-muted hover:border-border-hi'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <figure>
          <img
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-lg border border-border bg-white"
          />
          <figcaption className="text-sm text-text-muted leading-relaxed mt-4">
            {active.caption}
          </figcaption>
        </figure>
      </div>

      {/* What the label file actually contains */}
      <div className="card p-6 md:p-8">
        <span className="meta text-text-faint block mb-3">{dataset.file}</span>
        <p className="text-sm text-text-muted leading-relaxed mb-6">{dataset.intro}</p>

        <dl className="flex flex-col mb-6">
          {dataset.columns.map((c) => (
            <div
              key={c.name}
              className="border-t border-border py-4 last:border-b grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-1 sm:gap-4 items-baseline"
            >
              <dt className="font-mono text-[13px] text-accent break-all">{c.name}</dt>
              <dd className="text-sm text-text-muted leading-relaxed">{c.text}</dd>
            </div>
          ))}
        </dl>

        <p className="text-sm text-text-muted leading-relaxed">{dataset.note}</p>
      </div>
    </div>
  )
}
