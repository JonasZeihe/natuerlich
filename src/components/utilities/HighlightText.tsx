// src/components/utilities/HighlightText.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import useAccent from '@/design/hooks/useAccent'
import type { AxisKey } from '@/design/theme'

type HighlightAccent = AxisKey | 'neutral'

type HighlightTextProps = {
  children: ReactNode
  color?: string
  accent?: HighlightAccent
  soft?: boolean
}

export default function HighlightText({
  children,
  color,
  accent = 'neutral',
  soft = true,
}: HighlightTextProps) {
  const accentKey: AxisKey = accent === 'neutral' ? 'axisOpening' : accent
  const accentInfo = useAccent(accentKey)
  const resolvedColor =
    color ?? (accent === 'neutral' ? 'inherit' : accentInfo.fill)

  return (
    <Highlight $color={resolvedColor} $soft={soft}>
      {children}
    </Highlight>
  )
}

const Highlight = styled.span<{
  $color: string
  $soft: boolean
}>`
  color: ${({ $color }) => $color};
  font-weight: ${({ theme, $soft }) =>
    $soft
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
`
