// src/components/primitives/Surface.tsx
'use client'

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import styled, { css } from 'styled-components'
import AnchoredAsset from '@/components/assets/AnchoredAsset'
import type {
  AssetConsumerSpec,
  PositionedAssetSpec,
} from '@/components/assets/registry'
import type { MovementKey, SurfaceToneKey } from '@/design/theme'

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg'
type SurfaceRadius = 'none' | 'small' | 'medium' | 'large' | 'pill'
type SurfaceWeight = 'quiet' | 'steady' | 'strong'

type Props = {
  tone?: SurfaceToneKey
  movement?: MovementKey
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  weight?: SurfaceWeight
  asset?: AssetConsumerSpec | null
  assets?: readonly PositionedAssetSpec[] | null
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
  $tone: SurfaceToneKey
  $movement: MovementKey
  $weight: SurfaceWeight
  $assetBleeds: boolean
}

const resolveWeightStyles = (
  weight: SurfaceWeight,
  border: string,
  bordered: boolean
) => {
  if (!bordered || weight === 'quiet') {
    return css`
      box-shadow: none;
    `
  }

  if (weight === 'strong') {
    return css`
      box-shadow:
        inset 0 1px 0 ${border},
        0 0 0 1px ${border};
    `
  }

  return css`
    box-shadow: inset 0 1px 0 ${border};
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

  ${({ theme, $tone, $movement, $bordered, $weight }) => {
    const resolved = theme.getSurfaceTone($tone, $movement)
    const hasBorder = $bordered && resolved.border !== 'transparent'

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${hasBorder ? `1px solid ${resolved.border}` : 'none'};
      backdrop-filter: ${resolved.backdrop};
      -webkit-backdrop-filter: ${resolved.backdrop};
      ${resolveWeightStyles($weight, resolved.border, hasBorder)}
    `
  }}
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
`

const hasBleedingAsset = (
  asset: AssetConsumerSpec | null | undefined,
  assets: readonly PositionedAssetSpec[] | null | undefined
) =>
  asset?.boundary === 'bleed' ||
  Boolean(assets?.some((item) => item.boundary === 'bleed'))

const renderAssets = (
  assets: readonly PositionedAssetSpec[] | null | undefined
) =>
  assets?.map((item, index) => (
    <AnchoredAsset
      key={`${item.name}-${index}`}
      {...item}
      placement="surface"
    />
  )) ?? null

const Surface = forwardRef<HTMLDivElement, Props>(function Surface(
  {
    tone = 'bare',
    movement = 'arrival',
    radius = 'none',
    padding = 'none',
    bordered = false,
    weight = 'quiet',
    asset,
    assets,
    children,
    ...rest
  },
  ref
) {
  return (
    <Base
      ref={ref}
      $tone={tone}
      $movement={movement}
      $radius={radius}
      $padding={padding}
      $bordered={bordered}
      $weight={weight}
      $assetBleeds={hasBleedingAsset(asset, assets)}
      {...rest}
    >
      {asset ? <AnchoredAsset {...asset} placement="surface" /> : null}
      {renderAssets(assets)}
      <Content>{children}</Content>
    </Base>
  )
})

export default Surface
