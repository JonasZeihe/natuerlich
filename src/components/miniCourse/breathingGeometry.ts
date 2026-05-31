// src/components/miniCourse/breathingGeometry.ts
export type ClockPoint = {
  x: number
  y: number
}

export const pointOnClock = (angle: number, radius: number): ClockPoint => {
  const radians = (angle * Math.PI) / 180

  return {
    x: radius * Math.sin(radians),
    y: -radius * Math.cos(radians),
  }
}
