// src/components/ornaments/Ornament.tsx
'use client'

import { useId } from 'react'
import styled, { css, useTheme } from 'styled-components'
import type { EnergyInput, EnergyMix } from '@/design/theme'
import {
  ORNAMENT_REGISTRY,
  type OrnamentAnchor,
  type OrnamentBoundary,
  type OrnamentPlacement,
  type OrnamentPresence,
  type OrnamentScale,
  type OrnamentSize,
  type OrnamentSpec,
} from './registry'
import OrnamentAsset from './OrnamentAsset'

type WrapperProps = {
  $placement: OrnamentPlacement
  $anchor: OrnamentAnchor
  $size: OrnamentSize
  $presence: OrnamentPresence
  $scale: OrnamentScale
  $boundary: OrnamentBoundary
  $mirrorX: boolean
  $mirrorY: boolean
}

const resolvePresenceOpacity = (
  placement: OrnamentPlacement,
  presence: OrnamentPresence
) => {
  if (placement === 'section') {
    if (presence === 'subtle') return 0.56
    if (presence === 'strong') return 0.92
    return 0.76
  }

  if (presence === 'subtle') return 0.42
  if (presence === 'strong') return 0.82
  return 0.62
}

const resolveSectionSize = (
  scale: OrnamentScale,
  size: OrnamentSize
): string => {
  if (scale === 'mark') {
    if (size === 'sm') return 'clamp(5rem, 11vw, 7rem)'
    if (size === 'lg') return 'clamp(8rem, 16vw, 11rem)'
    return 'clamp(6.5rem, 14vw, 9rem)'
  }

  if (scale === 'gesture') {
    if (size === 'sm') return 'clamp(11rem, 22vw, 16rem)'
    if (size === 'lg') return 'clamp(20rem, 40vw, 32rem)'
    return 'clamp(15rem, 30vw, 23rem)'
  }

  if (scale === 'structure') {
    if (size === 'sm') return 'clamp(13rem, 26vw, 19rem)'
    if (size === 'lg') return 'clamp(24rem, 48vw, 40rem)'
    return 'clamp(18rem, 38vw, 30rem)'
  }

  if (size === 'sm') return 'clamp(16rem, 32vw, 24rem)'
  if (size === 'lg') return 'clamp(32rem, 62vw, 56rem)'
  return 'clamp(24rem, 48vw, 42rem)'
}

const resolveSurfaceSize = (
  scale: OrnamentScale,
  size: OrnamentSize
): string => {
  if (scale === 'mark') {
    if (size === 'sm') return 'clamp(3.25rem, 7vw, 4.75rem)'
    if (size === 'lg') return 'clamp(5.4rem, 11vw, 7.25rem)'
    return 'clamp(4.2rem, 9vw, 5.9rem)'
  }

  if (scale === 'gesture') {
    if (size === 'sm') return 'clamp(5rem, 10vw, 7rem)'
    if (size === 'lg') return 'clamp(9rem, 18vw, 13rem)'
    return 'clamp(6.8rem, 14vw, 9.5rem)'
  }

  if (scale === 'structure') {
    if (size === 'sm') return 'clamp(6rem, 13vw, 8.5rem)'
    if (size === 'lg') return 'clamp(13rem, 26vw, 20rem)'
    return 'clamp(9rem, 19vw, 14rem)'
  }

  if (size === 'sm') return 'clamp(8rem, 17vw, 12rem)'
  if (size === 'lg') return 'clamp(18rem, 36vw, 30rem)'
  return 'clamp(12rem, 26vw, 22rem)'
}

const resolveVisualSize = (
  placement: OrnamentPlacement,
  size: OrnamentSize,
  scale: OrnamentScale
) =>
  placement === 'section'
    ? resolveSectionSize(scale, size)
    : resolveSurfaceSize(scale, size)

const resolveBleedOffset = (scale: OrnamentScale): string => {
  if (scale === 'mark') return '18%'
  if (scale === 'gesture') return '26%'
  if (scale === 'structure') return '34%'
  return '42%'
}

const resolveSectionAnchorStyles = (
  anchor: OrnamentAnchor,
  inset: string,
  boundary: OrnamentBoundary,
  scale: OrnamentScale
) => {
  const bleed = boundary === 'bleed' ? resolveBleedOffset(scale) : '0%'

  if (anchor === 'top-left') {
    return css`
      top: 0;
      left: ${inset};
      transform: translate(-${bleed}, calc(-18% - ${bleed}));
    `
  }

  if (anchor === 'top-center') {
    return css`
      top: 0;
      left: 50%;
      transform: translate(-50%, calc(-18% - ${bleed}));
    `
  }

  if (anchor === 'top-right') {
    return css`
      top: 0;
      right: ${inset};
      transform: translate(${bleed}, calc(-18% - ${bleed}));
    `
  }

  if (anchor === 'bottom-left') {
    return css`
      bottom: 0;
      left: ${inset};
      transform: translate(-${bleed}, calc(42% + ${bleed}));
    `
  }

  if (anchor === 'bottom-center') {
    return css`
      bottom: 0;
      left: 50%;
      transform: translate(-50%, calc(42% + ${bleed}));
    `
  }

  if (anchor === 'bottom-right') {
    return css`
      bottom: 0;
      right: ${inset};
      transform: translate(${bleed}, calc(42% + ${bleed}));
    `
  }

  if (anchor === 'left') {
    return css`
      top: 50%;
      left: ${inset};
      transform: translate(calc(-1 * ${bleed}), -50%);
    `
  }

  if (anchor === 'center') {
    return css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  }

  return css`
    top: 50%;
    right: ${inset};
    transform: translate(${bleed}, -50%);
  `
}

const resolveSurfaceAnchorStyles = (
  anchor: OrnamentAnchor,
  inset: string,
  boundary: OrnamentBoundary,
  scale: OrnamentScale
) => {
  const bleed = boundary === 'bleed' ? resolveBleedOffset(scale) : '0%'

  if (anchor === 'top-left') {
    return css`
      top: ${inset};
      left: ${inset};
      transform: translate(-${bleed}, -${bleed});
    `
  }

  if (anchor === 'top-center') {
    return css`
      top: ${inset};
      left: 50%;
      transform: translate(-50%, -${bleed});
    `
  }

  if (anchor === 'top-right') {
    return css`
      top: ${inset};
      right: ${inset};
      transform: translate(${bleed}, -${bleed});
    `
  }

  if (anchor === 'bottom-left') {
    return css`
      bottom: ${inset};
      left: ${inset};
      transform: translate(-${bleed}, ${bleed});
    `
  }

  if (anchor === 'bottom-center') {
    return css`
      bottom: ${inset};
      left: 50%;
      transform: translate(-50%, ${bleed});
    `
  }

  if (anchor === 'bottom-right') {
    return css`
      bottom: ${inset};
      right: ${inset};
      transform: translate(${bleed}, ${bleed});
    `
  }

  if (anchor === 'left') {
    return css`
      top: 50%;
      left: ${inset};
      transform: translate(calc(-1 * ${bleed}), -50%);
    `
  }

  if (anchor === 'center') {
    return css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  }

  return css`
    top: 50%;
    right: ${inset};
    transform: translate(${bleed}, -50%);
  `
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  opacity: ${({ $placement, $presence }) =>
    resolvePresenceOpacity($placement, $presence)};

  ${({
    theme,
    $placement,
    $anchor,
    $size,
    $scale,
    $boundary,
    $mirrorX,
    $mirrorY,
  }) => {
    const inset =
      $placement === 'section' ? theme.spacing(1.15) : theme.spacing(0.75)

    return css`
      ${$placement === 'section'
        ? resolveSectionAnchorStyles($anchor, inset, $boundary, $scale)
        : resolveSurfaceAnchorStyles($anchor, inset, $boundary, $scale)}

      & > svg,
      & > [data-ornament-asset] {
        width: ${resolveVisualSize($placement, $size, $scale)};
        max-width: none;
        height: auto;
        overflow: visible;
        transform: scaleX(${$mirrorX ? -1 : 1}) scaleY(${$mirrorY ? -1 : 1});
        transform-origin: center;
      }
    `
  }}
`

const resolveFallbackColors = (
  theme: ReturnType<typeof useTheme>,
  energy?: EnergyInput,
  mix?: EnergyMix
) => {
  if (mix) {
    const first = theme.getEnergyRole(mix[0])
    const second = theme.getEnergyRole(mix[1])

    return {
      startColor: first.fill,
      endColor: second.fill,
    }
  }

  if (energy) {
    const role = theme.getEnergyRole(energy)

    return {
      startColor: role.fill,
      endColor: role.border,
    }
  }

  return {
    startColor: theme.roles.border.accent,
    endColor: theme.roles.border.subtle,
  }
}

export default function Ornament({
  name,
  placement,
  anchor = placement === 'section' ? 'bottom-right' : 'top-right',
  size = placement === 'section' ? 'md' : 'sm',
  presence = 'default',
  boundary = 'contained',
  energy,
  mix,
  mirrorX = false,
  mirrorY = false,
}: OrnamentSpec) {
  const theme = useTheme()
  const gradientSeed = useId().replace(/:/g, '')
  const entry = ORNAMENT_REGISTRY[name]

  if (!entry || !entry.placements.includes(placement)) {
    return null
  }

  const { startColor, endColor } = resolveFallbackColors(theme, energy, mix)

  return (
    <Wrapper
      aria-hidden
      $placement={placement}
      $anchor={anchor}
      $size={size}
      $presence={presence}
      $scale={entry.scale}
      $boundary={boundary}
      $mirrorX={mirrorX}
      $mirrorY={mirrorY}
    >
      {entry.kind === 'component' ? (
        <entry.component
          gradientId={`ornament-${name}-${gradientSeed}`}
          startColor={startColor}
          endColor={endColor}
        />
      ) : (
        <OrnamentAsset
          src={entry.src}
          viewBox={entry.viewBox}
          startColor={startColor}
          endColor={endColor}
        />
      )}
    </Wrapper>
  )
}
