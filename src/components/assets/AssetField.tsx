// src/components/assets/AssetField.tsx
'use client'

import styled from 'styled-components'
import AnchoredAsset from './AnchoredAsset'
import {
  type AssetBoundary,
  type AssetFieldSpec,
  type AssetPlacement,
  type AssetPresence,
} from './registry'

type Props = AssetFieldSpec

type LayerProps = {
  $boundary: AssetBoundary
  $presence: AssetPresence
}

type ItemProps = {
  $left: string
  $top: string
  $rotate: number
  $opacity: number
}

const resolvePresenceOpacity = (presence: AssetPresence) => {
  if (presence === 'subtle') return 0.56
  if (presence === 'strong') return 1
  return 0.78
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: ${({ $boundary }) =>
    $boundary === 'bleed' ? 'visible' : 'hidden'};
  pointer-events: none;
  user-select: none;
  opacity: ${({ $presence }) => resolvePresenceOpacity($presence)};
`

const Item = styled.div<ItemProps>`
  position: absolute;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  opacity: ${({ $opacity }) => $opacity};
  transform: translate(-50%, -50%) rotate(${({ $rotate }) => $rotate}deg);
  transform-origin: center;
`

export default function AssetField({
  placement = 'free',
  boundary = 'contained',
  presence = 'default',
  items,
}: Props) {
  if (!items.length) {
    return null
  }

  return (
    <Layer
      aria-hidden="true"
      data-asset-field
      $boundary={boundary}
      $presence={presence}
    >
      {items.map((item, index) => (
        <Item
          key={`${item.name}-${index}`}
          $left={item.left}
          $top={item.top}
          $rotate={item.rotate ?? 0}
          $opacity={item.opacity ?? 1}
        >
          <AnchoredAsset
            {...item}
            placement={placement as AssetPlacement}
            boundary={item.boundary ?? boundary}
            presence={item.presence ?? presence}
          />
        </Item>
      ))}
    </Layer>
  )
}
