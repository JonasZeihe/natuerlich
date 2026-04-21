// src/layouts/AppFooter.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { FaArrowUp } from 'react-icons/fa'
import Container from '@/components/primitives/Container'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

const FOOTER_NAV_ITEMS = [
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
] as const

export default function AppFooter() {
  const scrollToTop = () => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <FooterShell role="contentinfo" aria-label="Seitenfuß">
      <Container max="page">
        <FooterInner>
          <TopRow>
            <ClosingBlock gap={0.7}>
              <Typography
                as="p"
                variant="subtitle"
                gutter={false}
                tone="strong"
              >
                Jonas
              </Typography>
              <Microcopy>
                Meta-Placeholder: Hier später eine knappe Abschlusszeile, die
                den Weg bündelt und würdig aus der Seite hinausführt.
              </Microcopy>
            </ClosingBlock>

            <LinksCol gap={0.55} aria-label="Fußnavigation">
              {FOOTER_NAV_ITEMS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </LinksCol>
          </TopRow>

          <BottomRow>
            <Copy>© {new Date().getFullYear()} Jonas</Copy>
            <ToTop
              type="button"
              onClick={scrollToTop}
              aria-label="Zum Seitenanfang"
              title="Nach oben"
            >
              <FaArrowUp />
            </ToTop>
          </BottomRow>
        </FooterInner>
      </Container>
    </FooterShell>
  )
}

const FooterShell = styled.footer`
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.roles.text.primary};
  border-top: 1px solid
    ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(20, 23, 27, 0.08)'};
  background:
    radial-gradient(
      90% 20rem at 50% 0%,
      ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(209, 102, 44, 0.06)'
            : 'rgba(162, 74, 30, 0.04)'}
        0%,
      transparent 68%
    ),
    radial-gradient(
      120% 28rem at 50% 100%,
      ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(95, 135, 134, 0.08)'
            : 'rgba(47, 78, 80, 0.05)'}
        0%,
      transparent 74%
    ),
    linear-gradient(
      180deg,
      ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(18, 22, 27, 0.92)'
            : 'rgba(247, 242, 234, 0.9)'}
        0%,
      ${({ theme }) => theme.roles.surface.chrome} 100%
    );
  padding-block: ${({ theme }) => theme.spacing(3.1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(2.6)};
  }
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.1)};
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: ${({ theme }) => theme.spacing(2.4)};
  }
`

const ClosingBlock = styled(Stack)`
  max-width: 40rem;
`

const LinksCol = styled(Stack)`
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: end;
  }
`

const Microcopy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 38rem;
`

const FooterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spacing(3.6)};
  padding: ${({ theme }) => `${theme.spacingHalf(1.4)} 0`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  border: none;
  color: ${({ theme }) => theme.roles.text.secondary};
  background: transparent;
  transition:
    color 0.18s ease,
    opacity 0.18s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.getAxisRole('axisClarity').text};
    text-decoration: none;
    opacity: 1;
  }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(1.4)};
  border-top: 1px solid
    ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(20, 23, 27, 0.08)'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`

const ToTop = styled.button`
  width: 2.7rem;
  height: 2.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  background: transparent;
  color: ${({ theme }) => theme.roles.text.secondary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  box-shadow: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.panel};
    border-color: ${({ theme }) => theme.getAxisRole('axisClarity').border};
    color: ${({ theme }) => theme.roles.text.primary};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-self: flex-start;
  }
`
