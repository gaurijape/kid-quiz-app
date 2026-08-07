import { MULTIPLICATION_TIERS } from '../data/mathData'

const GRADES = [2, 3, 4, 5]

export default function Picker({ subject, onBack, onStartMath, onStartScience, onStartGeography, onStartWords }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-field px-6 py-10">
      <button
        onClick={onBack}
        className="self-start mb-6 font-body font-bold text-gray-500 hover:text-gray-700"
      >
        ← Back
      </button>

      {subject === 'math' && (
        <>
          <h2 className="font-display text-3xl font-extrabold text-leaf-700 mb-6 text-center">
            Pick your challenge
          </h2>

          <div className="w-full max-w-sm mb-8">
            <p className="font-display font-bold text-gray-600 mb-2">Skill</p>
            <div className="grid grid-cols-2 gap-3">
              <ModeButton label="Addition" emoji="➕" onClick={() => onStartMath('addition', null)} />
              <ModeButton label="Subtraction" emoji="➖" onClick={() => onStartMath('subtraction', null)} />
              <ModeButton label="Multiplication" emoji="✖️" onClick={() => onStartMath('multiplication', null)} />
              <ModeButton label="Division" emoji="➗" onClick={() => onStartMath('division', null)} />
              <ModeButton label="Fractions" emoji="🍕" onClick={() => onStartMath('fraction', null)} />
              <ModeButton label="Money" emoji="💰" onClick={() => onStartMath('money', null)} />
            </div>
          </div>

          <div className="w-full max-w-sm">
            <p className="font-display font-bold text-gray-600 mb-2">Or pick a times-table level</p>
            <div className="flex flex-col gap-3">
              {MULTIPLICATION_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => onStartMath('multiplication', tier)}
                  className="bg-white hover:bg-leaf-50 border-2 border-leaf-300 rounded-2xl px-4 py-3 text-left font-body font-semibold text-leaf-700 shadow-popSmall active:translate-y-1 active:shadow-none transition"
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {subject === 'science' && (
        <>
          <h2 className="font-display text-3xl font-extrabold text-sky-700 mb-6 text-center">
            Pick your grade
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => onStartScience(g)}
                className="bg-white hover:bg-sky-50 border-2 border-sky-300 rounded-2xl py-8 font-display font-extrabold text-2xl text-sky-700 shadow-popSmall active:translate-y-1 active:shadow-none transition"
              >
                Grade {g}
              </button>
            ))}
          </div>
        </>
      )}

      {subject === 'words' && (
        <>
          <h2 className="font-display text-3xl font-extrabold text-grape-500 mb-6 text-center">
            Pick your grade
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => onStartWords(g)}
                className="bg-white hover:bg-grape-50 border-2 border-grape-300 rounded-2xl py-8 font-display font-extrabold text-2xl text-grape-500 shadow-popSmall active:translate-y-1 active:shadow-none transition"
              >
                Grade {g}
              </button>
            ))}
          </div>
        </>
      )}

      {subject === 'geography' && (
        <>
          <h2 className="font-display text-3xl font-extrabold text-berry-500 mb-6 text-center">
            Pick a map to explore
          </h2>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <button
              onClick={() => onStartGeography('world')}
              className="bg-white hover:bg-berry-50 border-2 border-berry-400 rounded-2xl py-8 flex flex-col items-center gap-2 font-display font-extrabold text-xl text-berry-500 shadow-popSmall active:translate-y-1 active:shadow-none transition"
            >
              <span className="text-4xl" aria-hidden="true">🌍</span>
              World Capitals
            </button>
            <button
              onClick={() => onStartGeography('us_states')}
              className="bg-white hover:bg-berry-50 border-2 border-berry-400 rounded-2xl py-8 flex flex-col items-center gap-2 font-display font-extrabold text-xl text-berry-500 shadow-popSmall active:translate-y-1 active:shadow-none transition"
            >
              <span className="text-4xl" aria-hidden="true">🗺️</span>
              US States &amp; Capitals
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function ModeButton({ label, emoji, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-white hover:bg-leaf-50 border-2 border-leaf-300 rounded-2xl py-6 flex flex-col items-center gap-1 shadow-popSmall active:translate-y-1 active:shadow-none transition"
    >
      <span className="text-3xl" aria-hidden="true">{emoji}</span>
      <span className="font-display font-bold text-leaf-700">{label}</span>
    </button>
  )
}
