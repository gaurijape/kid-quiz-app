// Tiny synthesized sound effects using the Web Audio API — no audio files
// to load, so this works offline and deploys with zero extra assets.

const MUTE_KEY = 'brainburst_muted'

export function isMuted() {
  return localStorage.getItem(MUTE_KEY) === '1'
}

export function setMuted(muted) {
  localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
}

let ctx = null
function getContext() {
  if (!ctx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return null
    ctx = new AudioContext()
  }
  return ctx
}

function tone(freq, startTime, duration, gainPeak = 0.15) {
  const audioCtx = getContext()
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration)
}

export function playCorrect() {
  if (isMuted()) return
  const audioCtx = getContext()
  if (!audioCtx) return
  const now = audioCtx.currentTime
  tone(523.25, now, 0.15) // C5
  tone(659.25, now + 0.1, 0.18) // E5
  tone(783.99, now + 0.2, 0.25) // G5
}

export function playWrong() {
  if (isMuted()) return
  const audioCtx = getContext()
  if (!audioCtx) return
  const now = audioCtx.currentTime
  tone(220, now, 0.25, 0.12) // low A3, gentle not harsh
}

export function playBadge() {
  if (isMuted()) return
  const audioCtx = getContext()
  if (!audioCtx) return
  const now = audioCtx.currentTime
  ;[523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(freq, now + i * 0.09, 0.3, 0.14))
}
