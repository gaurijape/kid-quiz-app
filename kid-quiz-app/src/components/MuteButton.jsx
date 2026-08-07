import { useState } from 'react'
import { isMuted, setMuted } from '../soundEffects'

export default function MuteButton() {
  const [muted, setMutedState] = useState(() => isMuted())

  function toggle() {
    const next = !muted
    setMuted(next)
    setMutedState(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
      className="text-xl w-9 h-9 flex items-center justify-center rounded-full bg-white/70 hover:bg-white transition"
    >
      {muted ? '🔇' : '🔊'}
    </button>
  )
}
