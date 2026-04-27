// src/components/ornaments/Ornament.tsx
'use client'

import { useId } from 'react'
import styled, { css, useTheme } from 'styled-components'
import type { EnergyInput, EnergyMix } from '@/design/theme'
import {
  ORNAMENT_REGISTRY,
  type OrnamentAnchor,
  type OrnamentPlacement,
  type OrnamentPresence,
  type OrnamentSize,
  type OrnamentSpec,
} from './registry'

type WrapperProps = {
  $placement: OrnamentPlacement
  $anchor: OrnamentAnchor
  $size: OrnamentSize
  $presence: OrnamentPresence
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

const resolveVisualSize = (
  placement: OrnamentPlacement,
  size: OrnamentSize
) => {
  if (placement === 'section') {
    if (size === 'sm') return 'clamp(10rem, 24vw, 16rem)'
    if (size === 'lg') return 'clamp(20rem, 42vw, 32rem)'
    return 'clamp(14rem, 30vw, 22rem)'
  }

  if (size === 'sm') return 'clamp(3.25rem, 7vw, 4.75rem)'
  if (size === 'lg') return 'clamp(5.4rem, 11vw, 7.25rem)'
  return 'clamp(4.2rem, 9vw, 5.9rem)'
}

const resolveSectionAnchorStyles = (anchor: OrnamentAnchor, inset: string) => {
  if (anchor === 'top-left') {
    return css`
      top: 0;
      left: ${inset};
      transform: translateY(-18%);
    `
  }

  if (anchor === 'top-center') {
    return css`
      top: 0;
      left: 50%;
      transform: translate(-50%, -18%);
    `
  }

  if (anchor === 'top-right') {
    return css`
      top: 0;
      right: ${inset};
      transform: translateY(-18%);
    `
  }

  if (anchor === 'bottom-left') {
    return css`
      bottom: 0;
      left: ${inset};
      transform: translateY(42%);
    `
  }

  if (anchor === 'bottom-center') {
    return css`
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 42%);
    `
  }

  if (anchor === 'bottom-right') {
    return css`
      bottom: 0;
      right: ${inset};
      transform: translateY(42%);
    `
  }

  if (anchor === 'left') {
    return css`
      top: 50%;
      left: ${inset};
      transform: translateY(-50%);
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
    transform: translateY(-50%);
  `
}

const resolveSurfaceAnchorStyles = (anchor: OrnamentAnchor, inset: string) => {
  if (anchor === 'top-left') {
    return css`
      top: ${inset};
      left: ${inset};
    `
  }

  if (anchor === 'top-center') {
    return css`
      top: ${inset};
      left: 50%;
      transform: translateX(-50%);
    `
  }

  if (anchor === 'top-right') {
    return css`
      top: ${inset};
      right: ${inset};
    `
  }

  if (anchor === 'bottom-left') {
    return css`
      bottom: ${inset};
      left: ${inset};
    `
  }

  if (anchor === 'bottom-center') {
    return css`
      bottom: ${inset};
      left: 50%;
      transform: translateX(-50%);
    `
  }

  if (anchor === 'bottom-right') {
    return css`
      bottom: ${inset};
      right: ${inset};
    `
  }

  if (anchor === 'left') {
    return css`
      top: 50%;
      left: ${inset};
      transform: translateY(-50%);
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
    transform: translateY(-50%);
  `
}

const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 0;
  opacity: ${({ $placement, $presence }) =>
    resolvePresenceOpacity($placement, $presence)};

  ${({ theme, $placement, $anchor, $size, $mirrorX, $mirrorY }) => {
    const inset =
      $placement === 'section' ? theme.spacing(1.15) : theme.spacing(0.75)

    return css`
      ${$placement === 'section'
        ? resolveSectionAnchorStyles($anchor, inset)
        : resolveSurfaceAnchorStyles($anchor, inset)}

      & > svg {
        width: ${resolveVisualSize($placement, $size)};
        max-width: 100%;
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
  const Shape = entry.component

  return (
    <Wrapper
      aria-hidden
      $placement={placement}
      $anchor={anchor}
      $size={size}
      $presence={presence}
      $mirrorX={mirrorX}
      $mirrorY={mirrorY}
    >
      <Shape
        gradientId={`ornament-${name}-${gradientSeed}`}
        startColor={startColor}
        endColor={endColor}
      />
    </Wrapper>
  )
}
