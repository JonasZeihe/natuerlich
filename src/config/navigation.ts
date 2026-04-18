// src/config/navigation.ts
export type NavigationItem = {
  href: string
  label: string
  showInHeader?: boolean
  showInFooter?: boolean
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    href: '/',
    label: 'Start',
    showInHeader: true,
    showInFooter: false,
  },
  {
    href: '/angebot',
    label: 'Angebot',
    showInHeader: true,
    showInFooter: false,
  },
  {
    href: '/jonas',
    label: 'Jonas',
    showInHeader: true,
    showInFooter: false,
  },
  {
    href: '/faq',
    label: 'FAQ',
    showInHeader: true,
    showInFooter: false,
  },
  {
    href: '/kontakt',
    label: 'Kontakt',
    showInHeader: true,
    showInFooter: true,
  },
  {
    href: '/impressum',
    label: 'Impressum',
    showInHeader: false,
    showInFooter: true,
  },
] as const

export const HEADER_NAV_ITEMS = NAVIGATION_ITEMS.filter(
  (item) => item.showInHeader
)

export const FOOTER_NAV_ITEMS = NAVIGATION_ITEMS.filter(
  (item) => item.showInFooter
)
