// src/components/controls/circularSelectorMath.ts
export const wrapIndex = (index: number, count: number): number => {
  if (count <= 0) return 0
  return ((index % count) + count) % count
}

export const nearestIndex = (rotation: number): number => Math.round(rotation)

export const activeIndexFromRotation = (
  rotation: number,
  count: number
): number => wrapIndex(nearestIndex(rotation), count)

export const circularDistance = (
  index: number,
  rotation: number,
  count: number
): number => {
  if (count <= 0) return 0

  const normalizedRotation = wrapIndex(rotation, count)
  const normalizedIndex = wrapIndex(index, count)
  const raw = normalizedIndex - normalizedRotation
  const half = count / 2

  if (raw > half) return raw - count
  if (raw < -half) return raw + count

  return raw
}

export const projectCircularTarget = (
  rotation: number,
  velocity: number,
  maxSteps: number
): number => {
  const projected = Math.max(-maxSteps, Math.min(maxSteps, velocity * 0.92))
  return Math.round(rotation + projected)
}

export const circularDuration = (
  distance: number,
  velocity: number
): number => {
  const travel = Math.abs(distance)
  const force = Math.min(12, Math.abs(velocity))

  return Math.max(420, Math.min(1900, 420 + travel * 145 + force * 34))
}

export const easeOutCubic = (progress: number): number => {
  const p = Math.max(0, Math.min(1, progress))
  return 1 - Math.pow(1 - p, 3)
}
