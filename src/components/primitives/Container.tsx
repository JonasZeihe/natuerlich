// src/components/primitives/Container.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css, type DefaultTheme } from 'styled-components'

type ContainerSize = keyof DefaultTheme['layout']['container']

type Props = {
  max?: ContainerSize
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

const Box = styled.div<{ $max: ContainerSize }>`
  width: 100%;
  min-width: 0;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.layout.inset.page};

  ${({ theme, $max }) =>
    $max === 'full'
      ? css`
          max-width: none;
        `
      : css`
          max-width: calc(
            ${theme.layout.container[$max]} + ${theme.layout.inset.page} * 2
          );
        `}
`

export default function Container({
  max = 'default',
  children,
  ...rest
}: Props) {
  return (
    <Box $max={max} {...rest}>
      {children}
    </Box>
  )
}
