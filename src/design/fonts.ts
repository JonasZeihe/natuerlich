// src/design/fonts.ts
import { Fraunces, Nunito_Sans } from 'next/font/google'

export const displayFont = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
})

export const font = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-main',
})

export const fontClassName = `${displayFont.variable} ${font.variable}`

export const FONT_FAMILY = {
  main: "var(--font-main), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "var(--font-display), Georgia, 'Times New Roman', serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
} as const
