// src/components/ornaments/shapes/PartitionFieldOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function PartitionFieldOrnament({
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
      viewBox="0 0 520 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="42"
          y1="38"
          x2="482"
          y2="284"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-soft`}
          x1="88"
          y1="72"
          x2="448"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={endColor} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <g fill={`url(#${gradientId}-soft)`}>
        <path d="M74 68L136 40L202 76L182 138L108 146L58 106Z" />
        <path d="M202 76L274 48L336 82L326 146L250 164L182 138Z" />
        <path d="M336 82L426 62L486 124L450 184L326 146Z" />
        <path d="M108 146L182 138L250 164L232 230L150 254L88 210Z" />
        <path d="M250 164L326 146L450 184L418 256L304 278L232 230Z" />
      </g>

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M58 106C77 87 99 75 136 40" strokeWidth="2.5" opacity="0.72" />
        <path
          d="M136 40C161 52 180 65 202 76"
          strokeWidth="2.25"
          opacity="0.58"
        />
        <path
          d="M202 76C222 67 248 57 274 48"
          strokeWidth="2.1"
          opacity="0.48"
        />
        <path
          d="M274 48C296 58 317 70 336 82"
          strokeWidth="2.35"
          opacity="0.62"
        />
        <path
          d="M336 82C371 75 398 68 426 62"
          strokeWidth="1.95"
          opacity="0.38"
        />
        <path
          d="M426 62C448 82 468 101 486 124"
          strokeWidth="2.35"
          opacity="0.58"
        />
        <path
          d="M486 124C477 148 464 168 450 184"
          strokeWidth="2.05"
          opacity="0.46"
        />
        <path
          d="M450 184C438 211 427 235 418 256"
          strokeWidth="2.5"
          opacity="0.74"
        />
        <path
          d="M418 256C382 267 343 274 304 278"
          strokeWidth="2.2"
          opacity="0.52"
        />
        <path
          d="M304 278C277 264 254 247 232 230"
          strokeWidth="2.15"
          opacity="0.5"
        />
        <path
          d="M232 230C205 241 178 249 150 254"
          strokeWidth="2.4"
          opacity="0.66"
        />
        <path
          d="M150 254C124 241 103 226 88 210"
          strokeWidth="2.05"
          opacity="0.44"
        />
        <path
          d="M88 210C93 188 100 167 108 146"
          strokeWidth="2.15"
          opacity="0.52"
        />
        <path
          d="M108 146C91 132 75 120 58 106"
          strokeWidth="1.85"
          opacity="0.34"
        />
        <path
          d="M108 146C132 144 157 141 182 138"
          strokeWidth="3"
          opacity="0.86"
        />
        <path
          d="M182 138C187 116 194 94 202 76"
          strokeWidth="2.25"
          opacity="0.5"
        />
        <path
          d="M182 138C206 147 229 156 250 164"
          strokeWidth="2.8"
          opacity="0.8"
        />
        <path
          d="M250 164C276 159 301 152 326 146"
          strokeWidth="2.85"
          opacity="0.76"
        />
        <path
          d="M326 146C331 124 335 102 336 82"
          strokeWidth="2.1"
          opacity="0.46"
        />
        <path
          d="M326 146C367 157 410 170 450 184"
          strokeWidth="2.45"
          opacity="0.64"
        />
        <path
          d="M250 164C243 186 237 209 232 230"
          strokeWidth="2.55"
          opacity="0.7"
        />
        <path
          d="M182 138C167 177 158 216 150 254"
          strokeWidth="1.9"
          opacity="0.3"
        />
        <path
          d="M250 164C270 202 288 239 304 278"
          strokeWidth="1.85"
          opacity="0.3"
        />
        <path
          d="M148 92C165 83 183 78 202 76"
          strokeWidth="1.45"
          opacity="0.24"
        />
        <path
          d="M356 206C382 202 413 194 450 184"
          strokeWidth="1.5"
          opacity="0.26"
        />
        <path
          d="M112 196C147 195 184 205 232 230"
          strokeWidth="1.5"
          opacity="0.24"
        />
      </g>
    </svg>
  )
}
