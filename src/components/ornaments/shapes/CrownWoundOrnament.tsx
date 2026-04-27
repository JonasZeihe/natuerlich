// src/components/ornaments/shapes/CrownWoundOrnament.tsx
'use client'

import type { RootTraceOrnamentProps } from './RootTraceOrnament'

export default function CrownWoundOrnament({
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
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="82"
          y1="54"
          x2="288"
          y2="314"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <radialGradient
          id={`${gradientId}-core`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(176 191) rotate(88) scale(130 116)"
        >
          <stop offset="0%" stopColor={startColor} stopOpacity="0.42" />
          <stop offset="72%" stopColor={endColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor={endColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M170 86C146 117 131 147 128 177C125 211 142 240 170 274C196 240 212 209 211 176C210 145 195 115 170 86Z"
        fill={`url(#${gradientId}-core)`}
      />

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M174 294C153 260 139 229 135 197C130 157 142 121 168 73"
          strokeWidth="3.2"
          opacity="0.9"
        />
        <path
          d="M176 294C194 259 204 226 203 192C202 151 188 116 166 73"
          strokeWidth="2.75"
          opacity="0.68"
        />
        <path
          d="M153 270C125 239 105 211 95 181C82 143 83 108 100 63"
          strokeWidth="2.2"
          opacity="0.52"
        />
        <path
          d="M196 269C222 236 239 205 246 172C254 134 248 99 226 59"
          strokeWidth="2.25"
          opacity="0.54"
        />
        <path
          d="M128 243C97 218 72 193 57 165C39 130 34 96 43 58"
          strokeWidth="1.95"
          opacity="0.34"
        />
        <path
          d="M224 244C255 217 279 190 293 160C309 125 311 92 298 56"
          strokeWidth="1.9"
          opacity="0.35"
        />
        <path
          d="M164 238C151 215 145 191 148 166C151 139 161 113 178 83"
          strokeWidth="1.75"
          opacity="0.4"
        />
        <path
          d="M188 235C197 211 200 187 196 163C192 138 181 113 163 84"
          strokeWidth="1.65"
          opacity="0.34"
        />
        <path
          d="M121 184C140 177 157 177 174 185C192 194 208 194 226 185"
          strokeWidth="2.1"
          opacity="0.58"
        />
        <path
          d="M136 211C150 205 164 205 178 212C193 219 207 219 222 211"
          strokeWidth="1.75"
          opacity="0.36"
        />
        <path
          d="M177 154C184 173 186 191 181 209C176 228 178 247 188 267"
          strokeWidth="2.4"
          opacity="0.82"
        />
        <path
          d="M209 100C199 126 193 151 192 176"
          strokeWidth="1.55"
          opacity="0.28"
        />
        <path
          d="M132 103C143 128 150 153 151 177"
          strokeWidth="1.55"
          opacity="0.28"
        />
        <path
          d="M89 218C112 221 133 228 153 241"
          strokeWidth="1.55"
          opacity="0.26"
        />
        <path
          d="M267 219C243 222 222 229 202 243"
          strokeWidth="1.55"
          opacity="0.26"
        />
      </g>
    </svg>
  )
}
