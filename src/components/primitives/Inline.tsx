// src/components/primitives/Inline.tsx
'use client'

import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { type DefaultTheme } from 'styled-components'

type Align = 'start' | 'center' | 'end' | 'stretch'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

type Props = {
  gap?: number | string
  align?: Align
  justify?: Justify
  wrap?: boolean
  divider?: boolean
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const toGap = (theme: DefaultTheme, gap?: number | string) => {
  if (typeof gap === 'number') return theme.spacing(gap)
  if (typeof gap === 'string') return gap
  return theme.layout.flow.text
}

const mapJustify = (justify: Justify) =>
  justify === 'start'
    ? 'flex-start'
    : justify === 'end'
      ? 'flex-end'
      : justify === 'between'
        ? 'space-between'
        : justify === 'around'
          ? 'space-around'
          : justify === 'evenly'
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
  gap: ${({ theme }) => theme.spacingHalf(1)};

  ${({ $withDivider, theme }) =>
    $withDivider
      ? `
    border-left: 1px solid ${theme.roles.border.subtle};
    padding-left: ${theme.layout.flow.text};
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
