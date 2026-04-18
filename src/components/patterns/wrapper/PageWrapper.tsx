// src/components/patterns/wrapper/PageWrapper.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

type PageWrapperVariant = 'default' | 'landing' | 'article'

type PageWrapperProps = React.ComponentPropsWithoutRef<'div'> & {
  variant?: PageWrapperVariant
  introOffset?: boolean
  noFooterGap?: boolean
  children: ReactNode
}

const Root = styled.div<{
  $variant: PageWrapperVariant
  $introOffset: boolean
  $noFooterGap: boolean
}>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  position: relative;
  box-sizing: border-box;
  color: ${({ theme }) => theme.roles.text.primary};
  background: ${({ theme, $variant }) =>
    $variant === 'article' ? theme.roles.surface.panelAlt : 'transparent'};
  padding-top: ${({ theme, $introOffset }) =>
    $introOffset ? `calc(${theme.layout.section.default.pad} * 0.82)` : 0};
  padding-bottom: ${({ theme, $noFooterGap }) =>
    $noFooterGap ? 0 : `calc(${theme.layout.section.default.pad} * 0.8)`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme, $introOffset }) =>
      $introOffset ? `calc(${theme.layout.section.default.pad} * 0.7)` : 0};
    padding-bottom: ${({ theme, $noFooterGap }) =>
      $noFooterGap ? 0 : `calc(${theme.layout.section.default.pad} * 0.66)`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: ${({ theme, $introOffset }) =>
      $introOffset ? `calc(${theme.layout.section.default.pad} * 0.58)` : 0};
    padding-bottom: ${({ theme, $noFooterGap }) =>
      $noFooterGap ? 0 : `calc(${theme.layout.section.default.pad} * 0.52)`};
  }
`

export default function PageWrapper({
  variant = 'default',
  introOffset = false,
  noFooterGap = false,
  children,
  ...rest
}: PageWrapperProps) {
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
