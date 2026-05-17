// src/features/site/model/sections.ts
export const SITE_SECTIONS = [
  {
    id: 'ankommen',
    label: 'Ankommen',
    showInHeader: true,
  },
  {
    id: 'sammeln',
    label: 'Sammeln',
    showInHeader: true,
  },
  {
    id: 'aktivieren',
    label: 'Aktivieren',
    showInHeader: true,
  },
  {
    id: 'arbeiten',
    label: 'Arbeiten',
    showInHeader: true,
  },
  {
    id: 'erkennen',
    label: 'Erkennen',
    showInHeader: true,
  },
  {
    id: 'integrieren',
    label: 'Integrieren',
    showInHeader: true,
  },
  {
    id: 'anschluss',
    label: 'Anschluss',
    showInHeader: true,
  },
] as const

export type SiteSection = (typeof SITE_SECTIONS)[number]
export type SiteSectionId = SiteSection['id']
