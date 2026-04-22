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

            <LinksCol gap={0.4} aria-label="Fußnavigation">
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
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.canvas};
  padding-block: ${({ theme }) => theme.spacing(2.75)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(2.35)};
  }
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.9)};
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(1.75)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: ${({ theme }) => theme.spacing(2.15)};
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
  min-height: ${({ theme }) => theme.spacing(3.2)};
  padding: ${({ theme }) => `${theme.spacingHalf(1)} 0`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-decoration: none;
  border: none;
  color: ${({ theme }) => theme.roles.text.secondary};
  background: transparent;
  transition: ${({ theme }) => theme.motion.css.link};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.roles.text.primary};
    text-decoration: none;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(1.25)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

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
  width: 2.55rem;
  height: 2.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  background: transparent;
  color: ${({ theme }) => theme.roles.text.secondary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  box-shadow: none;
  font-size: 0.92rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.chrome};
    border-color: ${({ theme }) => theme.roles.border.strong};
    color: ${({ theme }) => theme.roles.text.primary};
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    align-self: flex-start;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`
