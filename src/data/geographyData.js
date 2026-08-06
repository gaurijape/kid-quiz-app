// World capitals and US state capitals. Questions are generated on the fly
// (like the math ones) by picking a random entry and three wrong-answer
// distractors from the same list, so this doesn't run out the way a fixed
// question bank would.

export const WORLD_CAPITALS = [
  { name: 'United States', capital: 'Washington, D.C.', continent: 'North America' },
  { name: 'Canada', capital: 'Ottawa', continent: 'North America' },
  { name: 'Mexico', capital: 'Mexico City', continent: 'North America' },
  { name: 'Brazil', capital: 'Brasília', continent: 'South America' },
  { name: 'Argentina', capital: 'Buenos Aires', continent: 'South America' },
  { name: 'Peru', capital: 'Lima', continent: 'South America' },
  { name: 'United Kingdom', capital: 'London', continent: 'Europe' },
  { name: 'France', capital: 'Paris', continent: 'Europe' },
  { name: 'Germany', capital: 'Berlin', continent: 'Europe' },
  { name: 'Italy', capital: 'Rome', continent: 'Europe' },
  { name: 'Spain', capital: 'Madrid', continent: 'Europe' },
  { name: 'Portugal', capital: 'Lisbon', continent: 'Europe' },
  { name: 'Greece', capital: 'Athens', continent: 'Europe' },
  { name: 'Russia', capital: 'Moscow', continent: 'Europe/Asia' },
  { name: 'Egypt', capital: 'Cairo', continent: 'Africa' },
  { name: 'Kenya', capital: 'Nairobi', continent: 'Africa' },
  { name: 'Nigeria', capital: 'Abuja', continent: 'Africa' },
  { name: 'South Africa', capital: 'Pretoria', continent: 'Africa' },
  { name: 'China', capital: 'Beijing', continent: 'Asia' },
  { name: 'Japan', capital: 'Tokyo', continent: 'Asia' },
  { name: 'India', capital: 'New Delhi', continent: 'Asia' },
  { name: 'South Korea', capital: 'Seoul', continent: 'Asia' },
  { name: 'Thailand', capital: 'Bangkok', continent: 'Asia' },
  { name: 'Australia', capital: 'Canberra', continent: 'Oceania' },
  { name: 'New Zealand', capital: 'Wellington', continent: 'Oceania' },
]

export const US_STATES_CAPITALS = [
  { name: 'California', capital: 'Sacramento' },
  { name: 'Texas', capital: 'Austin' },
  { name: 'New York', capital: 'Albany' },
  { name: 'Florida', capital: 'Tallahassee' },
  { name: 'Illinois', capital: 'Springfield' },
  { name: 'Pennsylvania', capital: 'Harrisburg' },
  { name: 'Ohio', capital: 'Columbus' },
  { name: 'Georgia', capital: 'Atlanta' },
  { name: 'Michigan', capital: 'Lansing' },
  { name: 'Washington', capital: 'Olympia' },
  { name: 'Arizona', capital: 'Phoenix' },
  { name: 'Massachusetts', capital: 'Boston' },
  { name: 'Colorado', capital: 'Denver' },
  { name: 'Oregon', capital: 'Salem' },
  { name: 'Nevada', capital: 'Carson City' },
  { name: 'Louisiana', capital: 'Baton Rouge' },
  { name: 'Tennessee', capital: 'Nashville' },
  { name: 'Hawaii', capital: 'Honolulu' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'New Mexico', capital: 'Santa Fe' },
  { name: 'Wisconsin', capital: 'Madison' },
  { name: 'Minnesota', capital: 'Saint Paul' },
  { name: 'Utah', capital: 'Salt Lake City' },
  { name: 'Indiana', capital: 'Indianapolis' },
  { name: 'North Carolina', capital: 'Raleigh' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// direction: 'capital' asks "what's the capital of X", 'place' asks
// "which place has capital Y" — mixing both keeps it from feeling repetitive.
export function generateGeographyQuestion(list, direction = 'capital') {
  const shuffled = shuffle(list)
  const correct = shuffled[0]
  const distractors = shuffled.slice(1, 4)
  const emoji = list === WORLD_CAPITALS ? '🌍' : '🗺️'

  if (direction === 'capital') {
    return {
      type: 'geography',
      emoji,
      topic: 'Capitals',
      prompt: `What is the capital of ${correct.name}?`,
      answer: correct.capital,
      choices: shuffle([correct.capital, ...distractors.map((d) => d.capital)]),
      explanation: `${correct.capital} is the capital of ${correct.name}${correct.continent ? `, in ${correct.continent}` : ''}.`,
    }
  }
  return {
    type: 'geography',
    emoji,
    topic: 'Capitals',
    prompt: `${correct.capital} is the capital of which place?`,
    answer: correct.name,
    choices: shuffle([correct.name, ...distractors.map((d) => d.name)]),
    explanation: `${correct.capital} is the capital of ${correct.name}${correct.continent ? `, in ${correct.continent}` : ''}.`,
  }
}

export function generateGeographyRound(topicId, count) {
  const list = topicId === 'us_states' ? US_STATES_CAPITALS : WORLD_CAPITALS
  return Array.from({ length: count }, (_, i) =>
    generateGeographyQuestion(list, i % 2 === 0 ? 'capital' : 'place')
  )
}
