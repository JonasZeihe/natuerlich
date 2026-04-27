// src/components/ornaments/shapes/BraidTraceOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function BraidTraceOrnament({
  gradientId,
  startColor,
  endColor,
  className,
}: RootTraceOrnamentProps) {
  return (
    <svg
      aria-hidden
      focusable={false}
      className={className}
      viewBox="0 0 420 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="34"
          y1="30"
          x2="384"
          y2="92"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M32 72C64 54 96 44 128 46C162 48 188 68 214 72C242 76 268 62 292 50C316 38 344 34 388 44"
          strokeWidth="2.85"
          opacity="0.94"
        />
        <path
          d="M40 46C72 62 100 74 130 74C160 74 186 56 212 50C240 44 266 50 294 66C320 80 348 88 384 84"
          strokeWidth="2.2"
          opacity="0.66"
        />
        <path
          d="M76 56C102 50 126 52 148 62C170 72 188 84 210 86C234 88 258 78 280 64C302 50 328 42 360 42"
          strokeWidth="1.95"
          opacity="0.54"
        />
        <path
          d="M124 44C148 40 172 42 192 52C212 62 228 72 246 74C266 76 286 68 304 56"
          strokeWidth="1.8"
          opacity="0.42"
        />
      </g>
    </svg>
  )
}
