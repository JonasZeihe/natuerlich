// src/components/primitives/Section.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Container from './Container'

type ContainerSize = 'narrow' | 'default' | 'wide' | 'full'
type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionVariant = 'intro' | 'body' | 'outro'

type Props = {
  container?: ContainerSize
  padY?: boolean
  header?: ReactNode
  footer?: ReactNode
  ariaLabel?: string
  titleId?: string
  rhythm?: RhythmKey
  variant?: SectionVariant
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const RHYTHM_BY_VARIANT: Record<SectionVariant, RhythmKey> = {
  intro: 'spacious',
  body: 'default',
  outro: 'compact',
}

const resolveRhythm = (
  variant: SectionVariant,
  override?: RhythmKey
): RhythmKey => override ?? RHYTHM_BY_VARIANT[variant]

const Outer = styled.section<{ $rhythm: RhythmKey }>`
  width: 100%;
  ${({ theme, $rhythm }) => css`
    margin-block: ${theme.layout.section[$rhythm].gap};

    @media (max-width: ${theme.breakpoints.md}) {
      margin-block: calc(${theme.layout.section[$rhythm].gap} * 0.84);
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      margin-block: calc(${theme.layout.section[$rhythm].gap} * 0.72);
    }
  `}
`

const Inner = styled.div<{ $padY: boolean; $rhythm: RhythmKey }>`
  width: 100%;
  ${({ theme, $padY, $rhythm }) =>
    $padY
      ? css`
          padding-block: ${theme.layout.section[$rhythm].pad};

          @media (max-width: ${theme.breakpoints.md}) {
            padding-block: calc(${theme.layout.section[$rhythm].pad} * 0.86);
          }

          @media (max-width: ${theme.breakpoints.sm}) {
            padding-block: calc(${theme.layout.section[$rhythm].pad} * 0.74);
          }
        `
      : ''}
`

export default function Section({
  container = 'default',
  padY = true,
  header,
  footer,
  ariaLabel,
  titleId,
  rhythm,
  variant = 'body',
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const labelledBy = titleId ?? rest['aria-labelledby']
  const accessibleLabel = ariaLabel ?? rest['aria-label']
  const sectionAriaProps =
    accessibleLabel || labelledBy
      ? {
          'aria-label': accessibleLabel,
          'aria-labelledby': labelledBy,
        }
      : {}

  return (
    <Outer $rhythm={resolvedRhythm} {...rest} {...sectionAriaProps}>
      <Inner $padY={padY} $rhythm={resolvedRhythm}>
        <Container max={container}>
          {header}
          {children}
          {footer}
        </Container>
      </Inner>
    </Outer>
  )
}
