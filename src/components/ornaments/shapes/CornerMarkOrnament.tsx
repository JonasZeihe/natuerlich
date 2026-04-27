// src/components/ornaments/shapes/CornerMarkOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function CornerMarkOrnament({
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
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="20"
          y1="18"
          x2="88"
          y2="86"
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
          d="M20 28H62C72 28 80 36 80 46V88"
          strokeWidth="3.2"
          opacity="0.94"
        />
        <path d="M38 44H64" strokeWidth="2.1" opacity="0.58" />
        <path d="M64 56V82" strokeWidth="2.1" opacity="0.58" />
      </g>
    </svg>
  )
}
