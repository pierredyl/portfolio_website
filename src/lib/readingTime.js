/** Rough reading time in minutes, from a post's paragraph blocks. */
export function readingTime(post) {
  const words = (post.content ?? [])
    .filter((b) => typeof b.text === 'string')
    .reduce((n, b) => n + b.text.trim().split(/\s+/).length, 0)
  return Math.max(1, Math.round(words / 200))
}
