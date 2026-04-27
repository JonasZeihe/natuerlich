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

export type OrnamentSpec = {
  name: OrnamentName
  placement: OrnamentPlacement
  anchor?: OrnamentAnchor
  size?: OrnamentSize
  presence?: OrnamentPresence
  energy?: EnergyInput
  mix?: EnergyMix
  mirrorX?: boolean
  mirrorY?: boolean
}

export type OrnamentConsumerSpec = Omit<OrnamentSpec, 'placement'>

export type OrnamentRegistryEntry = {
  component: ComponentType<RootTraceOrnamentProps>
  placements: readonly OrnamentPlacement[]
  viewBox: string
}

export const ORNAMENT_REGISTRY: Record<OrnamentName, OrnamentRegistryEntry> = {
  rootTrace: {
    component: RootTraceOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
  },
  braidTrace: {
    component: BraidTraceOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
  },
  lineFlare: {
    component: LineFlareOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 120',
  },
  cornerMark: {
    component: CornerMarkOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 120 120',
  },
  crownWound: {
    component: CrownWoundOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 360 360',
  },
  partitionField: {
    component: PartitionFieldOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 520 320',
  },
  gyroidChannel: {
    component: GyroidChannelOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 560 360',
  },
  rippleOrigin: {
    component: RippleOriginOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 280 280',
  },
  traceFan: {
    component: TraceFanOrnament,
    placements: ['section', 'surface'],
    viewBox: '0 0 420 160',
  },
}
