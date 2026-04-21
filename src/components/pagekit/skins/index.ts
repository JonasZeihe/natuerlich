// src/components/pagekit/skins/index.ts
import type { AxisKey, SectionToneKey, SurfaceToneKey } from '@/design/theme'

export type RhythmKey = 'compact' | 'default' | 'spacious'

export type SkinKey =
  | 'home'
  | 'blogIndex'
  | 'blogCategory'
  | 'blogPost'
  | 'about'
  | 'search'
  | 'impressum'
  | 'support'
  | 'auth'

export type SectionProfile = {
  tone?: SectionToneKey
  surface?: SurfaceToneKey
}

export type HeroProfile = {
  container?: 'default' | 'wide' | 'narrow'
  variant?: 'default' | 'split'
  tone?: SectionToneKey
  mediaTone?: SurfaceToneKey
}

export type BentoProfile = {
  preset?: 'triad' | 'none'
  min?: string
  gap?: number
  columns?: number | 'auto'
  tone?: SectionToneKey
}

export type PageSkin = {
  axisKey: AxisKey | 'neutral'
  rhythm: RhythmKey
  defaultSectionTone: SectionToneKey
  defaultSurfaceTone: SurfaceToneKey
  gridProps?: {
    min?: string
    gap?: number
    columns?: number | 'auto'
  }
  sections?: {
    info?: SectionProfile
    resonance?: SectionProfile
    call?: SectionProfile
  }
  hero?: HeroProfile
  bento?: BentoProfile
}

export const pageSkins: Record<SkinKey, PageSkin> = {
  home: {
    axisKey: 'axisResonance',
    rhythm: 'spacious',
    defaultSectionTone: 'deepen',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'clarify', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'wide',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'soft',
    },
    bento: {
      preset: 'triad',
      min: '18rem',
      gap: 2,
      columns: 'auto',
      tone: 'expand',
    },
  },
  blogIndex: {
    axisKey: 'axisClarity',
    rhythm: 'default',
    defaultSectionTone: 'clarify',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'clarify', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'default',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'soft',
    },
  },
  blogCategory: {
    axisKey: 'axisClarity',
    rhythm: 'default',
    defaultSectionTone: 'clarify',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'clarify', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'default',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'soft',
    },
  },
  blogPost: {
    axisKey: 'axisResonance',
    rhythm: 'spacious',
    defaultSectionTone: 'deepen',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'clarify', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'narrow',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'open',
    },
  },
  about: {
    axisKey: 'axisResonance',
    rhythm: 'default',
    defaultSectionTone: 'deepen',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'clarify', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'narrow',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'soft',
    },
  },
  search: {
    axisKey: 'axisClarity',
    rhythm: 'compact',
    defaultSectionTone: 'relief',
    defaultSurfaceTone: 'open',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'relief', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
  },
  impressum: {
    axisKey: 'neutral',
    rhythm: 'default',
    defaultSectionTone: 'relief',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'relief', surface: 'soft' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'narrow',
      variant: 'default',
      tone: 'clarify',
      mediaTone: 'open',
    },
  },
  support: {
    axisKey: 'neutral',
    rhythm: 'default',
    defaultSectionTone: 'relief',
    defaultSurfaceTone: 'soft',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      info: { tone: 'relief', surface: 'soft' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'narrow',
      variant: 'default',
      tone: 'clarify',
      mediaTone: 'open',
    },
  },
  auth: {
    axisKey: 'axisClarity',
    rhythm: 'compact',
    defaultSectionTone: 'relief',
    defaultSurfaceTone: 'open',
    gridProps: { min: '18rem', gap: 2, columns: 1 },
    sections: {
      info: { tone: 'relief', surface: 'open' },
      resonance: { tone: 'deepen', surface: 'soft' },
      call: { tone: 'arrival', surface: 'band' },
    },
    hero: {
      container: 'narrow',
      variant: 'default',
      tone: 'opening',
      mediaTone: 'open',
    },
  },
}

export const resolveSkin = (key: SkinKey): PageSkin => pageSkins[key]
