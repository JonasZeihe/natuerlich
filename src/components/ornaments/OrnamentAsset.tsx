// src/components/ornaments/OrnamentAsset.tsx
'use client'

import styled from 'styled-components'

type OrnamentAssetProps = {
  src: string
  viewBox: string
  startColor: string
  endColor: string
  className?: string
}

type AssetProps = {
  $src: string
  $startColor: string
  $endColor: string
  $aspectRatio: string
}

const resolveAspectRatio = (viewBox: string): string => {
  const parts = viewBox.trim().split(/\s+/).map(Number)

  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) {
    return '1 / 1'
  }

  const [, , width, height] = parts

  if (width <= 0 || height <= 0) {
    return '1 / 1'
  }

  return `${width} / ${height}`
}

const Asset = styled.div<AssetProps>`
  display: block;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background: linear-gradient(
    135deg,
    ${({ $startColor }) => $startColor} 0%,
    ${({ $endColor }) => $endColor} 100%
  );
  mask-image: ${({ $src }) => `url("${$src}")`};
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-image: ${({ $src }) => `url("${$src}")`};
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
`

export default function OrnamentAsset({
  src,
  viewBox,
  startColor,
  endColor,
  className,
}: OrnamentAssetProps) {
  return (
    <Asset
      aria-hidden
      data-ornament-asset
      className={className}
      $src={src}
      $startColor={startColor}
      $endColor={endColor}
      $aspectRatio={resolveAspectRatio(viewBox)}
    />
  )
}
