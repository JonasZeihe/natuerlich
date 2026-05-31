// src/components/miniCourse/breathingMotion.ts
import { pointOnClock } from './breathingGeometry'

export type BreathExerciseState = 'idle' | 'countdown' | 'running'

export type BreathPhaseKey = 'inhale' | 'holdInhale' | 'exhale' | 'holdExhale'

type CarrierMotion = {
  x: number
  y: number
  rotate: number
  scale: number
  opacity: number
}

type CarrierState = {
  angle: number
  rotate: number
  scale: number
  opacity: number
}

type CarrierTrack = {
  restAngle: number
  openAngle: number
  radius: number
  baseRotate: number
  quietScale: number
  leadScale: number
  followScale: number
  quietOpacity: number
  leadOpacity: number
  followOpacity: number
}

export const phaseDurationSeconds = 5
export const countdownStart = 3

export const breathPhases: readonly BreathPhaseKey[] = [
  'inhale',
  'holdInhale',
  'exhale',
  'holdExhale',
]

export const breathPhaseLabels: Record<BreathPhaseKey, string> = {
  inhale: 'Einatmen',
  holdInhale: 'Halten',
  exhale: 'Ausatmen',
  holdExhale: 'Halten',
}

const topTrack: CarrierTrack = {
  restAngle: 335,
  openAngle: 60,
  radius: 118,
  baseRotate: -15,
  quietScale: 0.96,
  leadScale: 1.24,
  followScale: 1.02,
  quietOpacity: 0.56,
  leadOpacity: 1,
  followOpacity: 0.7,
}

const bottomTrack: CarrierTrack = {
  restAngle: 155,
  openAngle: 240,
  radius: 118,
  baseRotate: 165,
  quietScale: 0.96,
  leadScale: 1.24,
  followScale: 1.02,
  quietOpacity: 0.46,
  leadOpacity: 0.92,
  followOpacity: 0.58,
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const easeBreath = (value: number) =>
  0.5 - Math.cos(clamp01(value) * Math.PI) / 2

const followerAmount = (value: number) => easeBreath((value - 0.04) / 0.96)

const lerp = (from: number, to: number, value: number) =>
  from + (to - from) * value

const clockwiseSpan = (from: number, to: number) =>
  (((to - from) % 360) + 360) % 360

const clockwiseLerp = (from: number, to: number, value: number) =>
  from + clockwiseSpan(from, to) * clamp01(value)

const counterClockwiseLerp = (from: number, to: number, value: number) =>
  from - clockwiseSpan(to, from) * clamp01(value)

const radialRotate = (track: CarrierTrack, angle: number) =>
  track.baseRotate + angle - track.restAngle

const inhaleLeadState = (
  track: CarrierTrack,
  progress: number
): CarrierState => {
  const amount = easeBreath(progress)
  const angle = clockwiseLerp(track.restAngle, track.openAngle, amount)

  return {
    angle,
    rotate: radialRotate(track, angle),
    scale: lerp(track.quietScale, track.leadScale, amount),
    opacity: lerp(track.quietOpacity, track.leadOpacity, amount),
  }
}

const inhaleFollowState = (
  track: CarrierTrack,
  progress: number
): CarrierState => {
  const amount = followerAmount(progress)
  const angle = clockwiseLerp(track.restAngle, track.openAngle, amount)

  return {
    angle,
    rotate: radialRotate(track, angle),
    scale: lerp(track.quietScale, track.followScale, amount),
    opacity: lerp(track.quietOpacity, track.followOpacity, amount),
  }
}

const holdInhaleState = (
  track: CarrierTrack,
  lead: boolean,
  progress: number
): CarrierState => {
  const amount = easeBreath(progress)
  const settle = lead ? 0.04 : 0.025
  const scale = lead
    ? lerp(track.leadScale, track.leadScale - settle, amount)
    : lerp(track.followScale, track.followScale - settle, amount)
  const opacity = lead
    ? lerp(track.leadOpacity, track.leadOpacity - 0.06, amount)
    : lerp(track.followOpacity, track.followOpacity - 0.04, amount)

  return {
    angle: track.openAngle,
    rotate: radialRotate(track, track.openAngle),
    scale,
    opacity,
  }
}

const exhaleLeadState = (
  track: CarrierTrack,
  progress: number
): CarrierState => {
  const amount = easeBreath(progress)
  const angle = counterClockwiseLerp(track.openAngle, track.restAngle, amount)

  return {
    angle,
    rotate: radialRotate(track, angle),
    scale: lerp(track.followScale - 0.025, track.leadScale, amount),
    opacity: lerp(track.followOpacity - 0.04, track.leadOpacity, amount),
  }
}

const exhaleFollowState = (
  track: CarrierTrack,
  progress: number
): CarrierState => {
  const amount = followerAmount(progress)
  const angle = counterClockwiseLerp(track.openAngle, track.restAngle, amount)

  return {
    angle,
    rotate: radialRotate(track, angle),
    scale: lerp(track.leadScale - 0.04, track.followScale, amount),
    opacity: lerp(track.leadOpacity - 0.08, track.followOpacity, amount),
  }
}

const holdExhaleState = (
  track: CarrierTrack,
  lead: boolean,
  progress: number
): CarrierState => {
  const amount = easeBreath(progress)
  const fromScale = lead ? track.leadScale : track.followScale
  const fromOpacity = lead ? track.leadOpacity : track.followOpacity

  return {
    angle: track.restAngle,
    rotate: radialRotate(track, track.restAngle),
    scale: lerp(fromScale, track.quietScale, amount),
    opacity: lerp(fromOpacity, track.quietOpacity, amount),
  }
}

const topState = (phase: BreathPhaseKey, progress: number): CarrierState => {
  if (phase === 'inhale') {
    return inhaleLeadState(topTrack, progress)
  }

  if (phase === 'holdInhale') {
    return holdInhaleState(topTrack, true, progress)
  }

  if (phase === 'exhale') {
    return exhaleFollowState(topTrack, progress)
  }

  return holdExhaleState(topTrack, false, progress)
}

const bottomState = (phase: BreathPhaseKey, progress: number): CarrierState => {
  if (phase === 'inhale') {
    return inhaleFollowState(bottomTrack, progress)
  }

  if (phase === 'holdInhale') {
    return holdInhaleState(bottomTrack, false, progress)
  }

  if (phase === 'exhale') {
    return exhaleLeadState(bottomTrack, progress)
  }

  return holdExhaleState(bottomTrack, true, progress)
}

const carrierMotion = (
  state: CarrierState,
  track: CarrierTrack
): CarrierMotion => {
  const position = pointOnClock(state.angle, track.radius)

  return {
    x: position.x,
    y: position.y,
    rotate: state.rotate,
    scale: state.scale,
    opacity: state.opacity,
  }
}

export const getTopCarrierMotion = (
  phase: BreathPhaseKey,
  progress: number
): CarrierMotion => carrierMotion(topState(phase, progress), topTrack)

export const getBottomCarrierMotion = (
  phase: BreathPhaseKey,
  progress: number
): CarrierMotion => carrierMotion(bottomState(phase, progress), bottomTrack)
