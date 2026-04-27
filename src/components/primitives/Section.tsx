'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import type { EnergyInput, EnergyMix, SectionToneKey } from '@/design/theme'
import Ornament from '@/components/ornaments/Ornament'
import OrnamentField from '@/components/ornaments/OrnamentField'
import type {
  OrnamentConsumerSpec,
  OrnamentFieldConsumerSpec,
} from '@/components/ornaments/registry'
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
  tone?: SectionToneKey
  energy?: EnergyInput
  mix?: EnergyMix
  bleed?: boolean
  ornament?: OrnamentConsumerSpec | null
  ornamentField?: OrnamentFieldConsumerSpec | null
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

const Outer = styled.section<{
  $tone: SectionToneKey
  $energy?: EnergyInput
  $mix?: EnergyMix
  $bleed: boolean
}>`
  position: relative;
  width: 100%;
  isolation: isolate;

  ${({ theme, $tone, $energy, $mix, $bleed }) => {
    const tone = theme.getSectionTone($tone, $energy, $mix)

    return css`
      ${$bleed
        ? css`
            margin-inline: calc(${theme.layout.containerInset} * -1);
          `
        : ''}

      background: ${tone.base};

      ${tone.overlayOpacity > 0 && tone.edge !== 'transparent'
        ? css`
            box-shadow: inset 0 1px 0 ${tone.edge};
          `
        : ''}

      ${tone.lineOpacity > 0
        ? css`
            border-bottom: 1px solid ${tone.line};
          `
        : ''}

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: ${tone.washOpacity * 0.72};
        background: linear-gradient(
          180deg,
          ${tone.wash} 0%,
          transparent 22%,
          transparent 78%,
          ${tone.wash} 100%
        );
      }
    `
  }}
`

const Inner = styled.div<{
  $padY: boolean
  $rhythm: RhythmKey
  $tone: SectionToneKey
  $energy?: EnergyInput
  $mix?: EnergyMix
}>`
  position: relative;
  z-index: 1;
  width: 100%;

  ${({ theme, $padY, $rhythm, $tone, $energy, $mix }) => {
    const rhythm = theme.layout.section[$rhythm]
    const tone = theme.getSectionTone($tone, $energy, $mix)

    return $padY
      ? css`
          padding-block: calc(${rhythm.pad} * ${tone.padScale});

          @media (max-width: ${theme.breakpoints.md}) {
            padding-block: calc(${rhythm.pad} * ${tone.padScale} * 0.86);
          }

          @media (max-width: ${theme.breakpoints.sm}) {
            padding-block: calc(${rhythm.pad} * ${tone.padScale} * 0.74);
          }
        `
      : ''
  }}
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
  tone = 'default',
  energy,
  mix,
  bleed = false,
  ornament,
  ornamentField,
  children,
  ...rest
}: Props) {
  const resolvedRhythm = resolveRhythm(variant, rhythm)
  const labelledBy = titleId ?? rest['aria-labelledby']
  const accessibleLabel = ariaLabel ?? rest['aria-label']
  const sectionAriaProps =
    accessibleLabel && !labelledBy
      ? { 'aria-label': accessibleLabel }
      : labelledBy
        ? { 'aria-labelledby': labelledBy }
        : {}

  const resolvedOrnament =
    ornament &&
    ({
      ...ornament,
      placement: 'section' as const,
      energy: ornament.energy ?? energy,
      mix: ornament.mix ?? mix,
    } satisfies {
      placement: 'section'
      name: OrnamentConsumerSpec['name']
      anchor?: OrnamentConsumerSpec['anchor']
      size?: OrnamentConsumerSpec['size']
      presence?: OrnamentConsumerSpec['presence']
      boundary?: OrnamentConsumerSpec['boundary']
      energy?: EnergyInput
      mix?: EnergyMix
      mirrorX?: boolean
      mirrorY?: boolean
    })

  const resolvedOrnamentField =
    ornamentField &&
    ({
      ...ornamentField,
      placement: 'section' as const,
      energy: ornamentField.energy ?? energy,
      mix: ornamentField.mix ?? mix,
    } satisfies {
      placement: 'section'
      name: OrnamentFieldConsumerSpec['name']
      presence?: OrnamentFieldConsumerSpec['presence']
      boundary?: OrnamentFieldConsumerSpec['boundary']
      energy?: EnergyInput
      mix?: EnergyMix
    })

  return (
    <Outer
      $tone={tone}
      $energy={energy}
      $mix={mix}
      $bleed={bleed}
      {...rest}
      {...sectionAriaProps}
    >
      {resolvedOrnamentField ? (
        <OrnamentField {...resolvedOrnamentField} />
      ) : null}
      {resolvedOrnament ? <Ornament {...resolvedOrnament} /> : null}

      <Inner
        $padY={padY}
        $rhythm={resolvedRhythm}
        $tone={tone}
        $energy={energy}
        $mix={mix}
      >
        <Container max={container}>
          {header}
          {children}
          {footer}
        </Container>
      </Inner>
    </Outer>
  )
}
