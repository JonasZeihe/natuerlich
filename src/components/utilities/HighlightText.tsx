// src/components/utilities/HighlightText.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import type { HighlightKey } from '@/design/theme'

type HighlightTextProps = {
  children: ReactNode
  color?: string
  accent?: HighlightKey
  soft?: boolean
}

export default function HighlightText({
  children,
  color,
  accent,
}: HighlightTextProps) {
  return (
    <Highlight $color={color} $accent={accent}>
      {children}
    </Highlight>
  )
}

const Highlight = styled.span<{
  $color?: string
  $accent?: HighlightKey
}>`
  color: ${({ theme, $color, $accent }) =>
    $color ?? ($accent ? theme.color.highlight[$accent] : 'inherit')};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
`
