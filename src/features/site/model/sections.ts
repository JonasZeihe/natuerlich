// src/features/site/model/sections.ts
export const SITE_SECTIONS = [
  {
    id: 'minikurs',
    label: 'Minikurs',
    showInHeader: true,
  },
  {
    id: 'erkennen',
    label: 'Erkennen',
    showInHeader: true,
  },
  {
    id: 'arbeiten',
    label: 'Praxis',
    showInHeader: true,
  },
  {
    id: 'integrieren',
    label: 'Angebot',
    showInHeader: true,
  },
  {
    id: 'anschluss',
    label: 'Kontakt',
    showInHeader: true,
  },
] as const

export type SiteSection = (typeof SITE_SECTIONS)[number]
export type SiteSectionId = SiteSection['id']
