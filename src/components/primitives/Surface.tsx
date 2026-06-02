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

type Props = {
  tone?: SurfaceToneKey
  movement?: MovementKey
  radius?: SurfaceRadius
  padding?: SurfacePadding
  bordered?: boolean
  asset?: AssetConsumerSpec | null
  assets?: readonly PositionedAssetSpec[] | null
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'color'>

type StyledProps = {
  $radius: SurfaceRadius
  $padding: SurfacePadding
  $bordered: boolean
  $tone: SurfaceToneKey
  $movement?: MovementKey
  $assetBleeds: boolean
}

const Base = styled.div<StyledProps>`
  position: relative;
  min-width: 0;
  border-radius: ${({ theme, $radius }) => theme.borderRadius[$radius]};
  overflow: ${({ $assetBleeds }) => ($assetBleeds ? 'visible' : 'clip')};
  padding: ${({ theme, $padding }) => theme.layout.surface[$padding]};

  ${({ theme, $tone, $movement, $bordered }) => {
    const resolved = theme.getSurfaceTone($tone, $movement)
    const hasBorder = $bordered && resolved.border !== 'transparent'

    return css`
      background: ${resolved.bg};
      color: ${resolved.fg};
      border: ${hasBorder ? `1px solid ${resolved.border}` : '0'};
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
    movement,
    radius = 'none',
    padding = 'none',
    bordered = false,
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
