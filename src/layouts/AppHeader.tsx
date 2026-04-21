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

const HEADER_SECTIONS: SiteSection[] = SITE_SECTIONS.filter(
  (section) => section.showInHeader
)

const OBSERVED_SECTION_IDS: SiteSectionId[] = SITE_SECTIONS.filter(
  (section) => section.id !== 'einstieg'
).map((section) => section.id)

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<SiteSectionId>('einstieg')
  const [compact, setCompact] = useState(false)
  const shellRef = useRef<HTMLElement | null>(null)
  const ids = useMemo(() => OBSERVED_SECTION_IDS, [])
  const compactLoggedRef = useRef<boolean | null>(null)
  const activeLoggedRef = useRef<SiteSectionId | null>(null)

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
    const onScroll = () => {
      setCompact(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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
    const root = document.documentElement

    if (!menuOpen) return

    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

    const offset = HEADER_HEIGHT + 20

    elements.forEach((element) => {
      element.style.scrollMarginTop = `${offset}px`

      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id as SiteSectionId)
          return
        }

        const past = entries
          .filter((entry) => entry.boundingClientRect.top < 0)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)

        if (past[0]?.target?.id) {
          setActiveId(past[0].target.id as SiteSectionId)
        }
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((element) => observer.observe(element))

    getClientLogger()
      .withContext({
        cat: 'navigation',
        phase: 'observe',
      })
      .info('header_section_observer_ready', {
        observedIds: elements.map((element) => element.id),
        offset,
      })

    return () => {
      observer.disconnect()
    }
  }, [ids])

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
              <Inline gap={0.25} wrap={false} justify="end">
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

const HeaderShell = styled.header<{ $compact: boolean }>`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid
    ${({ theme, $compact }) =>
      $compact ? theme.roles.border.strong : theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.canvas};
  box-shadow: none;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
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
  min-height: ${({ theme }) => theme.spacing(3.25)};
  padding-inline: ${({ theme }) => theme.spacing(0.8)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid transparent;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme, $active }) =>
    $active
      ? theme.typography.fontWeight.medium
      : theme.typography.fontWeight.regular};
  color: ${({ theme, $active }) =>
    $active
      ? theme.getAxisRole('axisClarity').text
      : theme.roles.text.secondary};
  background: transparent;
  box-shadow: none;
  transition:
    color 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;

  &:hover,
  &:focus-visible {
    text-decoration: none;
    color: ${({ theme }) => theme.roles.text.primary};
    border-color: ${({ theme }) => theme.roles.border.subtle};
    background: ${({ theme }) => theme.roles.surface.chrome};
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
    color: ${({ theme }) => theme.getAxisRole('axisClarity').text};
  }
`

const MobilePanel = styled.nav`
  display: none;
  margin-top: ${({ theme }) => theme.spacing(0.7)};
  padding-top: ${({ theme }) => theme.spacing(0.25)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const MobileList = styled.ol`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing(0.35)} 0 0`};
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
