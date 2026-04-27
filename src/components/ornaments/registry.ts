// src/components/ornaments/registry.ts
'use client'

import type { ComponentType } from 'react'
import type { EnergyInput, EnergyMix } from '@/design/theme'
import BraidTraceOrnament from './shapes/BraidTraceOrnament'
import CornerMarkOrnament from './shapes/CornerMarkOrnament'
import CrownWoundOrnament from './shapes/CrownWoundOrnament'
import GyroidChannelOrnament from './shapes/GyroidChannelOrnament'
import LineFlareOrnament from './shapes/LineFlareOrnament'
import PartitionFieldOrnament from './shapes/PartitionFieldOrnament'
import RippleOriginOrnament from './shapes/RippleOriginOrnament'
import RootTraceOrnament, {
  type RootTraceOrnamentProps,
} from './shapes/RootTraceOrnament'
import TraceFanOrnament from './shapes/TraceFanOrnament'

const dreamCatcherSvg = new URL(
  './svg/dream-catcher-svgrepo-com.svg',
  import.meta.url
).toString()

export type OrnamentName =
  | 'rootTrace'
  | 'braidTrace'
  | 'lineFlare'
  | 'cornerMark'
  | 'crownWound'
  | 'partitionField'
  | 'gyroidChannel'
  | 'rippleOrigin'
  | 'traceFan'
  | 'dreamCatcher'

export type OrnamentPlacement = 'section' | 'surface'

export type OrnamentAnchor =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center'

export type OrnamentSize = 'sm' | 'md' | 'lg'

export type OrnamentPresence = 'subtle' | 'default' | 'strong'

export type OrnamentScale = 'mark' | 'gesture' | 'structure' | 'field'

export type OrnamentBoundary = 'contained' | 'bleed'

export type OrnamentSpec = {
  name: OrnamentName
  placement: OrnamentPlacement
  anchor?: OrnamentAnchor
  size?: OrnamentSize
  presence?: OrnamentPresence
  boundary?: OrnamentBoundary
  energy?: EnergyInput
  mix?: EnergyMix
  mirrorX?: boolean
  mirrorY?: boolean
}

export type OrnamentFieldSpec = {
  name: OrnamentName
  placement: OrnamentPlacement
  presence?: OrnamentPresence
  boundary?: OrnamentBoundary
  energy?: EnergyInput
  mix?: EnergyMix
}

export type OrnamentConsumerSpec = Omit<OrnamentSpec, 'placement'>

export type OrnamentFieldConsumerSpec = Omit<OrnamentFieldSpec, 'placement'>

export type OrnamentComponentRegistryEntry = {
  kind: 'component'
  component: ComponentType<RootTraceOrnamentProps>
  placements: readonly OrnamentPlacement[]
  viewBox: string
  scale: OrnamentScale
}

export type OrnamentAssetRegistryEntry = {
  kind: 'asset'
  src: string
  placements: readonly OrnamentPlacement[]
  viewBox: string
  scale: OrnamentScale
}

export type OrnamentRegistryEntry =
  | OrnamentComponentRegistryEntry
  | OrnamentAssetRegistryEntry

export const ORNAMENT_REGISTRY: Record<OrnamentName, OrnamentRegistryEntry> = {
  rootTrace: {
    kind: 'component',
    component: RootTraceOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
    scale: 'gesture',
  },
  braidTrace: {
    kind: 'component',
    component: BraidTraceOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
    scale: 'gesture',
  },
  lineFlare: {
    kind: 'component',
    component: LineFlareOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
    scale: 'gesture',
  },
  cornerMark: {
    kind: 'component',
    component: CornerMarkOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 120 120',
    scale: 'mark',
  },
  crownWound: {
    kind: 'component',
    component: CrownWoundOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 360 360',
    scale: 'structure',
  },
  partitionField: {
    kind: 'component',
    component: PartitionFieldOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 520 320',
    scale: 'field',
  },
  gyroidChannel: {
    kind: 'component',
    component: GyroidChannelOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 560 360',
    scale: 'field',
  },
  rippleOrigin: {
    kind: 'component',
    component: RippleOriginOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 280 280',
    scale: 'structure',
  },
  traceFan: {
    kind: 'component',
    component: TraceFanOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 160',
    scale: 'gesture',
  },
  dreamCatcher: {
    kind: 'asset',
    src: dreamCatcherSvg,
    placements: ['section', 'surface'],
    viewBox: '0 0 512 512',
    scale: 'gesture',
  },
}
