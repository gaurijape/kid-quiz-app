// Achievement badges. Each badge has an id, label, emoji, and a check
// function that looks at the player's cumulative stats to decide if it's
// unlocked. Keeping the criteria simple and stat-based (not tied to exact
// question banks) means these keep working as content grows.

export const BADGES = [
  {
    id: 'first_round',
    label: 'Getting Started',
    emoji: '🌱',
    description: 'Finish your first round',
    check: (s) => s.roundsCompleted >= 1,
  },
  {
    id: 'star_collector',
    label: 'Star Collector',
    emoji: '⭐',
    description: 'Earn 25 stars',
    check: (s) => s.totalStars >= 25,
  },
  {
    id: 'star_legend',
    label: 'Star Legend',
    emoji: '🌟',
    description: 'Earn 100 stars',
    check: (s) => s.totalStars >= 100,
  },
  {
    id: 'streak_master',
    label: 'Streak Master',
    emoji: '🔥',
    description: 'Get a streak of 10 correct in a row',
    check: (s) => s.bestStreak >= 10,
  },
  {
    id: 'perfect_round',
    label: 'Perfect Round',
    emoji: '🏆',
    description: 'Get every question right in a round',
    check: (s) => s.perfectRounds >= 1,
  },
  {
    id: 'math_whiz',
    label: 'Math Whiz',
    emoji: '🔢',
    description: 'Complete 5 math rounds',
    check: (s) => (s.roundsBySubject?.math || 0) >= 5,
  },
  {
    id: 'science_star',
    label: 'Science Star',
    emoji: '🔬',
    description: 'Complete 5 science rounds',
    check: (s) => (s.roundsBySubject?.science || 0) >= 5,
  },
  {
    id: 'world_traveler',
    label: 'World Traveler',
    emoji: '🗺️',
    description: 'Complete 5 geography rounds',
    check: (s) => (s.roundsBySubject?.geography || 0) >= 5,
  },
  {
    id: 'wordsmith',
    label: 'Wordsmith',
    emoji: '📚',
    description: 'Complete 5 words rounds',
    check: (s) => (s.roundsBySubject?.words || 0) >= 5,
  },
  {
    id: 'daily_devotee',
    label: 'Daily Devotee',
    emoji: '📅',
    description: 'Complete 5 daily challenges',
    check: (s) => (s.dailyChallengesCompleted || 0) >= 5,
  },
]

export function getUnlockedBadgeIds(stats) {
  return BADGES.filter((b) => b.check(stats)).map((b) => b.id)
}
