import { useMemo, useState } from 'react'
import { generateMathQuestion } from '../data/mathData'
import { getScienceQuestions } from '../data/scienceData'
import { generateGeographyRound } from '../data/geographyData'
import DotArray from './DotArray'

const QUESTIONS_PER_ROUND = 8

// Tailwind needs full, static class names to detect them at build time —
// template-literal classes like `bg-${accent}-500` get purged. So we look
// up complete strings from this table instead.
const THEME = {
  leaf: {
    topicLabel: 'text-leaf-500',
    choiceIdle: 'bg-leaf-50 border-leaf-300 text-leaf-700 hover:bg-leaf-100',
    nextButton: 'bg-leaf-500 hover:bg-leaf-600',
  },
  sky: {
    topicLabel: 'text-sky-500',
    choiceIdle: 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100',
    nextButton: 'bg-sky-500 hover:bg-sky-600',
  },
  berry: {
    topicLabel: 'text-berry-500',
    choiceIdle: 'bg-berry-50 border-berry-400 text-berry-500 hover:bg-berry-100',
    nextButton: 'bg-berry-500 hover:bg-berry-600',
  },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildMathRound(mode, tables) {
  return Array.from({ length: QUESTIONS_PER_ROUND }, () => generateMathQuestion(mode, tables))
}

function buildScienceRound(grade) {
  const bank = getScienceQuestions(grade)
  const picked = shuffle(bank).slice(0, Math.min(QUESTIONS_PER_ROUND, bank.length))
  return picked.map((q) => ({
    type: 'science',
    prompt: q.question,
    emoji: q.emoji,
    topic: q.topic,
    answer: q.answer,
    choices: shuffle(q.choices),
    explanation: q.explanation,
  }))
}

export default function Quiz({ subject, mathConfig, scienceGrade, geographyTopic, onCorrect, onWrong, onFinish, onExit }) {
  const questions = useMemo(() => {
    if (subject === 'math') {
      return buildMathRound(mathConfig.mode, mathConfig.tables)
    }
    if (subject === 'geography') {
      return generateGeographyRound(geographyTopic, QUESTIONS_PER_ROUND)
    }
    return buildScienceRound(scienceGrade)
  }, [subject, mathConfig, scienceGrade, geographyTopic])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)

  const q = questions[index]
  const isLast = index === questions.length - 1
  const answered = selected !== null
  const isCorrect = answered && selected === q.answer
  const theme = THEME[subject === 'math' ? 'leaf' : subject === 'geography' ? 'berry' : 'sky']

  function handleSelect(choice) {
    if (answered) return
    setSelected(choice)
    if (choice === q.answer) {
      setCorrectCount((c) => c + 1)
      onCorrect()
    } else {
      onWrong()
    }
  }

  function handleNext() {
    if (isLast) {
      onFinish(correctCount, questions.length)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-field px-6 py-8">
      <div className="w-full max-w-md flex items-center justify-between mb-6">
        <button onClick={onExit} className="font-body font-bold text-gray-500 hover:text-gray-700">
          ✕ Quit
        </button>
        <span className="font-display font-bold text-gray-500">
          {index + 1} / {questions.length}
        </span>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-pop p-6 flex flex-col items-center">
        {q.emoji && <div className="text-5xl mb-2" aria-hidden="true">{q.emoji}</div>}
        {q.topic && <div className={`text-xs font-display font-bold uppercase tracking-wide mb-2 ${theme.topicLabel}`}>{q.topic}</div>}
        <h2 className="font-display text-2xl font-extrabold text-gray-800 text-center mb-6">
          {q.prompt}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {q.choices.map((choice) => {
            let style = theme.choiceIdle
            if (answered && choice === q.answer) {
              style = 'bg-leaf-500 border-leaf-500 text-white'
            } else if (answered && choice === selected) {
              style = 'bg-berry-500 border-berry-500 text-white'
            } else if (answered) {
              style = 'bg-gray-50 border-gray-200 text-gray-400'
            }
            return (
              <button
                key={String(choice)}
                onClick={() => handleSelect(choice)}
                disabled={answered}
                className={`border-2 rounded-2xl py-4 px-3 font-body font-bold text-lg transition ${style}`}
              >
                {choice}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="w-full mt-6 animate-pop">
            {isCorrect ? (
              <p className="text-center font-display font-bold text-leaf-600 text-lg">
                🎉 Nice! That's right.
              </p>
            ) : (
              <div className="bg-sun-300/30 border-2 border-sun-300 rounded-2xl p-4 text-center">
                <p className="font-display font-bold text-gray-700 mb-2">
                  The answer is {q.answer}
                </p>
                {(q.type === 'multiplication' || q.type === 'division') && q.visual && (
                  <DotArray rows={q.visual.rows} cols={q.visual.cols} />
                )}
                {(q.type === 'multiplication' || q.type === 'division') && (
                  <p className="font-body text-sm text-gray-600 mt-1">
                    {q.type === 'division'
                      ? `${q.visual.total} things split into ${q.visual.rows} equal groups makes ${q.answer} in each group.`
                      : `${q.a} groups of ${q.b} — count all the dots!`}
                  </p>
                )}
                {q.explanation && (
                  <p className="font-body text-sm text-gray-600 mt-1">{q.explanation}</p>
                )}
              </div>
            )}

            <button
              onClick={handleNext}
              className={`mt-4 w-full text-white font-display font-bold text-lg rounded-2xl py-3 shadow-popSmall active:translate-y-1 active:shadow-none transition ${theme.nextButton}`}
            >
              {isLast ? 'See results' : 'Next question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
