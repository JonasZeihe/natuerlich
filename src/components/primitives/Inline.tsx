// src/components/primitives/Inline.tsx
'use client'

import { Children, ReactNode } from 'react'
import styled, { DefaultTheme } from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type Props = {
  gap?: number | string
  align?: Align
  justify?: Justify
  wrap?: boolean
  divider?: boolean
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

const toGap = (theme: DefaultTheme, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.spacing(1)
}

const mapJustify = (j: Justify) =>
  j === 'start'
    ? 'flex-start'
    : j === 'end'
      ? 'flex-end'
      : j === 'between'
        ? 'space-between'
        : j === 'around'
          ? 'space-around'
          : j === 'evenly'
            ? 'space-evenly'
            : 'center'

const Row = styled.div<{
  $gap?: number | string
  $align: Align
  $justify: Justify
  $wrap: boolean
}>`
  display: flex;
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  align-items: ${({ $align }) =>
    $align === 'start' ? 'flex-start' : $align === 'end' ? 'flex-end' : $align};
  justify-content: ${({ $justify }) => mapJustify($justify)};
  gap: ${({ theme, $gap }) => toGap(theme, $gap)};
  min-width: 0;
`

const Item = styled.div<{ $withDivider: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  ${({ $withDivider, theme }) =>
    $withDivider
      ? `
    border-left: 1px solid ${theme.roles.border.subtle};
    padding-left: ${theme.spacingHalf(2)};
  `
      : ''}
`

export default function Inline({
  gap,
  align = 'center',
  justify = 'start',
  wrap = true,
  divider = false,
  children,
  ...rest
}: Props) {
  const items = Children.toArray(children)

  return (
    <Row $gap={gap} $align={align} $justify={justify} $wrap={wrap} {...rest}>
      {divider
        ? items.map((child, index) => (
            <Item key={index} $withDivider={index > 0}>
              {child}
            </Item>
          ))
        : items}
    </Row>
  )
}
