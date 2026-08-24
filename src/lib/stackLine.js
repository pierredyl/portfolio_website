/**
 * The one-line stack summary shown on a project card, derived from that
 * project's full `techStack` so the home page and the detail page can never
 * drift apart — there is one list, in one place.
 *
 * Languages are dropped: the card already carries the language as a badge
 * directly above this line, so including them would just repeat it.
 */
export function stackLine(project) {
  return Object.entries(project.techStack ?? {})
    .filter(([label]) => label !== 'Languages')
    .flatMap(([, items]) => items)
}
