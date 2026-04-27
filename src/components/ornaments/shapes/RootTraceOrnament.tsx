// src/components/ornaments/shapes/RootTraceOrnament.tsx
'use client'

export type RootTraceOrnamentProps = {
  gradientId: string
  startColor: string
  endColor: string
  className?: string
}

export default function RootTraceOrnament({
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
          x1="28"
          y1="32"
          x2="390"
          y2="88"
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
          d="M24 70C52 62 80 56 108 54C136 52 164 56 194 62C224 68 252 70 282 66C314 62 344 52 396 34"
          strokeWidth="3"
          opacity="0.94"
        />
        <path
          d="M92 54C102 44 114 36 130 30"
          strokeWidth="2.05"
          opacity="0.6"
        />
        <path
          d="M146 58C158 46 174 36 194 28"
          strokeWidth="1.95"
          opacity="0.56"
        />
        <path
          d="M202 63C216 52 234 44 256 40"
          strokeWidth="2.05"
          opacity="0.58"
        />
        <path
          d="M256 65C270 76 286 84 304 88"
          strokeWidth="1.9"
          opacity="0.54"
        />
        <path
          d="M314 58C328 48 344 42 362 40"
          strokeWidth="1.95"
          opacity="0.52"
        />
        <path
          d="M188 76C212 80 236 80 260 76"
          strokeWidth="1.7"
          opacity="0.3"
        />
      </g>
    </svg>
  )
}
