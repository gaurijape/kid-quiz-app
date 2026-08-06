export default function StarBar({ stars, streak, bestStreak }) {
  return (
    <div className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-popSmall">
      <div className="flex items-center gap-1 font-display font-bold text-sun-500">
        <span className="text-xl" aria-hidden="true">⭐</span>
        <span>{stars}</span>
      </div>
      <div className="w-px h-5 bg-gray-200" />
      <div className="flex items-center gap-1 font-display font-bold text-berry-500">
        <span className="text-xl" aria-hidden="true">🔥</span>
        <span>{streak}</span>
        <span className="text-xs font-body font-normal text-gray-400 ml-1">
          best {bestStreak}
        </span>
      </div>
    </div>
  )
}
