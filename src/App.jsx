import { useEffect, useState } from 'react'
import Home from './components/Home'
import Picker from './components/Picker'
import Quiz from './components/Quiz'
import Result from './components/Result'
import StarBar from './components/StarBar'
import { loadProgress, saveProgress } from './supabaseClient'
import { BADGES, getUnlockedBadgeIds } from './data/badges'
import { playBadge } from './soundEffects'

const STORAGE_KEY = 'brainburst_progress_v2'

const DEFAULT_STATS = {
  stars: 0,
  bestStreak: 0,
  roundsCompleted: 0,
  perfectRounds: 0,
  roundsBySubject: { math: 0, science: 0, geography: 0, words: 0 },
  dailyChallengesCompleted: 0,
  lastDailyDate: null,
}

function todayKey() {
  return new Date().toDateString()
}

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function statsFor(all, player) {
  const mine = all[player] || {}
  return {
    ...DEFAULT_STATS,
    ...mine,
    roundsBySubject: { ...DEFAULT_STATS.roundsBySubject, ...(mine.roundsBySubject || {}) },
  }
}

export default function App() {
  const [player, setPlayer] = useState(() => localStorage.getItem('brainburst_player') || '')
  const [screen, setScreen] = useState('home') // home | picker | quiz | result
  const [subject, setSubject] = useState(null) // 'math' | 'science' | 'geography' | 'words' | 'daily'
  const [mathConfig, setMathConfig] = useState(null) // { mode, tables }
  const [scienceGrade, setScienceGrade] = useState(null)
  const [geographyTopic, setGeographyTopic] = useState(null) // 'world' | 'us_states'
  const [wordsGrade, setWordsGrade] = useState(null)

  const [stats, setStats] = useState(DEFAULT_STATS)
  const [streak, setStreak] = useState(0)
  const [lastResult, setLastResult] = useState({ correctCount: 0, total: 0, starsEarned: 0, newBadges: [] })

  // Load this player's saved stats (local first, then try cloud sync for stars/streak).
  useEffect(() => {
    if (!player) return
    const all = loadLocal()
    const mine = statsFor(all, player)
    setStats(mine)
    setStreak(0)
    loadProgress(player).then((cloud) => {
      if (cloud && cloud.stars > mine.stars) {
        setStats((s) => ({ ...s, stars: cloud.stars, bestStreak: Math.max(cloud.best_streak, s.bestStreak) }))
      }
    })
  }, [player])

  function persist(nextStats) {
    const all = loadLocal()
    all[player] = nextStats
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    saveProgress(player, nextStats.stars, nextStats.bestStreak)
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
    setSubject('math')
    setMathConfig({ mode, tables: tier ? tier.tables : [2, 3, 4, 5, 6, 7, 8, 9, 10] })
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartScience(grade) {
    setSubject('science')
    setScienceGrade(grade)
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartGeography(topic) {
    setSubject('geography')
    setGeographyTopic(topic)
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartWords(grade) {
    setSubject('words')
    setWordsGrade(grade)
    setStreak(0)
    setScreen('quiz')
  }

  function handleStartDaily() {
    setSubject('daily')
    setStreak(0)
    setScreen('quiz')
  }

  function handleCorrect() {
    setStreak((s) => {
      const next = s + 1
      setStats((st) => ({ ...st, bestStreak: Math.max(st.bestStreak, next) }))
      return next
    })
    setStats((st) => ({ ...st, stars: st.stars + 1 }))
  }

  function handleWrong() {
    setStreak(0)
  }

  function handleFinish(correctCount, total) {
    const isPerfect = correctCount === total
    const isDaily = subject === 'daily'
    // Bonus stars for a great round, on top of the 1-per-correct already awarded live.
    // Daily Challenge gets an extra flat bonus to make it worth coming back for.
    const bonus = (isPerfect ? 5 : correctCount >= total * 0.7 ? 2 : 0) + (isDaily ? 10 : 0)

    setStats((prev) => {
      const beforeIds = getUnlockedBadgeIds(prev)
      const nextStats = {
        ...prev,
        stars: prev.stars + bonus,
        roundsCompleted: prev.roundsCompleted + 1,
        perfectRounds: prev.perfectRounds + (isPerfect ? 1 : 0),
        roundsBySubject: isDaily
          ? prev.roundsBySubject
          : { ...prev.roundsBySubject, [subject]: (prev.roundsBySubject[subject] || 0) + 1 },
        dailyChallengesCompleted: prev.dailyChallengesCompleted + (isDaily ? 1 : 0),
        lastDailyDate: isDaily ? todayKey() : prev.lastDailyDate,
      }
      const afterIds = getUnlockedBadgeIds(nextStats)
      const newBadges = BADGES.filter((b) => afterIds.includes(b.id) && !beforeIds.includes(b.id))
      if (newBadges.length > 0) playBadge()

      setLastResult({ correctCount, total, starsEarned: correctCount + bonus, newBadges })
      persist(nextStats)
      return nextStats
    })

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
    persist(stats)
    setScreen('home')
  }

  function handleSwitchPlayer() {
    persist(stats)
    localStorage.removeItem('brainburst_player')
    setPlayer('')
    setScreen('home')
  }

  const unlockedBadgeIds = getUnlockedBadgeIds(stats)
  const dailyDone = stats.lastDailyDate === todayKey()

  return (
    <>
      {player && screen !== 'home' && (
        <div className="fixed top-4 right-4 z-10">
          <StarBar stars={stats.stars} streak={streak} bestStreak={stats.bestStreak} />
        </div>
      )}

      {screen === 'home' && (
        <Home
          player={player}
          onSetPlayer={handleSetPlayer}
          onPickSubject={handlePickSubject}
          onSwitchPlayer={handleSwitchPlayer}
          onStartDaily={handleStartDaily}
          dailyDone={dailyDone}
          unlockedBadgeIds={unlockedBadgeIds}
        />
      )}

      {screen === 'picker' && (
        <Picker
          subject={subject}
          onBack={() => setScreen('home')}
          onStartMath={handleStartMath}
          onStartScience={handleStartScience}
          onStartGeography={handleStartGeography}
          onStartWords={handleStartWords}
        />
      )}

      {screen === 'quiz' && (
        <Quiz
          subject={subject}
          mathConfig={mathConfig}
          scienceGrade={scienceGrade}
          geographyTopic={geographyTopic}
          wordsGrade={wordsGrade}
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
          newBadges={lastResult.newBadges}
          onPlayAgain={handlePlayAgain}
          onHome={handleBackToHome}
        />
      )}
    </>
  )
}
