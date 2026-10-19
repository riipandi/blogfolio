/**
 * Shared date formatting. Accepts anything the CMS might hand back
 * (Date, ISO string, null) and returns "" for unusable values so
 * callers can render the field conditionally.
 */
export function formatDate(value: unknown): string {
  if (!(value instanceof Date)) return ''
  if (Number.isNaN(value.getTime())) return ''
  return value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
