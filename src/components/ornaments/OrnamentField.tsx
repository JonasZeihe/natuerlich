'use client'

import { useId } from 'react'
import styled, { useTheme } from 'styled-components'
import type { EnergyInput, EnergyMix } from '@/design/theme'
import {
  ORNAMENT_REGISTRY,
  type OrnamentBoundary,
  type OrnamentFieldSpec,
  type OrnamentName,
  type OrnamentPlacement,
  type OrnamentPresence,
} from './registry'

type FieldItemSize = 'sm' | 'md' | 'lg'

type FieldItem = {
  left: string
  top: string
  size: FieldItemSize
  opacity: number
  rotate: number
  mirrorX?: boolean
  mirrorY?: boolean
}

type LayerProps = {
  $presence: OrnamentPresence
  $boundary: OrnamentBoundary
}

type ItemProps = {
  $left: string
  $top: string
  $width: string
  $opacity: number
  $rotate: number
  $mirrorX: boolean
  $mirrorY: boolean
}

const resolvePresenceOpacity = (presence: OrnamentPresence) => {
  if (presence === 'subtle') return 0.7
  if (presence === 'strong') return 0.96
  return 0.84
}

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

const resolveItemWidth = (
  placement: OrnamentPlacement,
  size: FieldItemSize
) => {
  if (placement === 'section') {
    if (size === 'sm') return 'clamp(11rem, 20vw, 21rem)'
    if (size === 'lg') return 'clamp(24rem, 42vw, 48rem)'
    return 'clamp(16rem, 30vw, 34rem)'
  }

  if (size === 'sm') return 'clamp(5rem, 10vw, 8rem)'
  if (size === 'lg') return 'clamp(10rem, 22vw, 18rem)'
  return 'clamp(7rem, 16vw, 13rem)'
}

const partitionFieldItems: readonly FieldItem[] = [
  {
    left: '82%',
    top: '76%',
    size: 'lg',
    opacity: 0.3,
    rotate: -4,
  },
  {
    left: '24%',
    top: '26%',
    size: 'md',
    opacity: 0.18,
    rotate: 7,
    mirrorX: true,
  },
  {
    left: '58%',
    top: '44%',
    size: 'sm',
    opacity: 0.13,
    rotate: -10,
  },
  {
    left: '36%',
    top: '78%',
    size: 'md',
    opacity: 0.15,
    rotate: 11,
    mirrorY: true,
  },
  {
    left: '88%',
    top: '28%',
    size: 'sm',
    opacity: 0.11,
    rotate: 5,
    mirrorX: true,
  },
]

const gyroidChannelItems: readonly FieldItem[] = [
  {
    left: '70%',
    top: '28%',
    size: 'lg',
    opacity: 0.28,
    rotate: -3,
  },
  {
    left: '34%',
    top: '56%',
    size: 'md',
    opacity: 0.18,
    rotate: 8,
    mirrorX: true,
  },
  {
    left: '80%',
    top: '74%',
    size: 'md',
    opacity: 0.14,
    rotate: -10,
  },
  {
    left: '28%',
    top: '24%',
    size: 'sm',
    opacity: 0.11,
    rotate: 12,
    mirrorY: true,
  },
]

const crownWoundItems: readonly FieldItem[] = [
  {
    left: '18%',
    top: '22%',
    size: 'md',
    opacity: 0.18,
    rotate: -9,
    mirrorX: true,
  },
  {
    left: '84%',
    top: '82%',
    size: 'lg',
    opacity: 0.14,
    rotate: 10,
  },
]

const rippleOriginItems: readonly FieldItem[] = [
  {
    left: '24%',
    top: '28%',
    size: 'sm',
    opacity: 0.22,
    rotate: -4,
  },
  {
    left: '78%',
    top: '30%',
    size: 'sm',
    opacity: 0.16,
    rotate: 8,
    mirrorX: true,
  },
  {
    left: '66%',
    top: '74%',
    size: 'md',
    opacity: 0.14,
    rotate: -7,
  },
  {
    left: '38%',
    top: '66%',
    size: 'sm',
    opacity: 0.12,
    rotate: 11,
    mirrorY: true,
  },
]

const defaultItems: readonly FieldItem[] = [
  {
    left: '78%',
    top: '28%',
    size: 'md',
    opacity: 0.22,
    rotate: -5,
  },
  {
    left: '28%',
    top: '72%',
    size: 'sm',
    opacity: 0.14,
    rotate: 9,
    mirrorX: true,
  },
  {
    left: '52%',
    top: '48%',
    size: 'sm',
    opacity: 0.11,
    rotate: -12,
    mirrorY: true,
  },
]

const resolveItems = (name: OrnamentName): readonly FieldItem[] => {
  if (name === 'partitionField') return partitionFieldItems
  if (name === 'gyroidChannel') return gyroidChannelItems
  if (name === 'crownWound') return crownWoundItems
  if (name === 'rippleOrigin') return rippleOriginItems
  return defaultItems
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  overflow: ${({ $boundary }) =>
    $boundary === 'bleed' ? 'visible' : 'hidden'};
  opacity: ${({ $presence }) => resolvePresenceOpacity($presence)};
  border-radius: inherit;
`

const Item = styled.div<ItemProps>`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  width: ${({ $width }) => $width};
  opacity: ${({ $opacity }) => $opacity};
  transform: translate(-50%, -50%) rotate(${({ $rotate }) => $rotate}deg)
    scaleX(${({ $mirrorX }) => ($mirrorX ? -1 : 1)})
    scaleY(${({ $mirrorY }) => ($mirrorY ? -1 : 1)});
  transform-origin: center;

  & > svg {
    width: 100%;
    max-width: none;
    height: auto;
    overflow: visible;
  }
`

export default function OrnamentField({
  name,
  placement,
  presence = 'default',
  boundary = 'contained',
  energy,
  mix,
}: OrnamentFieldSpec) {
  const theme = useTheme()
  const idSeed = useId().replace(/:/g, '')
  const entry = ORNAMENT_REGISTRY[name]

  if (!entry || !entry.placements.includes(placement)) {
    return null
  }

  const Shape = entry.component
  const items = resolveItems(name)
  const { startColor, endColor } = resolveFallbackColors(theme, energy, mix)

  return (
    <Layer aria-hidden $presence={presence} $boundary={boundary}>
      {items.map((item, index) => (
        <Item
          key={`${name}-field-${index}`}
          $left={item.left}
          $top={item.top}
          $width={resolveItemWidth(placement, item.size)}
          $opacity={item.opacity}
          $rotate={item.rotate}
          $mirrorX={item.mirrorX ?? false}
          $mirrorY={item.mirrorY ?? false}
        >
          <Shape
            gradientId={`ornament-field-${name}-${idSeed}-${index}`}
            startColor={startColor}
            endColor={endColor}
          />
        </Item>
      ))}
    </Layer>
  )
}
