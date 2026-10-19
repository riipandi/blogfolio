import path from 'node:path'
/**
 * Short-link click tracking.
 *
 * EmDash exposes no page-side content-write API: content writes go through
 * the admin REST API and create a content revision per save, which is far
 * too heavy for a per-click counter. EmDash itself persists SQLite through
 * node:sqlite (see emdash's `src/db/node-sqlite-compat.ts`), so the counter
 * increments directly on the same database file with a single atomic
 * UPDATE. The admin reads the same column, so counts show up on the entry.
 *
 * NOTE: tied to the `sqlite()` database adapter configured in
 * astro.config.mjs. If the site moves to D1/Postgres, replace the
 * implementation with an equivalent atomic increment on that backend.
 *
 * Failures are swallowed: tracking must never block the redirect.
 */
import { DatabaseSync } from 'node:sqlite'

const DB_PATH = path.join(process.cwd(), 'storage/data.db')

let db: DatabaseSync | undefined

function getDb(): DatabaseSync {
  if (!db) {
    db = new DatabaseSync(DB_PATH)
    db.exec('PRAGMA busy_timeout = 5000')
  }
  return db
}

/** Increment the click counter for one link entry. */
export function trackLinkClick(entryId: string): void {
  try {
    getDb()
      .prepare('UPDATE ec_links SET clicks = COALESCE(clicks, 0) + 1 WHERE id = ?')
      .run(entryId)
  } catch {
    // Non-fatal: the redirect matters more than the count.
  }
}
