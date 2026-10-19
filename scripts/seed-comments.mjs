/**
 * Seed comments from seed/seed.json.
 *
 * The EmDash seed format does not natively support comment content (the
 * remote JSON schema rejects extra keys), so comments live in their own
 * seed/comments.json:
 *
 *   { "comments": [
 *     { "post": "<post-slug>", "items": [
 *       { "name": "...", "email": "...", "date": "ISO", "body": "...",
 *         "replies": [ ... ] } ] } ] }
 *
 * Rows are keyed deterministically (`cmseed_<slug>_<n>`, replies get an
 * `r<depth>` suffix), so re-running the script replaces previous rows
 * instead of duplicating them. Status is "approved" so the comments are
 * publicly visible without moderation.
 *
 * Usage: node scripts/seed-comments.mjs
 */
// libsql is a transitive dependency (not hoisted by pnpm), so resolve
// it directly from the store. Its node entry exports a synchronous
// Database class (better-sqlite3-style API).
import { readFileSync } from 'node:fs'
import libsql from '../node_modules/.pnpm/libsql@0.3.19/node_modules/libsql/index.js'

// The module's default export IS the Database constructor.
const Database = libsql

const DB_PATH = process.env.EMDASH_DB ?? 'storage/data.db'
const db = new Database(DB_PATH)

const seed = JSON.parse(readFileSync('seed/comments.json', 'utf8'))
const groups = seed.comments ?? []

if (groups.length === 0) {
  console.log('No comments declared in seed/seed.json — nothing to do.')
  process.exit(0)
}

let inserted = 0
let skipped = 0

function insertComment({ slug, comment, id, parentId, createdAt }) {
  const contentId = db.prepare('SELECT id FROM ec_posts WHERE slug = ?').get(slug)?.id
  if (!contentId) {
    console.warn(`  ! post "${slug}" not found — skipping`)
    skipped++
    return
  }

  db.prepare(
    `INSERT INTO _emdash_comments
			(id, collection, content_id, parent_id, author_name, author_email, body, status, created_at, updated_at)
			VALUES (?, 'posts', ?, ?, ?, ?, ?, 'approved', ?, ?)
			ON CONFLICT(id) DO UPDATE SET
				body = excluded.body,
				author_name = excluded.author_name,
				author_email = excluded.author_email,
				status = excluded.status,
				updated_at = excluded.updated_at`
  ).run(
    id,
    contentId,
    parentId ?? null,
    comment.name,
    comment.email,
    comment.body,
    createdAt,
    createdAt
  )
  inserted++
}

for (const group of groups) {
  console.log(`post: ${group.post}`)
  for (const [i, comment] of (group.items ?? []).entries()) {
    const id = `cmseed_${group.post}_${i}`
    insertComment({
      slug: group.post,
      comment,
      id,
      createdAt: comment.date ?? new Date().toISOString()
    })
    for (const [r, reply] of (comment.replies ?? []).entries()) {
      insertComment({
        slug: group.post,
        comment: reply,
        id: `${id}r${r}`,
        parentId: id,
        // Nudge replies a minute later so thread order is stable.
        createdAt: new Date(
          new Date(reply.date ?? comment.date ?? Date.now()).getTime() + 60_000
        ).toISOString()
      })
    }
  }
}

db.close()
console.log(`Seeded ${inserted} comment(s), skipped ${skipped}.`)
process.exit(0)
