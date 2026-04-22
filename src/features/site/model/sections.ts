// src/features/site/model/sections.ts
export const SITE_SECTIONS = [
  {
    id: 'einstieg',
    label: 'Start',
    showInHeader: true,
  },
  {
    id: 'einordnung',
    label: 'Einordnung',
    showInHeader: true,
  },
  {
    id: 'praxis',
    label: 'Praxis',
    showInHeader: true,
  },
  {
    id: 'lehrer',
    label: 'Jonas',
    showInHeader: true,
  },
  {
    id: 'rahmen',
    label: 'Rahmen',
    showInHeader: true,
  },
  {
    id: 'kontakt',
    label: 'Kontakt',
    showInHeader: true,
  },
] as const

export type SiteSection = (typeof SITE_SECTIONS)[number]
export type SiteSectionId = SiteSection['id']
