import { BADGES } from '../data/badges'

export default function BadgeShelf({ unlockedIds }) {
  return (
    <div className="w-full max-w-2xl mt-10">
      <p className="font-display font-bold text-gray-600 mb-3 text-center">Badges</p>
      <div className="flex flex-wrap justify-center gap-3">
        {BADGES.map((badge) => {
          const unlocked = unlockedIds.includes(badge.id)
          return (
            <div
              key={badge.id}
              title={`${badge.label}: ${badge.description}`}
              className={`flex flex-col items-center gap-1 w-20 rounded-2xl py-3 px-2 border-2 transition ${
                unlocked
                  ? 'bg-white border-sun-500 shadow-popSmall'
                  : 'bg-white/50 border-gray-200 opacity-50'
              }`}
            >
              <span className={`text-2xl ${!unlocked ? 'grayscale' : ''}`} aria-hidden="true">
                {unlocked ? badge.emoji : '🔒'}
              </span>
              <span className="font-body text-[10px] font-bold text-gray-600 text-center leading-tight">
                {badge.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
