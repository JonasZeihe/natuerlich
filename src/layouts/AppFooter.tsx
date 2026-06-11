// src/layouts/AppFooter.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { FaArrowUp } from 'react-icons/fa'
import Container from '@/components/primitives/Container'
import Stack from '@/components/primitives/Stack'

const FOOTER_NAV_ITEMS = [
  { href: '/impressum', label: 'Impressum & Datenschutz' },
] as const

const AppFooter = () => {
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
      <Container max="default">
        <FooterInner>
          <TopRow>
            <Copy>© {new Date().getFullYear()} Jonas Zeihe</Copy>
            <LinksCol aria-label="Fußnavigation">
              {FOOTER_NAV_ITEMS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </LinksCol>
            <ToTop
              type="button"
              onClick={scrollToTop}
              aria-label="Zum Seitenanfang"
              title="Nach oben"
            >
              <FaArrowUp />
            </ToTop>
          </TopRow>
        </FooterInner>
      </Container>
    </FooterShell>
  )
}

const FooterShell = styled.footer`
  position: relative;
  width: 100%;
  padding-block: ${({ theme }) => theme.layout.section.compact};
  color: ${({ theme }) => theme.color.text.default};
  background: ${({ theme }) => theme.color.surface.paper};
  border-top: 1px solid ${({ theme }) => theme.color.border.default};
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.gap.block};
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.layout.gap.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: ${({ theme }) => theme.layout.gap.grid};
  }
`

const LinksCol = styled(Stack)`
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    align-items: end;
  }
`

const FooterLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: ${({ theme }) => theme.space(3.2)};
  padding-block: ${({ theme }) => theme.space(0.5)};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.color.text.soft};
  background: transparent;
  border: none;
  text-decoration: none;
  transition: ${({ theme }) => theme.motion.css.link};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.color.text.default};
    text-decoration: underline;
    text-underline-offset: 0.16em;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.text.muted};
  font-size: ${({ theme }) => theme.font.size.sm};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
`

const ToTop = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 2.55rem;
  height: 2.55rem;
  color: ${({ theme }) => theme.color.text.soft};
  background: ${({ theme }) => theme.color.surface.card};
  border: 1px solid ${({ theme }) => theme.color.border.default};
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: none;
  font-size: 0.92rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.color.intent.success.text};
    background: ${({ theme }) => theme.color.intent.success.surface};
    border-color: ${({ theme }) => theme.color.intent.success.border};
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    align-self: center;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

export default AppFooter
