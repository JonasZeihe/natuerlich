// src/components/patterns/sections/SectionRecipe.tsx
'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'
import type { AxisKey, SectionToneKey, SurfaceToneKey } from '@/design/theme'

type RhythmKey = 'compact' | 'default' | 'spacious'
type SectionKind = 'info' | 'resonance' | 'call'
type ResolvedSurfaceTone =
  | 'open'
  | 'soft'
  | 'panel'
  | 'elevated'
  | 'inset'
  | 'band'
  | 'accent'

type Props = {
  title?: ReactNode
  intro?: ReactNode
  children?: ReactNode
  surface?: SurfaceToneKey
  accent?: AxisKey | 'neutral'
  narrow?: boolean
  titleId?: string
  ariaLabel?: string
  footer?: ReactNode
  rhythm?: RhythmKey
  variant?: SectionKind
  tone?: SectionToneKey
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

const isPrimitive = (node: ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const resolveSurface = (surface: SurfaceToneKey): ResolvedSurfaceTone => {
  if (surface === 'subtle') return 'soft'
  if (surface === 'neutral') return 'panel'
  if (surface === 'none') return 'open'
  if (surface === 'intense') return 'accent'
  return surface
}

const VARIANT_CONFIG: Record<
  SectionKind,
  {
    surface: SurfaceToneKey
    accent: AxisKey | 'neutral'
    rhythm: RhythmKey
    sectionVariant: 'intro' | 'body' | 'outro'
    tone: SectionToneKey
  }
> = {
  info: {
    surface: 'open',
    accent: 'neutral',
    rhythm: 'default',
    sectionVariant: 'body',
    tone: 'clarify',
  },
  resonance: {
    surface: 'soft',
    accent: 'axisResonance',
    rhythm: 'spacious',
    sectionVariant: 'body',
    tone: 'deepen',
  },
  call: {
    surface: 'band',
    accent: 'axisEnergy',
    rhythm: 'default',
    sectionVariant: 'outro',
    tone: 'arrival',
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
  tone,
  ...rest
}: Props) {
  const variantConfig = VARIANT_CONFIG[variant]
  const resolvedRhythm: RhythmKey = rhythm ?? variantConfig.rhythm
  const resolvedAccent: AxisKey | 'neutral' = accent ?? variantConfig.accent
  const resolvedSurface: ResolvedSurfaceTone = resolveSurface(
    surface ?? variantConfig.surface
  )
  const resolvedTone = tone ?? variantConfig.tone

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
    resolvedSurface === 'open' ? (
      children
    ) : (
      <Surface
        tone={resolvedSurface}
        accent={resolvedAccent}
        radius="large"
        bordered
        padding={resolvedSurface === 'band' ? 'lg' : 'md'}
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
      tone={resolvedTone}
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
