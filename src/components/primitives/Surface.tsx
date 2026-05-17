// src/components/primitives/Surface.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import AnchoredAsset from '@/components/assets/AnchoredAsset'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import type { EnergyInput, EnergyMix, SurfaceToneKey } from '@/design/theme'

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'
type SurfaceRadius = 'none' | 'small' | 'medium' | 'large' | 'pill'
type SurfaceWeight = 'quiet' | 'steady' | 'strong'

type Props = {
  tone?: SurfaceToneKey
  energy?: EnergyInput
  mix?: EnergyMix
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  weight?: SurfaceWeight
  asset?: AssetConsumerSpec | null
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
  $tone: SurfaceToneKey
  $energy?: EnergyInput
  $mix?: EnergyMix
  $weight: SurfaceWeight
  $assetBleeds: boolean
}

const resolveWeightStyles = (
  weight: SurfaceWeight,
  border: string,
  bordered: boolean
) => {
  if (weight === 'quiet') {
    return css`
      box-shadow: none;
    `
  }

  if (weight === 'strong') {
    return css`
      box-shadow:
        inset 0 1px 0 ${bordered ? border : 'transparent'},
        0 0 0 1px ${bordered ? border : 'transparent'};
    `
  }

  return css`
    box-shadow: ${bordered ? `inset 0 1px 0 ${border}` : 'none'};
  `
}

const Base = styled.div<StyledProps>`
  position: relative;
  min-width: 0;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  overflow: ${({ $assetBleeds }) => ($assetBleeds ? 'visible' : 'clip')};

  ${({ theme, $padding }) => css`
    padding: ${$padding === 'none'
      ? '0'
      : theme.layout.surfacePadding[$padding]};
  `}

  ${({ theme, $tone, $energy, $mix, $bordered, $weight }) => {
    const resolved = theme.getSurfaceTone($tone, $energy, $mix)

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${$bordered && resolved.border !== 'transparent'
        ? `1px solid ${resolved.border}`
        : 'none'};
      backdrop-filter: ${resolved.backdrop};
      -webkit-backdrop-filter: ${resolved.backdrop};
      ${resolveWeightStyles($weight, resolved.border, $bordered)}
    `
  }}
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
`

const Surface = forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'panel',
    energy,
    mix,
    radius = 'large',
    padding = 'md',
    bordered = true,
    weight = 'quiet',
    asset,
    children,
    ...rest
  },
  ref
) {
  return (
    <Base
      ref={ref}
      $tone={tone}
      $energy={energy}
      $mix={mix}
      $radius={radius}
      $padding={padding}
      $bordered={bordered}
      $weight={weight}
      $assetBleeds={asset?.boundary === 'bleed'}
      {...rest}
    >
      {asset ? <AnchoredAsset {...asset} placement="surface" /> : null}
      <Content>{children}</Content>
    </Base>
  )
})

export default Surface
