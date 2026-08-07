// World capitals and US state capitals. Questions are generated on the fly
// (like the math ones) by picking a random entry and three wrong-answer
// distractors from the same list, so this doesn't run out the way a fixed
// question bank would.

export const WORLD_CAPITALS = [
  { name: 'United States', capital: 'Washington, D.C.', continent: 'North America' },
  { name: 'Canada', capital: 'Ottawa', continent: 'North America' },
  { name: 'Mexico', capital: 'Mexico City', continent: 'North America' },
  { name: 'Cuba', capital: 'Havana', continent: 'North America' },
  { name: 'Jamaica', capital: 'Kingston', continent: 'North America' },
  { name: 'Brazil', capital: 'Brasília', continent: 'South America' },
  { name: 'Argentina', capital: 'Buenos Aires', continent: 'South America' },
  { name: 'Peru', capital: 'Lima', continent: 'South America' },
  { name: 'Chile', capital: 'Santiago', continent: 'South America' },
  { name: 'Colombia', capital: 'Bogotá', continent: 'South America' },
  { name: 'United Kingdom', capital: 'London', continent: 'Europe' },
  { name: 'France', capital: 'Paris', continent: 'Europe' },
  { name: 'Germany', capital: 'Berlin', continent: 'Europe' },
  { name: 'Italy', capital: 'Rome', continent: 'Europe' },
  { name: 'Spain', capital: 'Madrid', continent: 'Europe' },
  { name: 'Portugal', capital: 'Lisbon', continent: 'Europe' },
  { name: 'Greece', capital: 'Athens', continent: 'Europe' },
  { name: 'Netherlands', capital: 'Amsterdam', continent: 'Europe' },
  { name: 'Switzerland', capital: 'Bern', continent: 'Europe' },
  { name: 'Sweden', capital: 'Stockholm', continent: 'Europe' },
  { name: 'Norway', capital: 'Oslo', continent: 'Europe' },
  { name: 'Ireland', capital: 'Dublin', continent: 'Europe' },
  { name: 'Poland', capital: 'Warsaw', continent: 'Europe' },
  { name: 'Russia', capital: 'Moscow', continent: 'Europe/Asia' },
  { name: 'Egypt', capital: 'Cairo', continent: 'Africa' },
  { name: 'Kenya', capital: 'Nairobi', continent: 'Africa' },
  { name: 'Nigeria', capital: 'Abuja', continent: 'Africa' },
  { name: 'South Africa', capital: 'Pretoria', continent: 'Africa' },
  { name: 'Morocco', capital: 'Rabat', continent: 'Africa' },
  { name: 'Ethiopia', capital: 'Addis Ababa', continent: 'Africa' },
  { name: 'China', capital: 'Beijing', continent: 'Asia' },
  { name: 'Japan', capital: 'Tokyo', continent: 'Asia' },
  { name: 'India', capital: 'New Delhi', continent: 'Asia' },
  { name: 'South Korea', capital: 'Seoul', continent: 'Asia' },
  { name: 'Thailand', capital: 'Bangkok', continent: 'Asia' },
  { name: 'Vietnam', capital: 'Hanoi', continent: 'Asia' },
  { name: 'Indonesia', capital: 'Jakarta', continent: 'Asia' },
  { name: 'Turkey', capital: 'Ankara', continent: 'Asia/Europe' },
  { name: 'Saudi Arabia', capital: 'Riyadh', continent: 'Asia' },
  { name: 'Israel', capital: 'Jerusalem', continent: 'Asia' },
  { name: 'Australia', capital: 'Canberra', continent: 'Oceania' },
  { name: 'New Zealand', capital: 'Wellington', continent: 'Oceania' },
]

export const US_STATES_CAPITALS = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  { name: 'Arkansas', capital: 'Little Rock' },
  { name: 'California', capital: 'Sacramento' },
  { name: 'Colorado', capital: 'Denver' },
  { name: 'Connecticut', capital: 'Hartford' },
  { name: 'Delaware', capital: 'Dover' },
  { name: 'Florida', capital: 'Tallahassee' },
  { name: 'Georgia', capital: 'Atlanta' },
  { name: 'Hawaii', capital: 'Honolulu' },
  { name: 'Idaho', capital: 'Boise' },
  { name: 'Illinois', capital: 'Springfield' },
  { name: 'Indiana', capital: 'Indianapolis' },
  { name: 'Iowa', capital: 'Des Moines' },
  { name: 'Kansas', capital: 'Topeka' },
  { name: 'Kentucky', capital: 'Frankfort' },
  { name: 'Louisiana', capital: 'Baton Rouge' },
  { name: 'Maine', capital: 'Augusta' },
  { name: 'Maryland', capital: 'Annapolis' },
  { name: 'Massachusetts', capital: 'Boston' },
  { name: 'Michigan', capital: 'Lansing' },
  { name: 'Minnesota', capital: 'Saint Paul' },
  { name: 'Mississippi', capital: 'Jackson' },
  { name: 'Missouri', capital: 'Jefferson City' },
  { name: 'Montana', capital: 'Helena' },
  { name: 'Nebraska', capital: 'Lincoln' },
  { name: 'Nevada', capital: 'Carson City' },
  { name: 'New Hampshire', capital: 'Concord' },
  { name: 'New Jersey', capital: 'Trenton' },
  { name: 'New Mexico', capital: 'Santa Fe' },
  { name: 'New York', capital: 'Albany' },
  { name: 'North Carolina', capital: 'Raleigh' },
  { name: 'North Dakota', capital: 'Bismarck' },
  { name: 'Ohio', capital: 'Columbus' },
  { name: 'Oklahoma', capital: 'Oklahoma City' },
  { name: 'Oregon', capital: 'Salem' },
  { name: 'Pennsylvania', capital: 'Harrisburg' },
  { name: 'Rhode Island', capital: 'Providence' },
  { name: 'South Carolina', capital: 'Columbia' },
  { name: 'South Dakota', capital: 'Pierre' },
  { name: 'Tennessee', capital: 'Nashville' },
  { name: 'Texas', capital: 'Austin' },
  { name: 'Utah', capital: 'Salt Lake City' },
  { name: 'Vermont', capital: 'Montpelier' },
  { name: 'Virginia', capital: 'Richmond' },
  { name: 'Washington', capital: 'Olympia' },
  { name: 'West Virginia', capital: 'Charleston' },
  { name: 'Wisconsin', capital: 'Madison' },
  { name: 'Wyoming', capital: 'Cheyenne' },
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
