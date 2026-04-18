// src/components/feedback/BadgeGrid.tsx
'use client'

import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import Badge, { type BadgeProps } from './Badge'
import type { BadgeKey } from './BadgeLibrary'

type Align = 'start' | 'center' | 'end'

export type BadgeGridProps = {
  badges?: BadgeKey[]
  align?: Align
  gapSize?: number
  marginSize?: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const justifyForAlign = (align: Align) =>
  align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center'

const StyledBadgeGrid = styled.div<{
  $align: Align
  $gapSize: number
  $marginSize: number
}>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $align }) => justifyForAlign($align)};
  gap: ${({ theme, $gapSize }) => theme.spacing($gapSize)};
  margin: ${({ theme, $marginSize }) => theme.spacing($marginSize)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacing(0.75)};
  }
`

export default function BadgeGrid({
  badges = [],
  align = 'center',
  gapSize = 2,
  marginSize = 1,
  ...rest
}: BadgeGridProps) {
  if (badges.length === 0) return null

  return (
    <StyledBadgeGrid
      $align={align}
      $gapSize={gapSize}
      $marginSize={marginSize}
      {...rest}
    >
      {badges.map((badgeKey) => (
        <Badge key={badgeKey} badgeKey={badgeKey as BadgeProps['badgeKey']} />
      ))}
    </StyledBadgeGrid>
  )
}
