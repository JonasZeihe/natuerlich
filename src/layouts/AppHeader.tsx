// src/layouts/AppHeader.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggleButton from '@/components/actions/ThemeToggleButton'
import { HEADER_NAV_ITEMS } from '@/config/navigation'

const alphaHex = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value)) * 255)
    .toString(16)
    .padStart(2, '0')

const withAlpha = (color: string, alpha: number) => {
  if (!color.startsWith('#')) return color
  if (color.length === 7) return `${color}${alphaHex(alpha)}`
  if (color.length === 9) return `${color.slice(0, 7)}${alphaHex(alpha)}`
  return color
}

const isActivePath = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function AppHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const root = document.documentElement
    if (!menuOpen) return

    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <HeaderShell role="banner" aria-label="Seitenkopf">
      <HeaderInner>
        <TopRow>
          <Brand href="/" aria-label="Zur Startseite von Jonas">
            <BrandStack>
              <BrandName>Jonas</BrandName>
              <BrandLine>Praxis, die trägt</BrandLine>
            </BrandStack>
          </Brand>

          <DesktopNav aria-label="Hauptnavigation">
            {HEADER_NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <DesktopLink
                  key={item.href}
                  href={item.href}
                  $active={active}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </DesktopLink>
              )
            })}
          </DesktopNav>

          <DesktopActions>
            <ThemeToggleButton />
          </DesktopActions>

          <MobileActions>
            <ThemeToggleButton />
            <MenuButton
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              aria-controls="mobile-main-navigation"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </MenuButton>
          </MobileActions>
        </TopRow>

        {menuOpen ? (
          <MobileMenu
            id="mobile-main-navigation"
            aria-label="Mobile Hauptnavigation"
          >
            {HEADER_NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href)

              return (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  $active={active}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </MobileLink>
              )
            })}
          </MobileMenu>
        ) : null}
      </HeaderInner>
    </HeaderShell>
  )
}

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? withAlpha(theme.roles.surface.panel, 0.78)
      : withAlpha(theme.roles.surface.panel, 0.84)};
  border-bottom: 1px solid
    ${({ theme }) =>
      withAlpha(
        theme.roles.border.subtle,
        theme.mode === 'dark' ? 0.56 : 0.72
      )};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  backdrop-filter: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'blur(12px) saturate(1.04)'
      : 'blur(10px) saturate(1.02)'};
  -webkit-backdrop-filter: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'blur(12px) saturate(1.04)'
      : 'blur(10px) saturate(1.02)'};
`

const HeaderInner = styled.div`
  width: min(
    100% - ${({ theme }) => theme.spacing(3)},
    ${({ theme }) => theme.layout.containers.page}
  );
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(0.85)};
  }
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  min-width: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`

const BrandStack = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacingHalf(0.45)};
  min-width: 0;
`

const BrandName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.h3};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.roles.text.primary};
`

const BrandLine = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.roles.text.subtle};
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacingHalf(1.25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const linkStyles = css<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(4.15)};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid transparent;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  color: ${({ theme, $active }) =>
    $active ? theme.getAxisRole('axisClarity').text : theme.roles.text.primary};
  background: ${({ theme, $active }) =>
    $active ? theme.roles.surface.panelAlt : 'transparent'};
  border-color: ${({ theme, $active }) =>
    $active ? theme.getAxisRole('axisClarity').border : 'transparent'};
  box-shadow: ${({ theme, $active }) =>
    $active ? theme.boxShadow.xs : 'none'};
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.panel};
    border-color: ${({ theme }) => theme.roles.border.subtle};
    color: ${({ theme }) => theme.getAxisRole('axisClarity').text};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    text-decoration: none;
  }
`

const DesktopLink = styled(Link)<{ $active: boolean }>`
  ${linkStyles}
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
  min-width: ${({ theme }) => theme.spacing(4.5)};
  min-height: ${({ theme }) => theme.spacing(4.5)};
  padding: ${({ theme }) =>
    `${theme.spacingHalf(1.5)} ${theme.spacingHalf(2)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.panel};
  color: ${({ theme }) => theme.roles.text.primary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.panelAlt};
    border-color: ${({ theme }) => theme.getAxisRole('axisClarity').border};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`

const MobileMenu = styled.nav`
  display: none;
  margin-top: ${({ theme }) => theme.spacing(0.9)};
  padding: ${({ theme }) => theme.spacing(0.9)};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.roles.surface.panel};
  box-shadow: ${({ theme }) => theme.boxShadow.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    gap: ${({ theme }) => theme.spacingHalf(0.75)};
  }
`

const MobileLink = styled(Link)<{ $active: boolean }>`
  ${linkStyles}
  justify-content: flex-start;
  min-height: ${({ theme }) => theme.spacing(4.5)};
  padding-inline: ${({ theme }) => theme.spacing(1)};
`
