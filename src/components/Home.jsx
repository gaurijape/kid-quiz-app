import { useState } from 'react'
import BadgeShelf from './BadgeShelf'
import MuteButton from './MuteButton'

export default function Home({
  player,
  onSetPlayer,
  onPickSubject,
  onSwitchPlayer,
  onStartDaily,
  dailyDone,
  unlockedBadgeIds,
}) {
  const [nameInput, setNameInput] = useState('')

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-field px-6 text-center">
        <div className="text-6xl mb-4 animate-float" aria-hidden="true">🚀</div>
        <h1 className="font-display text-4xl font-extrabold text-sky-700 mb-2">
          BrainBurst
        </h1>
        <p className="font-body text-gray-600 mb-8">Math &amp; science practice, just for you!</p>
        <form
          className="flex flex-col gap-3 w-full max-w-xs"
          onSubmit={(e) => {
            e.preventDefault()
            if (nameInput.trim()) onSetPlayer(nameInput.trim())
          }}
        >
          <label htmlFor="player-name" className="font-display text-sky-700 font-bold text-left">
            What's your name?
          </label>
          <input
            id="player-name"
            className="rounded-2xl border-2 border-sky-300 px-4 py-3 text-lg font-body focus:outline-none focus:border-sky-500"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Type your name"
            autoFocus
          />
          <button
            type="submit"
            className="bg-leaf-500 hover:bg-leaf-600 text-white font-display font-bold text-lg rounded-2xl py-3 shadow-pop active:shadow-none active:translate-y-1 transition"
          >
            Let's go!
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-field px-6 py-10">
      <div className="fixed top-4 left-4">
        <MuteButton />
      </div>

      <h1 className="font-display text-3xl font-extrabold text-sky-700 mb-1">
        Hi, {player}! 👋
      </h1>
      <p className="font-body text-gray-600 mb-8">What do you want to practice?</p>

      <button
        onClick={onStartDaily}
        disabled={dailyDone}
        className={`w-full max-w-2xl mb-8 flex items-center justify-center gap-3 rounded-3xl py-5 px-6 shadow-pop active:shadow-none active:translate-y-1 transition font-display font-extrabold text-xl ${
          dailyDone
            ? 'bg-gray-100 text-gray-400 cursor-default shadow-none'
            : 'bg-sun-500 hover:bg-sun-600 text-white'
        }`}
      >
        <span className="text-3xl" aria-hidden="true">📅</span>
        {dailyDone ? 'Daily Challenge done — come back tomorrow!' : 'Daily Challenge (mixed, bonus stars!)'}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-3xl">
        <button
          onClick={() => onPickSubject('math')}
          className="group flex flex-col items-center gap-3 bg-leaf-500 hover:bg-leaf-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">🔢</span>
          <span className="font-display font-extrabold text-2xl">Math</span>
          <span className="font-body text-sm text-leaf-50">Times tables &amp; more</span>
        </button>

        <button
          onClick={() => onPickSubject('science')}
          className="group flex flex-col items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">🔬</span>
          <span className="font-display font-extrabold text-2xl">Science</span>
          <span className="font-body text-sm text-sky-50">Fun facts to explore</span>
        </button>

        <button
          onClick={() => onPickSubject('geography')}
          className="group flex flex-col items-center gap-3 bg-berry-500 hover:bg-berry-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">🗺️</span>
          <span className="font-display font-extrabold text-2xl">Geography</span>
          <span className="font-body text-sm text-berry-50">Capitals &amp; maps</span>
        </button>

        <button
          onClick={() => onPickSubject('words')}
          className="group flex flex-col items-center gap-3 bg-grape-500 hover:bg-grape-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">📚</span>
          <span className="font-display font-extrabold text-2xl">Words</span>
          <span className="font-body text-sm text-grape-50">Spelling &amp; vocabulary</span>
        </button>
      </div>

      <BadgeShelf unlockedIds={unlockedBadgeIds} />

      <button
        onClick={onSwitchPlayer}
        className="mt-10 font-body text-sm text-gray-400 hover:text-gray-600 underline"
      >
        Not {player}? Switch player
      </button>
    </div>
  )
}
