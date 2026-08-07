import { useEffect, useState } from 'react'
import Home from './components/Home'
import Picker from './components/Picker'
import Quiz from './components/Quiz'
import Result from './components/Result'
import StarBar from './components/StarBar'
import { loadProgress, saveProgress } from './supabaseClient'

const STORAGE_KEY = 'brainburst_progress_v1'

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default function App() {
  const [player, setPlayer] = useState(() => localStorage.getItem('brainburst_player') || '')
  const [screen, setScreen] = useState('home') // home | picker | quiz | result
  const [subject, setSubject] = useState(null) // 'math' | 'science' | 'geography'
  const [mathConfig, setMathConfig] = useState(null) // { mode, tables }
  const [scienceGrade, setScienceGrade] = useState(null)
  const [geographyTopic, setGeographyTopic] = useState(null) // 'world' | 'us_states'

  const [stars, setStars] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [lastResult, setLastResult] = useState({ correctCount: 0, total: 0, starsEarned: 0 })

  // Load this player's saved progress (local first, then try cloud sync).
  useEffect(() => {
    if (!player) return
    const all = loadLocal()
    const mine = all[player] || { stars: 0, bestStreak: 0 }
    setStars(mine.stars)
    setBestStreak(mine.bestStreak)
    setStreak(0)
    loadProgress(player).then((cloud) => {
      if (cloud && cloud.stars > mine.stars) {
        setStars(cloud.stars)
        setBestStreak(Math.max(cloud.best_streak, mine.bestStreak))
      }
    })
  }, [player])

  function persist(nextStars, nextBestStreak) {
    const all = loadLocal()
    all[player] = { stars: nextStars, bestStreak: nextBestStreak }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    saveProgress(player, nextStars, nextBestStreak)
  }

  function handleSetPlayer(name) {
    localStorage.setItem('brainburst_player', name)
    setPlayer(name)
  }

  function handlePickSubject(s) {
    setSubject(s)
    setScreen('picker')
  }

  function handleStartMath(mode, tier) {
    setMathConfig({ mode, tables: tier ? tier.tables : [2, 3, 4, 5, 6, 7, 8, 9, 10] })
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartScience(grade) {
    setScienceGrade(grade)
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartGeography(topic) {
    setGeographyTopic(topic)
    setStreak(0)
    setScreen('quiz')
  }

  function handleCorrect() {
    setStreak((s) => {
      const next = s + 1
      setBestStreak((b) => Math.max(b, next))
      return next
    })
    setStars((s) => s + 1)
  }

  function handleWrong() {
    setStreak(0)
  }

  function handleFinish(correctCount, total) {
    // Bonus stars for a great round, on top of the 1-per-correct-answer already awarded live.
    const bonus = correctCount === total ? 5 : correctCount >= total * 0.7 ? 2 : 0
    const nextStars = stars + bonus
    setStars(nextStars)
    setLastResult({ correctCount, total, starsEarned: correctCount + bonus })
    persist(nextStars, bestStreak)
    setScreen('result')
  }

  function handlePlayAgain() {
    setStreak(0)
    setScreen('quiz')
  }

  function handleBackToHome() {
    setScreen('home')
  }

  function handleExitQuiz() {
    persist(stars, bestStreak)
    setScreen('home')
  }

  function handleSwitchPlayer() {
    persist(stars, bestStreak)
    localStorage.removeItem('brainburst_player')
    setPlayer('')
    setScreen('home')
  }

  return (
    <>
      {player && screen !== 'home' && (
        <div className="fixed top-4 right-4 z-10">
          <StarBar stars={stars} streak={streak} bestStreak={bestStreak} />
        </div>
      )}

      {screen === 'home' && (
        <Home
          player={player}
          onSetPlayer={handleSetPlayer}
          onPickSubject={handlePickSubject}
          onSwitchPlayer={handleSwitchPlayer}
        />
      )}

      {screen === 'picker' && (
        <Picker
          subject={subject}
          onBack={() => setScreen('home')}
          onStartMath={handleStartMath}
          onStartScience={handleStartScience}
          onStartGeography={handleStartGeography}
        />
      )}

      {screen === 'quiz' && (
        <Quiz
          subject={subject}
          mathConfig={mathConfig}
          scienceGrade={scienceGrade}
          geographyTopic={geographyTopic}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
          onFinish={handleFinish}
          onExit={handleExitQuiz}
        />
      )}

      {screen === 'result' && (
        <Result
          correctCount={lastResult.correctCount}
          total={lastResult.total}
          starsEarned={lastResult.starsEarned}
          onPlayAgain={handlePlayAgain}
          onHome={handleBackToHome}
        />
      )}
    </>
  )
}
