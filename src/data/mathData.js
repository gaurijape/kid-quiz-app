// Multiplication tables grouped into tiers so a kid who isn't ready for the
// full 1-12 grid can build confidence with the easiest tables first.
export const MULTIPLICATION_TIERS = [
  { id: 'starter', label: 'Starter (x2, x5, x10)', tables: [2, 5, 10] },
  { id: 'building', label: 'Building Up (x3, x4)', tables: [2, 3, 4, 5, 10] },
  { id: 'growing', label: 'Growing (x6, x9)', tables: [2, 3, 4, 5, 6, 9, 10] },
  { id: 'confident', label: 'Confident (x7, x8)', tables: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 'master', label: 'Times Table Master (up to x12)', tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
]

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildChoices(answer, min = 0, max = 144) {
  const choices = new Set([answer])
  while (choices.size < 4) {
    const offset = randInt(-6, 6) || 1
    const candidate = answer + offset
    if (candidate >= min && candidate <= max) choices.add(candidate)
  }
  return shuffle([...choices])
}

export function generateMultiplicationQuestion(tables) {
  const a = tables[randInt(0, tables.length - 1)]
  const b = randInt(1, 10)
  const answer = a * b
  return {
    type: 'multiplication',
    prompt: `${a} × ${b} = ?`,
    a,
    b,
    answer,
    choices: buildChoices(answer),
    // Used to draw a little array-of-dots visual when the kid gets it wrong.
    visual: { rows: a, cols: b },
  }
}

export function generateDivisionQuestion(tables) {
  const a = tables[randInt(0, tables.length - 1)]
  const b = randInt(1, 10)
  const product = a * b
  // Frame division as "undoing" multiplication: product ÷ a = b
  return {
    type: 'division',
    prompt: `${product} ÷ ${a} = ?`,
    a,
    b: product,
    answer: b,
    choices: buildChoices(b, 0, 12),
    visual: { rows: a, cols: b, total: product },
  }
}

export function generateMathQuestion(mode, tables) {
  return mode === 'division'
    ? generateDivisionQuestion(tables)
    : generateMultiplicationQuestion(tables)
}
