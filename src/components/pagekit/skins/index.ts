// src/components/pagekit/skins/index.ts
import type { AxisKey } from '@/design/theme'

export type RhythmKey = 'compact' | 'default' | 'spacious'
export type SurfaceTone = 'subtle' | 'intense' | 'none'

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

export type SectionToneProfile = {
  infoSurface?: SurfaceTone
  resonanceSurface?: SurfaceTone
  callSurface?: SurfaceTone
}

export type HeroProfile = {
  container?: 'default' | 'wide' | 'narrow'
  variant?: 'default' | 'split'
}

export type BentoProfile = {
  preset?: 'triad' | 'none'
  min?: string
  gap?: number
  columns?: number | 'auto'
}

export type PageSkin = {
  axisKey: AxisKey | 'neutral'
  surfaceTone: SurfaceTone
  rhythm: RhythmKey
  gridProps?: {
    min?: string
    gap?: number
    columns?: number | 'auto'
  }
  sections?: SectionToneProfile
  hero?: HeroProfile
  bento?: BentoProfile
}

export const pageSkins: Record<SkinKey, PageSkin> = {
  home: {
    axisKey: 'axisResonance',
    surfaceTone: 'subtle',
    rhythm: 'spacious',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'wide',
      variant: 'default',
    },
    bento: {
      preset: 'triad',
      min: '18rem',
      gap: 2,
      columns: 'auto',
    },
  },
  blogIndex: {
    axisKey: 'axisClarity',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'default',
      variant: 'default',
    },
  },
  blogCategory: {
    axisKey: 'axisClarity',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'default',
      variant: 'default',
    },
  },
  blogPost: {
    axisKey: 'axisResonance',
    surfaceTone: 'subtle',
    rhythm: 'spacious',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'narrow',
      variant: 'default',
    },
  },
  about: {
    axisKey: 'axisResonance',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'narrow',
      variant: 'default',
    },
  },
  search: {
    axisKey: 'axisClarity',
    surfaceTone: 'none',
    rhythm: 'compact',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'none',
      resonanceSurface: 'none',
      callSurface: 'intense',
    },
  },
  impressum: {
    axisKey: 'neutral',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'narrow',
      variant: 'default',
    },
  },
  support: {
    axisKey: 'neutral',
    surfaceTone: 'subtle',
    rhythm: 'default',
    gridProps: { min: '18rem', gap: 2, columns: 'auto' },
    sections: {
      infoSurface: 'subtle',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'narrow',
      variant: 'default',
    },
  },
  auth: {
    axisKey: 'axisClarity',
    surfaceTone: 'none',
    rhythm: 'compact',
    gridProps: { min: '18rem', gap: 2, columns: 1 },
    sections: {
      infoSurface: 'none',
      resonanceSurface: 'subtle',
      callSurface: 'intense',
    },
    hero: {
      container: 'narrow',
      variant: 'default',
    },
  },
}

export const resolveSkin = (key: SkinKey): PageSkin => pageSkins[key]
