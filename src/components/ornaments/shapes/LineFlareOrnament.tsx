// src/components/ornaments/shapes/LineFlareOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function LineFlareOrnament({
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
          y1="58"
          x2="388"
          y2="46"
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
          d="M34 60C88 60 134 58 182 54C230 50 278 42 388 24"
          strokeWidth="2.8"
          opacity="0.92"
        />
        <path
          d="M34 60C84 62 130 64 176 68C224 72 274 72 378 88"
          strokeWidth="2.2"
          opacity="0.68"
        />
        <path
          d="M46 60C96 56 140 50 184 40C228 30 276 20 346 14"
          strokeWidth="1.95"
          opacity="0.5"
        />
        <path
          d="M46 60C96 64 142 72 188 82C234 92 280 100 352 104"
          strokeWidth="1.9"
          opacity="0.48"
        />
        <path
          d="M74 60C122 60 166 58 208 54C252 50 294 44 334 34"
          strokeWidth="1.7"
          opacity="0.34"
        />
      </g>
    </svg>
  )
}
