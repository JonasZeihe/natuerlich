// src/components/assets/AnchoredAsset.tsx
'use client'

import styled, { css } from 'styled-components'
import {
  ASSET_REGISTRY,
  type AnchoredAssetSpec,
  type AssetAnchor,
  type AssetBoundary,
  type AssetFit,
  type AssetPlacement,
  type AssetPresence,
  type AssetSize,
} from './registry'

type Props = AnchoredAssetSpec

type LayerProps = {
  $placement: AssetPlacement
  $anchor: AssetAnchor
  $size: AssetSize
  $presence: AssetPresence
  $boundary: AssetBoundary
}

type ImageProps = {
  $fit: AssetFit
  $mirrorX: boolean
  $mirrorY: boolean
}

const resolvePresenceOpacity = (presence: AssetPresence) => {
  if (presence === 'subtle') return 0.42
  if (presence === 'strong') return 0.92
  return 0.68
}

const resolveAnchor = (anchor: AssetAnchor) => {
  if (anchor === 'top-left') {
    return css`
      top: 0;
      left: 0;
      transform: translate(-18%, -18%);
    `
  }

  if (anchor === 'top-center') {
    return css`
      top: 0;
      left: 50%;
      transform: translate(-50%, -22%);
    `
  }

  if (anchor === 'top-right') {
    return css`
      top: 0;
      right: 0;
      transform: translate(18%, -18%);
    `
  }

  if (anchor === 'bottom-left') {
    return css`
      bottom: 0;
      left: 0;
      transform: translate(-18%, 18%);
    `
  }

  if (anchor === 'bottom-center') {
    return css`
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 22%);
    `
  }

  if (anchor === 'bottom-right') {
    return css`
      right: 0;
      bottom: 0;
      transform: translate(18%, 18%);
    `
  }

  if (anchor === 'left') {
    return css`
      top: 50%;
      left: 0;
      transform: translate(-22%, -50%);
    `
  }

  if (anchor === 'right') {
    return css`
      top: 50%;
      right: 0;
      transform: translate(22%, -50%);
    `
  }

  return css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
}

const resolveSize = (placement: AssetPlacement, size: AssetSize) => {
  if (size === 'fill') {
    return css`
      inset: 0;
      width: 100%;
      height: 100%;
      transform: none;
    `
  }

  if (placement === 'surface') {
    if (size === 'sm') return 'clamp(4.5rem, 15vw, 9rem)'
    if (size === 'lg') return 'clamp(10rem, 32vw, 22rem)'
    if (size === 'xl') return 'clamp(14rem, 44vw, 32rem)'
    return 'clamp(7rem, 24vw, 15rem)'
  }

  if (size === 'sm') return 'clamp(8rem, 18vw, 16rem)'
  if (size === 'lg') return 'clamp(18rem, 40vw, 38rem)'
  if (size === 'xl') return 'clamp(24rem, 58vw, 56rem)'
  return 'clamp(12rem, 30vw, 28rem)'
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  opacity: ${({ $presence }) => resolvePresenceOpacity($presence)};

  ${({ $anchor }) => resolveAnchor($anchor)}

  ${({ $placement, $size }) =>
    $size === 'fill'
      ? resolveSize($placement, $size)
      : css`
          width: ${resolveSize($placement, $size)};
          height: auto;
        `}

  ${({ $boundary }) =>
    $boundary === 'contained'
      ? css`
          max-width: 100%;
          max-height: 100%;
        `
      : ''}
`

const Image = styled.img<ImageProps>`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
  transform: scaleX(${({ $mirrorX }) => ($mirrorX ? -1 : 1)})
    scaleY(${({ $mirrorY }) => ($mirrorY ? -1 : 1)});
  transform-origin: center;
`

export default function AnchoredAsset({
  name,
  placement = 'free',
  anchor = 'center',
  size = 'md',
  presence = 'default',
  boundary = 'contained',
  fit,
  mirrorX = false,
  mirrorY = false,
  priority = false,
}: Props) {
  const asset = ASSET_REGISTRY[name]

  if (!asset) {
    return null
  }

  return (
    <Layer
      aria-hidden="true"
      data-anchored-asset={name}
      $placement={placement}
      $anchor={anchor}
      $size={size}
      $presence={presence}
      $boundary={boundary}
    >
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        $fit={fit ?? asset.fit ?? 'contain'}
        $mirrorX={mirrorX}
        $mirrorY={mirrorY}
      />
    </Layer>
  )
}
