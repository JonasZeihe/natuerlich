// src/components/compositions/page/PageCanvas.tsx
'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import styled, { css } from 'styled-components'

type PageCanvasVariant = 'default' | 'landing' | 'article'

type PageCanvasProps = ComponentPropsWithoutRef<'div'> & {
  variant?: PageCanvasVariant
  introOffset?: boolean
  noFooterGap?: boolean
  children: ReactNode
}

const Root = styled.div<{
  $variant: PageCanvasVariant
  $introOffset: boolean
  $noFooterGap: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  overflow: clip;
  color: ${({ theme }) => theme.color.text.default};
  padding-top: ${({ theme, $introOffset }) =>
    $introOffset ? `calc(${theme.layout.section.default} * 0.82)` : 0};
  padding-bottom: ${({ theme, $noFooterGap }) =>
    $noFooterGap ? 0 : `calc(${theme.layout.section.default} * 0.8)`};

  ${({ theme, $variant }) =>
    $variant === 'article'
      ? css`
          background: ${theme.color.surface.field};
        `
      : $variant === 'landing'
        ? css`
            background: ${theme.color.surface.page};
          `
        : css`
            background: transparent;
          `}
`

export default function PageCanvas({
  variant = 'default',
  introOffset = false,
  noFooterGap = false,
  children,
  ...rest
}: PageCanvasProps) {
  return (
    <Root
      $variant={variant}
      $introOffset={introOffset}
      $noFooterGap={noFooterGap}
      {...rest}
    >
      {children}
    </Root>
  )
}
