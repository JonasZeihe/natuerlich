// src/components/schnupperkurs/breathingMotion.ts
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

type CarrierPose = {
  angle: number
  scale: number
  opacity: number
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

const topClosedAngle = 300
const topOpenAngle = 60
const bottomClosedAngle = 120
const bottomOpenAngle = 240
const topRadius = 182
const bottomRadius = 174

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const easeBreath = (value: number) =>
  0.5 - Math.cos(clamp01(value) * Math.PI) / 2

const lerp = (from: number, to: number, value: number) =>
  from + (to - from) * value

const clockwiseSpan = (from: number, to: number) =>
  (((to - from) % 360) + 360) % 360

const clockwiseLerp = (from: number, to: number, value: number) =>
  from + clockwiseSpan(from, to) * clamp01(value)

const counterClockwiseLerp = (from: number, to: number, value: number) =>
  from - clockwiseSpan(to, from) * clamp01(value)

const topPose = (phase: BreathPhaseKey, progress: number): CarrierPose => {
  const amount = easeBreath(progress)

  if (phase === 'inhale') {
    return {
      angle: clockwiseLerp(topClosedAngle, topOpenAngle, amount),
      scale: lerp(0.92, 1.34, amount),
      opacity: lerp(0.6, 1, amount),
    }
  }

  if (phase === 'holdInhale') {
    return {
      angle: topOpenAngle,
      scale: lerp(1.34, 1, amount),
      opacity: lerp(1, 0.68, amount),
    }
  }

  if (phase === 'exhale') {
    return {
      angle: counterClockwiseLerp(topOpenAngle, topClosedAngle, amount),
      scale: lerp(1, 0.94, amount),
      opacity: lerp(0.68, 0.52, amount),
    }
  }

  return {
    angle: topClosedAngle,
    scale: 0.94,
    opacity: 0.52,
  }
}

const bottomPose = (phase: BreathPhaseKey, progress: number): CarrierPose => {
  const amount = easeBreath(progress)

  if (phase === 'inhale') {
    return {
      angle: clockwiseLerp(bottomClosedAngle, bottomOpenAngle, amount),
      scale: lerp(0.94, 0.98, amount),
      opacity: lerp(0.44, 0.56, amount),
    }
  }

  if (phase === 'holdInhale') {
    return {
      angle: bottomOpenAngle,
      scale: lerp(0.98, 1.24, amount),
      opacity: lerp(0.56, 0.92, amount),
    }
  }

  if (phase === 'exhale') {
    return {
      angle: counterClockwiseLerp(bottomOpenAngle, bottomClosedAngle, amount),
      scale: lerp(1.24, 0.86, amount),
      opacity: lerp(0.92, 0.46, amount),
    }
  }

  return {
    angle: bottomClosedAngle,
    scale: lerp(0.86, 0.94, amount),
    opacity: lerp(0.46, 0.44, amount),
  }
}

const carrierMotion = (pose: CarrierPose, radius: number): CarrierMotion => {
  const position = pointOnClock(pose.angle, radius)

  return {
    x: position.x,
    y: position.y,
    rotate: pose.angle - 300,
    scale: pose.scale,
    opacity: pose.opacity,
  }
}

export const getTopCarrierMotion = (
  phase: BreathPhaseKey,
  progress: number
): CarrierMotion => carrierMotion(topPose(phase, progress), topRadius)

export const getBottomCarrierMotion = (
  phase: BreathPhaseKey,
  progress: number
): CarrierMotion => carrierMotion(bottomPose(phase, progress), bottomRadius)
