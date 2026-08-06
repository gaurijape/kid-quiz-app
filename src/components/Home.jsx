import { useState } from 'react'

export default function Home({ player, onSetPlayer, onPickSubject }) {
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
      <h1 className="font-display text-3xl font-extrabold text-sky-700 mb-1">
        Hi, {player}! 👋
      </h1>
      <p className="font-body text-gray-600 mb-10">What do you want to practice?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <button
          onClick={() => onPickSubject('math')}
          className="group flex flex-col items-center gap-3 bg-leaf-500 hover:bg-leaf-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">🔢</span>
          <span className="font-display font-extrabold text-2xl">Math</span>
          <span className="font-body text-sm text-leaf-50">Times tables &amp; division</span>
        </button>

        <button
          onClick={() => onPickSubject('science')}
          className="group flex flex-col items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl py-10 px-6 shadow-pop active:shadow-none active:translate-y-1 transition"
        >
          <span className="text-5xl group-hover:animate-wiggle" aria-hidden="true">🔬</span>
          <span className="font-display font-extrabold text-2xl">Science</span>
          <span className="font-body text-sm text-sky-50">Fun facts to explore</span>
        </button>
      </div>
    </div>
  )
}
