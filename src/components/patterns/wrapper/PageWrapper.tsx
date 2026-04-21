// src/components/patterns/wrapper/PageWrapper.tsx
'use client'

import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

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
  overflow: clip;
  color: ${({ theme }) => theme.roles.text.primary};
  padding-top: ${({ theme, $introOffset }) =>
    $introOffset ? `calc(${theme.layout.section.default.pad} * 0.82)` : 0};
  padding-bottom: ${({ theme, $noFooterGap }) =>
    $noFooterGap ? 0 : `calc(${theme.layout.section.default.pad} * 0.8)`};

  ${({ theme, $variant }) =>
    $variant === 'article'
      ? css`
          background: ${theme.roles.surface.panelAlt};
        `
      : $variant === 'landing'
        ? css`
            background:
              radial-gradient(
                120% 36rem at 50% -8%,
                ${theme.mode === 'dark'
                    ? 'rgba(95, 135, 134, 0.14)'
                    : 'rgba(47, 78, 80, 0.085)'}
                  0%,
                transparent 68%
              ),
              radial-gradient(
                96% 24rem at 18% 26%,
                ${theme.mode === 'dark'
                    ? 'rgba(142, 163, 179, 0.08)'
                    : 'rgba(72, 91, 106, 0.05)'}
                  0%,
                transparent 74%
              ),
              linear-gradient(
                180deg,
                ${theme.roles.surface.canvas} 0%,
                ${theme.mode === 'dark'
                    ? 'rgba(22, 26, 31, 0.98)'
                    : 'rgba(251, 248, 242, 0.98)'}
                  24%,
                ${theme.mode === 'dark'
                    ? 'rgba(19, 24, 29, 0.98)'
                    : 'rgba(247, 242, 234, 0.98)'}
                  56%,
                ${theme.mode === 'dark'
                    ? 'rgba(16, 19, 23, 1)'
                    : 'rgba(242, 238, 231, 1)'}
                  100%
              );
          `
        : css`
            background: transparent;
          `}

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  ${({ theme, $variant }) =>
    $variant === 'landing'
      ? css`
          &::before {
            background:
              radial-gradient(
                70% 18rem at 82% 14%,
                ${theme.mode === 'dark'
                    ? 'rgba(209, 102, 44, 0.06)'
                    : 'rgba(162, 74, 30, 0.04)'}
                  0%,
                transparent 72%
              ),
              radial-gradient(
                84% 20rem at 50% 66%,
                ${theme.mode === 'dark'
                    ? 'rgba(95, 135, 134, 0.05)'
                    : 'rgba(47, 78, 80, 0.03)'}
                  0%,
                transparent 78%
              );
            opacity: 0.9;
          }

          &::after {
            background: linear-gradient(
              180deg,
              transparent 0%,
              ${theme.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.015)'
                  : 'rgba(20, 23, 27, 0.012)'}
                20%,
              transparent 38%,
              ${theme.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.02)'
                  : 'rgba(20, 23, 27, 0.014)'}
                62%,
              transparent 100%
            );
            opacity: 0.9;
          }
        `
      : ''}

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
