// src/components/utilities/HighlightText.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import type { HighlightKey } from '@/design/theme'

type HighlightTone = 'default' | 'inverse'

type HighlightTextProps = {
  children: ReactNode
  color?: string
  accent?: HighlightKey
  tone?: HighlightTone
  soft?: boolean
}

export default function HighlightText({
  children,
  color,
  accent,
  tone = 'default',
}: HighlightTextProps) {
  return (
    <Highlight $color={color} $accent={accent} $tone={tone}>
      {children}
    </Highlight>
  )
}

const Highlight = styled.span<{
  $color?: string
  $accent?: HighlightKey
  $tone: HighlightTone
}>`
  color: ${({ theme, $color, $accent, $tone }) => {
    if ($color) return $color
    if ($tone === 'inverse') return theme.color.text.inverse
    if ($accent) return theme.color.highlight[$accent]
    return 'inherit'
  }};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
`
