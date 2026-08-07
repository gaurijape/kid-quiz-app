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

export function generateAdditionQuestion() {
  const a = randInt(1, 50)
  const b = randInt(1, 50)
  const answer = a + b
  return {
    type: 'addition',
    prompt: `${a} + ${b} = ?`,
    answer,
    choices: buildChoices(answer, 0, 999),
  }
}

export function generateSubtractionQuestion() {
  const a = randInt(1, 50)
  const b = randInt(0, a) // keep it non-negative for a 2nd grader
  const answer = a - b
  return {
    type: 'subtraction',
    prompt: `${a} - ${b} = ?`,
    answer,
    choices: buildChoices(answer, 0, 999),
  }
}

// Simple, kid-friendly fractions — denominators a 3rd-5th grader can
// visualize easily (halves, thirds, quarters, fifths, sixths, eighths,
// tenths). Comparisons always have a clear winner (never truly equal
// pairs), so "bigger" always has one right answer.
const FRACTION_POOL = [
  [1, 2], [1, 3], [2, 3], [1, 4], [2, 4], [3, 4],
  [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6],
  [1, 8], [3, 8], [5, 8], [7, 8], [1, 10], [3, 10], [7, 10], [9, 10],
]

export function generateFractionQuestion() {
  let [n1, d1] = FRACTION_POOL[randInt(0, FRACTION_POOL.length - 1)]
  let [n2, d2] = FRACTION_POOL[randInt(0, FRACTION_POOL.length - 1)]
  // Avoid picking the exact same fraction twice
  let guard = 0
  while (n1 / d1 === n2 / d2 && guard < 10) {
    ;[n2, d2] = FRACTION_POOL[randInt(0, FRACTION_POOL.length - 1)]
    guard++
  }
  const fracA = `${n1}/${d1}`
  const fracB = `${n2}/${d2}`
  const answer = n1 / d1 > n2 / d2 ? fracA : fracB

  return {
    type: 'fraction',
    prompt: `Which is bigger: ${fracA} or ${fracB}?`,
    answer,
    choices: shuffle([fracA, fracB]),
    explanation: `${answer} is bigger. Try picturing a pizza cut into equal slices — a bigger fraction means a bigger slice.`,
  }
}

// Money — count up a small handful of US coins.
const COINS = [
  { name: 'penny', value: 1, emoji: '🟤' },
  { name: 'nickel', value: 5, emoji: '⚪' },
  { name: 'dime', value: 10, emoji: '⚪' },
  { name: 'quarter', value: 25, emoji: '🟡' },
]

export function generateMoneyQuestion() {
  const count = randInt(3, 5)
  const picked = Array.from({ length: count }, () => COINS[randInt(0, COINS.length - 1)])
  const total = picked.reduce((sum, c) => sum + c.value, 0)
  const summary = picked
    .reduce((acc, c) => {
      const existing = acc.find((x) => x.name === c.name)
      if (existing) existing.count += 1
      else acc.push({ name: c.name, count: 1, emoji: c.emoji })
      return acc
    }, [])
    .map((c) => `${c.count} ${c.name}${c.count > 1 ? 's' : ''}`)
    .join(', ')

  return {
    type: 'money',
    prompt: `You have ${summary}. How many cents in all?`,
    answer: total,
    choices: buildChoices(total, 0, 150),
    explanation: 'Pennies = 1¢, nickels = 5¢, dimes = 10¢, quarters = 25¢ — add them all up.',
  }
}

export function generateMathQuestion(mode, tables) {
  if (mode === 'division') return generateDivisionQuestion(tables)
  if (mode === 'addition') return generateAdditionQuestion()
  if (mode === 'subtraction') return generateSubtractionQuestion()
  if (mode === 'fraction') return generateFractionQuestion()
  if (mode === 'money') return generateMoneyQuestion()
  return generateMultiplicationQuestion(tables)
}
