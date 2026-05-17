// src/components/assets/registry.ts
export type AssetPlacement = 'section' | 'surface' | 'free'

export type AssetAnchor =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center'

export type AssetSize = 'sm' | 'md' | 'lg' | 'xl' | 'fill'

export type AssetPresence = 'subtle' | 'default' | 'strong'

export type AssetBoundary = 'contained' | 'bleed'

export type AssetFit = 'contain' | 'cover'

export type RegisteredAsset = {
  src: string
  width: number
  height: number
  fit?: AssetFit
}

export const ASSET_REGISTRY = {
  '001_Atembogen': {
    src: '/bewegungen/001_Atembogen.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '002_Ausatembogen': {
    src: '/bewegungen/002_Ausatembogen.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
} as const satisfies Record<string, RegisteredAsset>

export type AssetName = keyof typeof ASSET_REGISTRY

export type AnchoredAssetSpec = {
  name: AssetName
  placement?: AssetPlacement
  anchor?: AssetAnchor
  size?: AssetSize
  presence?: AssetPresence
  boundary?: AssetBoundary
  fit?: AssetFit
  mirrorX?: boolean
  mirrorY?: boolean
  priority?: boolean
}

export type AssetConsumerSpec = Omit<AnchoredAssetSpec, 'placement'>

export type AssetFieldItem = AssetConsumerSpec & {
  left: string
  top: string
  rotate?: number
  opacity?: number
}

export type AssetFieldSpec = {
  placement?: AssetPlacement
  boundary?: AssetBoundary
  presence?: AssetPresence
  items: readonly AssetFieldItem[]
}
