// src/components/ornaments/shapes/GyroidChannelOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function GyroidChannelOrnament({
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
      viewBox="0 0 560 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="56"
          y1="74"
          x2="506"
          y2="286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <radialGradient
          id={`${gradientId}-depth`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(286 180) rotate(26) scale(254 148)"
        >
          <stop offset="0%" stopColor={startColor} stopOpacity="0.22" />
          <stop offset="64%" stopColor={endColor} stopOpacity="0.08" />
          <stop offset="100%" stopColor={endColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M65 190C116 99 193 69 276 101C340 126 372 126 418 87C455 56 498 61 528 112C501 196 442 238 366 229C301 222 265 238 227 285C183 339 113 320 65 190Z"
        fill={`url(#${gradientId}-depth)`}
      />

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M54 208C92 132 143 89 205 80C259 72 294 109 341 116C392 124 423 67 478 70C505 72 526 91 542 126"
          strokeWidth="3"
          opacity="0.82"
        />
        <path
          d="M54 238C94 167 143 131 202 128C254 125 287 164 335 171C387 179 423 128 480 127C507 127 529 141 546 170"
          strokeWidth="2.45"
          opacity="0.62"
        />
        <path
          d="M66 270C107 210 153 181 207 184C256 187 291 222 338 226C391 231 431 190 486 192"
          strokeWidth="2.2"
          opacity="0.48"
        />
        <path
          d="M90 111C129 158 170 181 215 180C263 179 295 139 340 131C390 122 432 149 482 211"
          strokeWidth="2.35"
          opacity="0.58"
        />
        <path
          d="M116 80C149 122 184 142 223 140C266 138 296 103 336 96C380 88 419 107 462 154"
          strokeWidth="1.9"
          opacity="0.38"
        />
        <path
          d="M123 309C158 257 199 230 247 230C295 230 327 264 374 267C418 270 454 246 494 205"
          strokeWidth="1.85"
          opacity="0.34"
        />
        <path
          d="M168 58C203 108 240 132 280 128C323 124 349 84 389 72"
          strokeWidth="1.55"
          opacity="0.25"
        />
        <path
          d="M176 304C207 268 244 249 286 250C329 251 363 277 407 281"
          strokeWidth="1.55"
          opacity="0.24"
        />
        <path
          d="M210 90C228 141 251 168 281 172C312 176 338 154 363 117"
          strokeWidth="1.75"
          opacity="0.34"
        />
        <path
          d="M205 210C229 174 257 158 288 164C319 170 343 198 370 242"
          strokeWidth="1.8"
          opacity="0.36"
        />
        <path
          d="M296 98C318 147 345 172 378 172C410 172 439 150 469 106"
          strokeWidth="1.65"
          opacity="0.3"
        />
        <path
          d="M294 262C320 225 350 208 383 214C416 220 443 248 471 292"
          strokeWidth="1.55"
          opacity="0.24"
        />
      </g>
    </svg>
  )
}
