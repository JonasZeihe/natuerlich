// src/components/ornaments/shapes/TraceFanOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function TraceFanOrnament({
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
      viewBox="0 0 420 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="42"
          y1="93"
          x2="382"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <radialGradient
          id={`${gradientId}-origin`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(58 94) rotate(-13) scale(104 52)"
        >
          <stop offset="0%" stopColor={startColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={endColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M32 82C79 60 131 51 188 53C246 55 304 42 383 20L392 110C312 94 251 88 190 96C133 104 82 104 32 82Z"
        fill={`url(#${gradientId}-origin)`}
      />

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M34 86C86 78 133 66 180 52C230 37 281 24 388 18"
          strokeWidth="2.8"
          opacity="0.86"
        />
        <path
          d="M34 86C86 82 135 78 184 78C236 78 286 68 382 48"
          strokeWidth="2.3"
          opacity="0.66"
        />
        <path
          d="M34 86C86 88 135 92 184 98C238 104 289 105 378 102"
          strokeWidth="2.25"
          opacity="0.62"
        />
        <path
          d="M36 87C84 96 130 108 177 123C227 139 280 146 360 142"
          strokeWidth="1.9"
          opacity="0.42"
        />
        <path
          d="M58 84C97 68 137 50 178 28C218 7 264 1 326 14"
          strokeWidth="1.65"
          opacity="0.3"
        />
        <path
          d="M60 90C107 100 149 113 190 130C229 146 269 153 320 149"
          strokeWidth="1.55"
          opacity="0.28"
        />
        <path
          d="M68 86C110 84 150 82 190 82C230 82 270 78 314 68"
          strokeWidth="1.65"
          opacity="0.34"
        />
        <path d="M54 86C64 82 74 82 84 86" strokeWidth="3.05" opacity="0.92" />
      </g>
    </svg>
  )
}
