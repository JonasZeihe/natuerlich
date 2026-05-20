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

export const breathCarrierPaths = {
  inhale: {
    body: [
      'M -154 52',
      'C -150 4 -126 -46 -78 -82',
      'C -28 -120 42 -136 108 -112',
      'C 138 -100 162 -82 178 -58',
      'C 186 -46 180 -32 164 -30',
      'C 112 -22 64 -4 24 28',
      'C -12 56 -38 88 -56 124',
      'C -64 140 -84 144 -100 132',
      'C -130 110 -148 82 -154 52',
      'Z',
    ].join(' '),
    innerEdge: [
      'M -104 56',
      'C -96 18 -72 -22 -34 -48',
      'C 6 -76 58 -88 110 -72',
      'C 130 -66 146 -56 158 -44',
    ].join(' '),
    outerEdge: [
      'M -140 42',
      'C -132 -8 -104 -56 -56 -90',
      'C -4 -126 66 -140 128 -112',
      'C 150 -102 166 -88 178 -70',
    ].join(' '),
  },
  exhale: {
    body: [
      'M -156 70',
      'C -164 22 -150 -32 -112 -74',
      'C -72 -118 -8 -144 62 -134',
      'C 112 -126 150 -102 172 -68',
      'C 182 -52 176 -34 158 -30',
      'C 112 -20 72 -2 38 26',
      'C 0 58 -28 94 -50 132',
      'C -62 154 -88 158 -108 142',
      'C -136 120 -152 96 -156 70',
      'Z',
    ].join(' '),
    innerEdge: [
      'M -108 76',
      'C -108 34 -90 -12 -54 -48',
      'C -16 -86 38 -106 94 -96',
      'C 124 -90 146 -76 160 -56',
    ].join(' '),
    outerEdge: [
      'M -144 62',
      'C -150 12 -132 -42 -92 -82',
      'C -50 -124 18 -150 84 -134',
      'C 126 -124 158 -102 176 -74',
    ].join(' '),
  },
} as const
