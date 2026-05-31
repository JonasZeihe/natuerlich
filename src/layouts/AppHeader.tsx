// src/layouts/AppHeader.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { FiMenu, FiX } from 'react-icons/fi'
import Container from '@/components/primitives/Container'
import Inline from '@/components/primitives/Inline'
import SmoothScroller from '@/components/utilities/SmoothScroller'
import { scrollToTarget } from '@/components/utilities/SmoothScroller'
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
const NAV_SCROLL_LOCK_ATTR = 'data-nav-scroll-lock'
const START_SECTION_ID: SiteSectionId = 'minikurs'
const MOBILE_NAV_QUERY = '(max-width: 900px)'

const HEADER_SECTIONS: SiteSection[] = SITE_SECTIONS.filter(
  (section) => section.showInHeader
)

const OBSERVED_SECTION_IDS: SiteSectionId[] = SITE_SECTIONS.filter(
  (section) => section.id !== START_SECTION_ID
).map((section) => section.id)

const getNavigationOffset = (mobileDocked: boolean) =>
  mobileDocked ? 0 : HEADER_HEIGHT

const getActiveOffset = (mobileDocked: boolean) =>
  mobileDocked ? 0 : ACTIVE_OFFSET

const getActiveSectionId = (
  ids: readonly SiteSectionId[],
  offset: number
): SiteSectionId => {
  let active: SiteSectionId = START_SECTION_ID

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

const getSectionLabel = (id: SiteSectionId) =>
  HEADER_SECTIONS.find((section) => section.id === id)?.label ??
  HEADER_SECTIONS[0]?.label ??
  'Navigation'

type ActiveIndicatorState = {
  left: number
  width: number
  visible: boolean
}

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<SiteSectionId>(START_SECTION_ID)
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileDocked, setMobileDocked] = useState(false)
  const [indicator, setIndicator] = useState<ActiveIndicatorState>({
    left: 0,
    width: 0,
    visible: false,
  })

  const shellRef = useRef<HTMLElement | null>(null)
  const desktopNavRef = useRef<HTMLDivElement | null>(null)
  const navItemRefs = useRef<
    Partial<Record<SiteSectionId, HTMLAnchorElement | null>>
  >({})
  const ids = useMemo(() => OBSERVED_SECTION_IDS, [])
  const activeLabel = useMemo(() => getSectionLabel(activeId), [activeId])
  const compactLoggedRef = useRef<boolean | null>(null)
  const activeLoggedRef = useRef<SiteSectionId | null>(null)
  const hiddenLoggedRef = useRef<boolean | null>(null)
  const lastScrollYRef = useRef(0)
  const navigationOffset = getNavigationOffset(mobileDocked)
  const activeOffset = getActiveOffset(mobileDocked)

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
    const mediaQuery = window.matchMedia(MOBILE_NAV_QUERY)
    const syncMobileDock = () => {
      setMobileDocked(mediaQuery.matches)
    }

    syncMobileDock()
    mediaQuery.addEventListener('change', syncMobileDock)

    return () => {
      mediaQuery.removeEventListener('change', syncMobileDock)
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
      element.style.scrollMarginTop = `${activeOffset}px`

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
        offset: activeOffset,
      })
  }, [activeOffset, ids])

  useEffect(() => {
    const syncFromScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollYRef.current
      const navScrollLocked =
        document.documentElement.hasAttribute(NAV_SCROLL_LOCK_ATTR)

      if (currentY <= TOP_LOCK_OFFSET) {
        setCompact(false)
        setHidden(false)
      } else {
        setCompact(true)

        if (!menuOpen && !navScrollLocked) {
          if (delta > HIDE_DELTA && currentY > HIDE_START_OFFSET) {
            setHidden(true)
          } else if (delta < -REVEAL_DELTA) {
            setHidden(false)
          }
        }
      }

      const nextActiveId = getActiveSectionId(ids, currentY + activeOffset)
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
  }, [activeOffset, ids, menuOpen])

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

  useEffect(() => {
    const updateIndicator = () => {
      const navRoot = desktopNavRef.current
      const activeElement = navItemRefs.current[activeId]

      if (!navRoot || !activeElement) {
        setIndicator((current) =>
          current.visible
            ? { left: current.left, width: current.width, visible: false }
            : current
        )
        return
      }

      const navRect = navRoot.getBoundingClientRect()
      const itemRect = activeElement.getBoundingClientRect()

      setIndicator({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        visible: itemRect.width > 0,
      })
    }

    let frame = window.requestAnimationFrame(updateIndicator)

    const onResize = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateIndicator)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
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

  const handleMobileNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: SiteSectionId
  ) => {
    event.preventDefault()

    getClientLogger()
      .withContext({
        cat: 'navigation',
        phase: 'intent',
      })
      .info('header_mobile_navigation_intent', {
        targetId: sectionId,
      })

    setMenuOpen(false)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        void scrollToTarget(sectionId, {
          offset: navigationOffset,
        }).then((ok) => {
          if (!ok) return

          try {
            history.replaceState(null, '', `#${sectionId}`)
          } catch {}
        })
      })
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
          <DesktopRow>
            <BrandWrap>
              <BrandLink
                targetId={START_SECTION_ID}
                offset={navigationOffset}
                aria-label="Zum Anfang springen"
              >
                <BrandStack />
              </BrandLink>
            </BrandWrap>

            <DesktopNav aria-label="Hauptnavigation">
              <DesktopNavTrack ref={desktopNavRef}>
                <ActivePill
                  $left={indicator.left}
                  $width={indicator.width}
                  $visible={indicator.visible}
                  aria-hidden="true"
                />
                <Inline gap={0.35} wrap={false} justify="end">
                  {HEADER_SECTIONS.map((section) => (
                    <NavLink
                      key={section.id}
                      ref={(node: HTMLAnchorElement | null) => {
                        navItemRefs.current[section.id] = node
                      }}
                      targetId={section.id}
                      offset={navigationOffset}
                      $active={activeId === section.id}
                      aria-current={
                        activeId === section.id ? 'true' : undefined
                      }
                    >
                      {section.label}
                    </NavLink>
                  ))}
                </Inline>
              </DesktopNavTrack>
            </DesktopNav>
          </DesktopRow>

          <MobileSurface>
            {menuOpen ? (
              <MobileSheet
                id="site-primary-navigation"
                aria-label="Hauptnavigation mobil"
              >
                <MobileList>
                  {HEADER_SECTIONS.map((section) => (
                    <MobileItem key={section.id}>
                      <MobileLink
                        targetId={section.id}
                        offset={navigationOffset}
                        $active={activeId === section.id}
                        aria-current={
                          activeId === section.id ? 'true' : undefined
                        }
                        onClick={(event) =>
                          handleMobileNavigation(event, section.id)
                        }
                      >
                        {section.label}
                      </MobileLink>
                    </MobileItem>
                  ))}
                </MobileList>
              </MobileSheet>
            ) : null}

            <MobileDock aria-label="Mobile Navigation">
              <MobileCurrent
                targetId={activeId}
                offset={navigationOffset}
                aria-label={`Aktueller Abschnitt: ${activeLabel}`}
              >
                <MobileCurrentDot aria-hidden="true" />
                <MobileCurrentText>{activeLabel}</MobileCurrentText>
              </MobileCurrent>

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
            </MobileDock>
          </MobileSurface>
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
  background: ${({ theme }) => theme.roles.surface.chrome};
  border-bottom: 1px solid
    ${({ theme, $compact }) =>
      $compact ? theme.roles.border.strong : theme.roles.border.subtle};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transform: ${({ theme, $hidden }) =>
    $hidden
      ? `translateY(${theme.motion.foundations.distances.headerHide})`
      : 'translateY(0)'};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
  transition: ${({ theme }) => theme.motion.css.navigation.headerShell};

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0;
    height: 1px;
    background: ${({ theme, $compact }) =>
      $compact ? theme.roles.border.strong : 'transparent'};
    transition: ${({ theme }) => theme.motion.css.navigation.headerChrome};
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: auto;
    bottom: 0;
    background: transparent;
    border-bottom: 0;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transform: ${({ $hidden }) =>
      $hidden ? 'translateY(calc(100% + 1rem))' : 'translateY(0)'};

    &::after {
      display: none;
    }
  }
`

const HeaderInner = styled.div`
  min-height: ${HEADER_HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 0;
    justify-content: flex-end;
    padding-bottom: max(
      ${({ theme }) => theme.spacing(0.8)},
      env(safe-area-inset-bottom)
    );
  }
`

const DesktopRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
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
`

const DesktopNavTrack = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacingHalf(0.2)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
`

const ActivePill = styled.span<{
  $left: number
  $width: number
  $visible: boolean
}>`
  position: absolute;
  top: ${({ theme }) => theme.spacingHalf(0.2)};
  bottom: ${({ theme }) => theme.spacingHalf(0.2)};
  left: 0;
  width: ${({ $width }) => `${$width}px`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.getEnergyRole('density').surface};
  border: 1px solid ${({ theme }) => theme.getEnergyRole('density').border};
  box-shadow: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $left }) => `${$left}px`});
  transition:
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.18s cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
`

const navLinkStyles = css<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(3.35)};
  padding-inline: ${({ theme }) => theme.spacing(0.95)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  text-decoration: none;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme, $active }) =>
    $active ? theme.getEnergyRole('density').text : theme.roles.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};
  box-shadow: none;
  transition: ${({ theme }) => theme.motion.css.navigation.link};

  &:hover,
  &:focus-visible {
    text-decoration: none;
    color: ${({ theme, $active }) =>
      $active ? theme.getEnergyRole('density').text : theme.roles.text.primary};
    background: ${({ theme, $active }) =>
      $active ? 'transparent' : theme.roles.surface.card};
  }
`

const NavLink = styled(SmoothScroller)<{ $active: boolean }>`
  ${navLinkStyles}
`

const MobileSurface = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    gap: ${({ theme }) => theme.spacing(0.65)};
  }
`

const MobileDock = styled.nav`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  min-height: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => `${theme.spacing(0.55)} ${theme.spacing(0.6)}`};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.chrome} 94%,
    transparent
  );
  border: 1px solid ${({ theme }) => theme.roles.border.strong};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`

const MobileCurrent = styled(SmoothScroller)`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  min-height: ${({ theme }) => theme.spacing(4.6)};
  gap: ${({ theme }) => theme.spacing(0.7)};
  padding-inline: ${({ theme }) => theme.spacing(1.05)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.getEnergyRole('density').text};
  background: ${({ theme }) => theme.getEnergyRole('density').surface};
  border: 1px solid ${({ theme }) => theme.getEnergyRole('density').border};
  text-decoration: none;
  overflow: hidden;
  transition: ${({ theme }) => theme.motion.css.navigation.link};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.getEnergyRole('density').text};
    text-decoration: none;
    background: ${({ theme }) => theme.getEnergyRole('density').surfaceStrong};
  }
`

const MobileCurrentDot = styled.span`
  flex: 0 0 auto;
  width: 0.46rem;
  height: 0.46rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.getEnergyRole('density').text};
`

const MobileCurrentText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.spacing(4.6)};
  min-height: ${({ theme }) => theme.spacing(4.6)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.surface.card};
  color: ${({ theme }) => theme.roles.text.primary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  box-shadow: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.navigation.menuButton};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.getEnergyRole('density').surface};
    border-color: ${({ theme }) => theme.getEnergyRole('density').border};
    color: ${({ theme }) => theme.getEnergyRole('density').text};
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }
`

const MobileSheet = styled.nav`
  display: block;
  padding: ${({ theme }) => theme.spacing(0.75)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.chrome} 96%,
    transparent
  );
  border: 1px solid ${({ theme }) => theme.roles.border.strong};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`

const MobileList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.65)};
`

const MobileItem = styled.li`
  display: block;
`

const MobileLink = styled(SmoothScroller)<{ $active: boolean }>`
  ${navLinkStyles}
  width: 100%;
  justify-content: flex-start;
  min-height: ${({ theme }) => theme.spacing(4.6)};
  padding-inline: ${({ theme }) => theme.spacing(1)};
`
