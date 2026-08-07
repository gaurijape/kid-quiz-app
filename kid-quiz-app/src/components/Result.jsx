export default function Result({ correctCount, total, starsEarned, newBadges = [], onPlayAgain, onHome }) {
  const great = correctCount === total
  const good = correctCount >= total * 0.7

  const headline = great ? 'Perfect round! 🏆' : good ? 'Great job! 🎈' : 'Nice try! 💪'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-field px-6 text-center">
      <div className="text-7xl mb-4 animate-pop" aria-hidden="true">
        {great ? '🏆' : good ? '🎉' : '🙂'}
      </div>
      <h1 className="font-display text-3xl font-extrabold text-sky-700 mb-2">{headline}</h1>
      <p className="font-body text-gray-600 mb-1">
        You got {correctCount} out of {total} right.
      </p>
      <p className="font-display font-bold text-sun-500 text-lg mb-4">
        +{starsEarned} stars ⭐
      </p>

      {newBadges.length > 0 && (
        <div className="bg-white border-2 border-sun-500 rounded-2xl px-5 py-4 mb-6 animate-pop">
          <p className="font-display font-bold text-gray-700 mb-2">New badge{newBadges.length > 1 ? 's' : ''}!</p>
          <div className="flex gap-4 justify-center">
            {newBadges.map((b) => (
              <div key={b.id} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{b.emoji}</span>
                <span className="font-body text-xs font-bold text-gray-600">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onPlayAgain}
          className="bg-leaf-500 hover:bg-leaf-600 text-white font-display font-bold text-lg rounded-2xl py-3 shadow-pop active:translate-y-1 active:shadow-none transition"
        >
          Play again
        </button>
        <button
          onClick={onHome}
          className="bg-white border-2 border-sky-300 text-sky-700 font-display font-bold text-lg rounded-2xl py-3 shadow-popSmall active:translate-y-1 active:shadow-none transition"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
