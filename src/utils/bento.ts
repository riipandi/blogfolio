/**
 * Plan bento rows for a list of post cards.
 *
 * Each row is either "plain" (three cards) or "wide" (one 2/3-wide
 * card plus one normal card, mirrored on alternating rows for a
 * zigzag rhythm). Both row kinds fill their grid exactly, so no
 * layout is ever left with empty cells, whatever the item count is.
 */
export interface BentoRow<T> {
  kind: 'wide' | 'plain'
  flip: boolean
  posts: T[]
}

interface PlanStep {
  kind: 'wide' | 'plain'
  flip: boolean
}

function planRows(count: number): PlanStep[] {
  const rows: PlanStep[] = []
  let rem = count
  let flip = false
  while (rem > 0) {
    if (rem === 1) {
      rows.push({ kind: 'plain', flip })
      rem -= 1
    } else if (rem % 3 === 0) {
      rows.push({ kind: 'plain', flip })
      rem -= 3
    } else {
      rows.push({ kind: 'wide', flip })
      flip = !flip
      rem -= 2
    }
  }
  return rows
}

export function planBentoRows<T>(items: T[]): BentoRow<T>[] {
  const plan = planRows(items.length)
  const rows: BentoRow<T>[] = []
  let i = 0
  for (const step of plan) {
    const size = step.kind === 'wide' ? 2 : 3
    rows.push({
      kind: step.kind,
      flip: step.flip,
      posts: items.slice(i, i + size)
    })
    i += size
  }
  return rows
}
