// src/components/utilities/HighlightText.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import useAccent from '@/design/hooks/useAccent'
import type { AxisKey } from '@/design/theme'

type HighlightTextProps = {
  children: ReactNode
  color?: string
  accent?: AxisKey | 'neutral'
  soft?: boolean
}

const Highlight = styled.span<{
  $color?: string
  $soft: boolean
}>`
  color: ${({ $color }) => $color ?? 'inherit'};
  font-weight: ${({ theme, $soft }) =>
    $soft
      ? theme.typography.fontWeight.medium
      : theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme, $soft }) =>
    $soft
      ? theme.typography.letterSpacing.normal
      : theme.typography.letterSpacing.wide};
`

export default function HighlightText({
  children,
  color,
  accent = 'axisEnergy',
  soft = true,
}: HighlightTextProps) {
  const accentInfo = useAccent(accent)
  const resolvedColor = color ?? accentInfo.text

  return (
    <Highlight $color={resolvedColor} $soft={soft}>
      {children}
    </Highlight>
  )
}
