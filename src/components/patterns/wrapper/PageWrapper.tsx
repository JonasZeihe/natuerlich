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
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  min-width: 0;
  min-height: 100%;
  color: ${({ theme }) => theme.roles.text.primary};
  box-sizing: border-box;
  isolation: isolate;

  ${({ theme, $variant }) =>
    $variant === 'article'
      ? css`
          background: ${theme.roles.surface.panelAlt};
        `
      : $variant === 'landing'
        ? css`
            background:
              radial-gradient(
                120% 54rem at 50% -8rem,
                ${theme.mode === 'dark'
                    ? 'rgba(95, 135, 134, 0.12)'
                    : 'rgba(47, 78, 80, 0.07)'}
                  0%,
                transparent 58%
              ),
              radial-gradient(
                88% 30rem at 14% 26%,
                ${theme.mode === 'dark'
                    ? 'rgba(142, 163, 179, 0.08)'
                    : 'rgba(72, 91, 106, 0.045)'}
                  0%,
                transparent 66%
              ),
              radial-gradient(
                92% 34rem at 84% 72%,
                ${theme.mode === 'dark'
                    ? 'rgba(209, 102, 44, 0.08)'
                    : 'rgba(162, 74, 30, 0.04)'}
                  0%,
                transparent 68%
              ),
              linear-gradient(
                180deg,
                ${theme.roles.surface.canvas} 0%,
                ${theme.mode === 'dark'
                    ? 'rgba(22, 26, 31, 0.985)'
                    : 'rgba(251, 248, 242, 0.985)'}
                  24%,
                ${theme.mode === 'dark'
                    ? 'rgba(19, 24, 29, 0.995)'
                    : 'rgba(246, 241, 233, 0.995)'}
                  52%,
                ${theme.mode === 'dark'
                    ? 'rgba(17, 21, 26, 1)'
                    : 'rgba(243, 238, 229, 1)'}
                  76%,
                ${theme.roles.surface.canvas} 100%
              );
          `
        : css`
            background: transparent;
          `};

  padding-top: ${({ theme, $introOffset, $variant }) =>
    $introOffset
      ? `calc(${theme.layout.section.default.pad} * 0.82)`
      : $variant === 'landing'
        ? `calc(${theme.layout.section.compact.pad} * 0.3)`
        : 0};

  padding-bottom: ${({ theme, $noFooterGap, $variant }) =>
    $noFooterGap
      ? 0
      : $variant === 'landing'
        ? `calc(${theme.layout.section.spacious.pad} * 0.78)`
        : `calc(${theme.layout.section.default.pad} * 0.8)`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme, $introOffset, $variant }) =>
      $introOffset
        ? `calc(${theme.layout.section.default.pad} * 0.7)`
        : $variant === 'landing'
          ? `calc(${theme.layout.section.compact.pad} * 0.22)`
          : 0};

    padding-bottom: ${({ theme, $noFooterGap, $variant }) =>
      $noFooterGap
        ? 0
        : $variant === 'landing'
          ? `calc(${theme.layout.section.spacious.pad} * 0.62)`
          : `calc(${theme.layout.section.default.pad} * 0.66)`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: ${({ theme, $introOffset, $variant }) =>
      $introOffset
        ? `calc(${theme.layout.section.default.pad} * 0.58)`
        : $variant === 'landing'
          ? `calc(${theme.layout.section.compact.pad} * 0.16)`
          : 0};

    padding-bottom: ${({ theme, $noFooterGap, $variant }) =>
      $noFooterGap
        ? 0
        : $variant === 'landing'
          ? `calc(${theme.layout.section.spacious.pad} * 0.48)`
          : `calc(${theme.layout.section.default.pad} * 0.52)`};
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
