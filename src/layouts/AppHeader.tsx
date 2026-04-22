// src/layouts/AppHeader.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggleButton from '@/components/actions/ThemeToggleButton'
import Container from '@/components/primitives/Container'
import Inline from '@/components/primitives/Inline'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import Typography from '@/design/typography'
import { getClientLogger } from '@/logging'
import {
  SITE_SECTIONS,
  type SiteSection,
  type SiteSectionId,
} from '@/features/site/model/sections'

const HEADER_HEIGHT = 76
const TOP_LOCK_OFFSET = 16
const HIDE_START_OFFSET = 120
const HIDE_DELTA = 10
const REVEAL_DELTA = 8
const ACTIVE_OFFSET = HEADER_HEIGHT + 40

const HEADER_SECTIONS: SiteSection[] = SITE_SECTIONS.filter(
  (section) => section.showInHeader
)

const OBSERVED_SECTION_IDS: SiteSectionId[] = SITE_SECTIONS.filter(
  (section) => section.id !== 'einstieg'
).map((section) => section.id)

const getActiveSectionId = (
  ids: readonly SiteSectionId[],
  offset: number
): SiteSectionId => {
  let active: SiteSectionId = 'einstieg'

  for (const id of ids) {
    const element = document.getElementById(id)
    if (!element) continue

    if (element.offsetTop <= offset) {
      active = id
      continue
    }

    break
  }

  return active
}

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<SiteSectionId>('einstieg')
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)

  const shellRef = useRef<HTMLElement | null>(null)
  const ids = useMemo(() => OBSERVED_SECTION_IDS, [])
  const compactLoggedRef = useRef<boolean | null>(null)
  const activeLoggedRef = useRef<SiteSectionId | null>(null)
  const hiddenLoggedRef = useRef<boolean | null>(null)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--site-header-height',
      `${HEADER_HEIGHT}px`
    )

    getClientLogger()
      .withContext({
        cat: 'ui',
        phase: 'init',
      })
      .info('header_ready', {
        headerHeight: HEADER_HEIGHT,
      })

    return () => {
      document.documentElement.style.removeProperty('--site-header-height')
    }
  }, [])

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) {
      getClientLogger()
        .withContext({
          cat: 'navigation',
          phase: 'fail',
        })
        .warn('header_observed_sections_missing', {
          observedIds: ids,
        })
      return
    }

    elements.forEach((element) => {
      element.style.scrollMarginTop = `${ACTIVE_OFFSET}px`

      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
    })

    getClientLogger()
      .withContext({
        cat: 'navigation',
        phase: 'observe',
      })
      .info('header_section_tracking_ready', {
        observedIds: elements.map((element) => element.id),
        offset: ACTIVE_OFFSET,
      })
  }, [ids])

  useEffect(() => {
    const syncFromScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current

      if (currentY <= TOP_LOCK_OFFSET) {
        setCompact(false)
        setHidden(false)
      } else {
        setCompact(true)

        if (!menuOpen) {
          if (delta > HIDE_DELTA && currentY > HIDE_START_OFFSET) {
            setHidden(true)
          } else if (delta < -REVEAL_DELTA) {
            setHidden(false)
          }
        }
      }

      const nextActiveId = getActiveSectionId(ids, currentY + ACTIVE_OFFSET)
      setActiveId((current) =>
        current === nextActiveId ? current : nextActiveId
      )

      lastScrollYRef.current = currentY
    }

    let frame = 0

    const requestSync = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncFromScroll()
      })
    }

    lastScrollYRef.current = window.scrollY
    syncFromScroll()

    window.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', requestSync)

    return () => {
      window.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', requestSync)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [ids, menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    setHidden(false)

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      getClientLogger()
        .withContext({
          cat: 'navigation',
          phase: 'state',
        })
        .info('header_mobile_menu_closed', {
          source: 'escape',
        })

      setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) return
      if (shellRef.current?.contains(target)) return

      getClientLogger()
        .withContext({
          cat: 'navigation',
          phase: 'state',
        })
        .info('header_mobile_menu_closed', {
          source: 'outside_pointer',
        })

      setMenuOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (compactLoggedRef.current === compact) return

    compactLoggedRef.current = compact

    getClientLogger()
      .withContext({
        cat: 'ui',
        phase: 'state',
      })
      .info('header_compact_state_changed', {
        compact,
      })
  }, [compact])

  useEffect(() => {
    if (hiddenLoggedRef.current === hidden) return

    hiddenLoggedRef.current = hidden

    getClientLogger()
      .withContext({
        cat: 'ui',
        phase: 'state',
      })
      .info('header_visibility_changed', {
        hidden,
      })
  }, [hidden])

  useEffect(() => {
    if (activeLoggedRef.current === activeId) return

    activeLoggedRef.current = activeId

    getClientLogger()
      .withContext({
        cat: 'navigation',
        phase: 'observe',
      })
      .info('header_active_section_changed', {
        activeId,
      })
  }, [activeId])

  const handleMenuToggle = () => {
    setMenuOpen((current) => {
      const next = !current

      getClientLogger()
        .withContext({
          cat: 'navigation',
          phase: 'intent',
        })
        .info('header_mobile_menu_toggled', {
          from: current ? 'open' : 'closed',
          to: next ? 'open' : 'closed',
        })

      return next
    })
  }

  return (
    <HeaderShell
      ref={shellRef}
      $compact={compact}
      $hidden={hidden && !menuOpen}
      role="banner"
      aria-label="Seitenkopf"
    >
      <Container max="page">
        <HeaderInner>
          <TopRow>
            <BrandWrap>
              <BrandLink targetId="einstieg" aria-label="Zum Einstieg springen">
                <BrandStack>
                  <Typography
                    as="span"
                    variant="h3"
                    gutter={false}
                    tone="strong"
                  >
                    Jonas
                  </Typography>
                  <Typography
                    as="span"
                    variant="caption"
                    gutter={false}
                    tone="soft"
                  >
                    Praxis, die trägt
                  </Typography>
                </BrandStack>
              </BrandLink>
            </BrandWrap>

            <DesktopNav aria-label="Hauptnavigation">
              <Inline gap={0.35} wrap={false} justify="end">
                {HEADER_SECTIONS.map((section) => (
                  <NavLink
                    key={section.id}
                    targetId={section.id}
                    $active={activeId === section.id}
                    aria-current={activeId === section.id ? 'true' : undefined}
                  >
                    {section.label}
                  </NavLink>
                ))}
              </Inline>
            </DesktopNav>

            <DesktopActions>
              <ThemeToggleButton />
            </DesktopActions>

            <MobileActions>
              <ThemeToggleButton />
              <MenuButton
                type="button"
                onClick={handleMenuToggle}
                aria-label={
                  menuOpen ? 'Navigation schließen' : 'Navigation öffnen'
                }
                aria-expanded={menuOpen}
                aria-controls="site-primary-navigation"
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </MenuButton>
            </MobileActions>
          </TopRow>

          {menuOpen ? (
            <MobilePanel
              id="site-primary-navigation"
              aria-label="Hauptnavigation mobil"
            >
              <MobileList>
                {HEADER_SECTIONS.map((section) => (
                  <MobileItem key={section.id}>
                    <MobileLink
                      targetId={section.id}
                      $active={activeId === section.id}
                      aria-current={
                        activeId === section.id ? 'true' : undefined
                      }
                      onClick={() => {
                        getClientLogger()
                          .withContext({
                            cat: 'navigation',
                            phase: 'intent',
                          })
                          .info('header_mobile_navigation_intent', {
                            targetId: section.id,
                          })
                        setMenuOpen(false)
                      }}
                    >
                      {section.label}
                    </MobileLink>
                  </MobileItem>
                ))}
              </MobileList>
            </MobilePanel>
          ) : null}
        </HeaderInner>
      </Container>
    </HeaderShell>
  )
}

const HeaderShell = styled.header<{ $compact: boolean; $hidden: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: ${({ theme }) => theme.roles.surface.canvas};
  border-bottom: 1px solid
    ${({ theme, $compact }) =>
      $compact ? theme.roles.border.strong : theme.roles.border.subtle};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: ${({ theme, $compact }) =>
      $compact ? theme.roles.border.strong : 'transparent'};
    transition: background-color 0.18s ease;
    pointer-events: none;
  }
`

const HeaderInner = styled.div`
  min-height: ${HEADER_HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
  }
`

const BrandWrap = styled.div`
  min-width: 0;
`

const BrandLink = styled(SmoothScroller)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: none;
  }
`

const BrandStack = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacingHalf(0.35)};
  min-width: 0;
`

const DesktopNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const navLinkStyles = css<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(3.35)};
  padding-inline: ${({ theme }) => theme.spacing(0.95)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-decoration: none;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.getEnergyRole('density').border : 'transparent'};
  background: ${({ theme, $active }) =>
    $active ? theme.getSurfaceTone('soft', 'density').bg : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.getEnergyRole('density').text : theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  box-shadow: none;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover,
  &:focus-visible {
    text-decoration: none;
    color: ${({ theme }) => theme.roles.text.primary};
    border-color: ${({ theme, $active }) =>
      $active
        ? theme.getEnergyRole('density').border
        : theme.roles.border.subtle};
    background: ${({ theme, $active }) =>
      $active
        ? theme.getSurfaceTone('soft', 'density').bg
        : theme.roles.surface.chrome};
  }
`

const NavLink = styled(SmoothScroller)<{ $active: boolean }>`
  ${navLinkStyles}
`

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileActions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.7)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing(4.25)};
  min-height: ${({ theme }) => theme.spacing(4.25)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: transparent;
  color: ${({ theme }) => theme.roles.text.primary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  box-shadow: none;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.chrome};
    border-color: ${({ theme }) => theme.roles.border.strong};
    color: ${({ theme }) => theme.getEnergyRole('density').text};
  }
`

const MobilePanel = styled.nav`
  display: none;
  margin-top: ${({ theme }) => theme.spacing(0.7)};
  padding-top: ${({ theme }) => theme.spacing(0.35)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const MobileList = styled.ol`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing(0.25)} 0 0`};
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.55)};
`

const MobileItem = styled.li`
  display: block;
`

const MobileLink = styled(SmoothScroller)<{ $active: boolean }>`
  ${navLinkStyles}
  width: 100%;
  justify-content: flex-start;
  min-height: ${({ theme }) => theme.spacing(4)};
`
