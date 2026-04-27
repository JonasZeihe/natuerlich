// src/components/ornaments/shapes/RippleOriginOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function RippleOriginOrnament({
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
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="82"
          y1="68"
          x2="218"
          y2="226"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <radialGradient
          id={`${gradientId}-pulse`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(136 134) rotate(76) scale(92 106)"
        >
          <stop offset="0%" stopColor={startColor} stopOpacity="0.26" />
          <stop offset="70%" stopColor={endColor} stopOpacity="0.08" />
          <stop offset="100%" stopColor={endColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M74 118C89 78 124 55 164 60C206 65 235 99 236 141C237 187 202 224 157 228C114 232 75 205 64 163C60 148 63 132 74 118Z"
        fill={`url(#${gradientId}-pulse)`}
      />

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M129 128C135 123 143 124 148 130C153 137 151 145 144 149C137 153 128 150 124 142"
          strokeWidth="3"
          opacity="0.9"
        />
        <path
          d="M105 118C120 98 148 92 170 106C193 121 198 149 183 171C168 193 137 200 113 185C91 171 83 143 96 124"
          strokeWidth="2.45"
          opacity="0.72"
        />
        <path
          d="M84 101C111 66 160 58 199 85C239 113 248 165 220 204C191 245 134 254 93 222C54 192 47 137 76 109"
          strokeWidth="2.05"
          opacity="0.5"
        />
        <path
          d="M58 91C91 43 155 28 209 62C261 95 276 163 241 215"
          strokeWidth="1.75"
          opacity="0.31"
        />
        <path
          d="M228 232C183 268 117 267 72 229C34 197 23 144 43 99"
          strokeWidth="1.65"
          opacity="0.28"
        />
        <path
          d="M120 80C156 67 194 79 217 108"
          strokeWidth="1.45"
          opacity="0.24"
        />
        <path
          d="M74 171C90 211 134 233 176 221"
          strokeWidth="1.45"
          opacity="0.24"
        />
      </g>
    </svg>
  )
}
