// src/components/utilities/HighlightText.tsx
'use client'

import { type ReactNode } from 'react'
import styled, { type DefaultTheme } from 'styled-components'

type Accent = 'default' | keyof DefaultTheme['domain']['practice']
type Tone = 'default' | 'inverse'

type HighlightTextProps = {
  children: ReactNode
  accent?: Accent
  tone?: Tone
}

const Highlight = styled.span<{
  $accent: Accent
  $tone: Tone
}>`
  color: ${({ theme, $accent, $tone }) => {
    if ($tone === 'inverse') return theme.color.text.inverse
    if ($accent === 'default') return theme.color.text.default
    return theme.domain.practice[$accent]
  }};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.normal};
`

export default function HighlightText({
  children,
  accent = 'default',
  tone = 'default',
}: HighlightTextProps) {
  return (
    <Highlight $accent={accent} $tone={tone}>
      {children}
    </Highlight>
  )
}
