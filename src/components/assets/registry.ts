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
  '003_Standfeld': {
    src: '/bewegungen/003_Standfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '004_Aufrichtung': {
    src: '/bewegungen/004_Aufrichtung.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '005_Gewichtsverlagerung': {
    src: '/bewegungen/005_Gewichtsverlagerung.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '006_Schrittspur': {
    src: '/bewegungen/006_Schrittspur.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '007_Atemsäule': {
    src: '/bewegungen/007_Atemsäule.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '008_Sammelpunkt': {
    src: '/bewegungen/008_Sammelpunkt.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '009_Verdichtungskern': {
    src: '/bewegungen/009_Verdichtungskern.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '010_Resonanzfeld': {
    src: '/bewegungen/010_Resonanzfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '011_Strömung': {
    src: '/bewegungen/011_Strömung.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '012_S-Kurve': {
    src: '/bewegungen/012_S-Kurve.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '013_Sweep': {
    src: '/bewegungen/013_Sweep.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '014_Drift': {
    src: '/bewegungen/014_Drift.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '015_Ausfächerung': {
    src: '/bewegungen/015_Ausfächerung.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '016_Schwelle': {
    src: '/bewegungen/016_Schwelle.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '017_Kante': {
    src: '/bewegungen/017_Kante.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '018_Fokusfeld': {
    src: '/bewegungen/018_Fokusfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '019_Trägerform': {
    src: '/bewegungen/019_Trägerform.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '020_Halbbogen': {
    src: '/bewegungen/020_Halbbogen.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '021_Ruhige_Wärme': {
    src: '/bewegungen/021_Ruhige_Wärme.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '022_Kühle_Präzision': {
    src: '/bewegungen/022_Kühle_Präzision.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '023_Glimmende_Spur': {
    src: '/bewegungen/023_Glimmende_Spur.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '024_Feine_Restenergie': {
    src: '/bewegungen/024_Feine_Restenergie.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '025_Druckfeld': {
    src: '/bewegungen/025_Druckfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '026_Neuöffnung': {
    src: '/bewegungen/026_Neuöffnung.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '027_Flusskörper': {
    src: '/bewegungen/027_Flusskörper.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '028_Dialogform': {
    src: '/bewegungen/028_Dialogform.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '029_Präsenzfeld': {
    src: '/bewegungen/029_Präsenzfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '030_Schutzfeld': {
    src: '/bewegungen/030_Schutzfeld.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '031_Tatkraft': {
    src: '/bewegungen/031_Tatkraft.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
  '032_Kern': {
    src: '/bewegungen/032_Kern.webp',
    width: 1024,
    height: 1024,
    fit: 'contain',
  },
} as const satisfies Record<string, RegisteredAsset>

export type AssetName = keyof typeof ASSET_REGISTRY

export type AssetPosition = {
  left?: string
  right?: string
  top?: string
  bottom?: string
  width?: string
  height?: string
  zIndex?: number
  opacity?: number
}

export type AnchoredAssetSpec = AssetPosition & {
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
  mobile?: AssetPosition
}

export type AssetConsumerSpec = Omit<AnchoredAssetSpec, 'placement'>

export type PositionedAssetSpec = AssetConsumerSpec
