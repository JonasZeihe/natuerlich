// src/components/patterns/sections/SectionRecipe.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import type { AxisKey } from '@/design/theme'

type SurfaceVariant = 'subtle' | 'intense' | 'none'
type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionKind = 'info' | 'resonance' | 'call'

type Props = {
  title?: ReactNode
  intro?: ReactNode
  children?: ReactNode
  surface?: SurfaceVariant
  accent?: AxisKey | 'neutral'
  narrow?: boolean
  titleId?: string
  ariaLabel?: string
  footer?: ReactNode
  rhythm?: RhythmKey
  variant?: SectionKind
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const isPrimitive = (node: ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const mapTone = (surface: SurfaceVariant): 'neutral' | 'subtle' | 'accent' => {
  if (surface === 'intense') return 'accent'
  if (surface === 'subtle') return 'subtle'
  return 'neutral'
}

const VARIANT_CONFIG: Record<
  SectionKind,
  {
    surface: SurfaceVariant
    accent: AxisKey | 'neutral'
    rhythm: RhythmKey
    sectionVariant: 'intro' | 'body' | 'outro'
  }
> = {
  info: {
    surface: 'subtle',
    accent: 'neutral',
    rhythm: 'default',
    sectionVariant: 'body',
  },
  resonance: {
    surface: 'subtle',
    accent: 'axisResonance',
    rhythm: 'spacious',
    sectionVariant: 'body',
  },
  call: {
    surface: 'intense',
    accent: 'axisEnergy',
    rhythm: 'default',
    sectionVariant: 'outro',
  },
}

const HeaderStack = styled(Stack)<{ $rhythm: RhythmKey }>`
  ${({ theme, $rhythm }) => {
    const pad = theme.layout.section[$rhythm].pad
    return css`
      gap: calc(${pad} / 4.5);

      @media (max-width: ${theme.breakpoints.sm}) {
        gap: calc(${pad} / 5.2);
      }
    `
  }}
`

const BodyStack = styled(Stack)<{ $rhythm: RhythmKey }>`
  ${({ theme, $rhythm }) => {
    const gap = theme.layout.section[$rhythm].gap
    return css`
      gap: calc(${gap} / 2.35);

      @media (max-width: ${theme.breakpoints.sm}) {
        gap: calc(${gap} / 2.7);
      }
    `
  }}
`

export default function SectionRecipe({
  title,
  intro,
  children,
  surface,
  accent,
  narrow = false,
  titleId,
  ariaLabel,
  footer,
  rhythm,
  variant = 'info',
  ...rest
}: Props) {
  const variantConfig = VARIANT_CONFIG[variant]
  const resolvedRhythm: RhythmKey = rhythm ?? variantConfig.rhythm
  const resolvedAccent: AxisKey | 'neutral' = accent ?? variantConfig.accent
  const resolvedSurface: SurfaceVariant = surface ?? variantConfig.surface
  const tone = mapTone(resolvedSurface)

  const hasHeader = title != null || intro != null
  const hasContent = children != null
  const hasFooter = footer != null

  const header = hasHeader ? (
    <HeaderStack gap={0} $rhythm={resolvedRhythm}>
      {title ? (
        isPrimitive(title) ? (
          <Typography as="h2" variant="h2" accent={resolvedAccent} id={titleId}>
            {title}
          </Typography>
        ) : (
          title
        )
      ) : null}

      {intro ? (
        isPrimitive(intro) ? (
          <Typography as="p" variant="body" tone="soft">
            {intro}
          </Typography>
        ) : (
          intro
        )
      ) : null}
    </HeaderStack>
  ) : null

  const content = hasContent ? (
    resolvedSurface === 'none' ? (
      children
    ) : (
      <Surface
        tone={tone}
        accent={resolvedAccent}
        radius="large"
        bordered
        padding="md"
      >
        {children}
      </Surface>
    )
  ) : null

  if (!hasHeader && !hasContent && !hasFooter) {
    return null
  }

  return (
    <Section
      container={narrow ? 'narrow' : 'default'}
      padY
      ariaLabel={ariaLabel}
      titleId={isPrimitive(title) ? titleId : undefined}
      rhythm={resolvedRhythm}
      variant={variantConfig.sectionVariant}
      {...rest}
    >
      <BodyStack gap={0} $rhythm={resolvedRhythm}>
        {header}
        {content}
        {footer}
      </BodyStack>
    </Section>
  )
}
