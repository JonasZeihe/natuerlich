// src/layouts/AppFooter.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { FaArrowUp } from 'react-icons/fa'
import Container from '@/components/primitives/Container'
import Stack from '@/components/primitives/Stack'
import { FOOTER_NAV_ITEMS } from '@/config/navigation'

export default function AppFooter() {
  const scrollToTop = () =>
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <FooterShell role="contentinfo" aria-label="Seitenfuß">
      <Container max="default">
        <FooterInner>
          <TopRow>
            <Stack gap={0.6}>
              <Brand>Jonas</Brand>
              <Microcopy>
                Eine ernsthafte, freudige und alltagstaugliche Praxis. Klar im
                Anspruch, offen im Kontakt, ohne Nebel und ohne Pose.
              </Microcopy>
            </Stack>

            <LinksCol gap={0.6} aria-label="Fußnavigation">
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
  width: 100%;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.roles.surface.panelAlt} 0%,
    ${({ theme }) => theme.roles.surface.chrome} 100%
  );
  color: ${({ theme }) => theme.roles.text.primary};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
  padding-block: ${({ theme }) => theme.spacing(3)};
`

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
    align-items: start;
  }
`

const LinksCol = styled(Stack)`
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    align-items: end;
  }
`

const Brand = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  font-size: ${({ theme }) => theme.typography.fontSize.h4};
  color: ${({ theme }) => theme.roles.text.primary};
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
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => `${theme.spacingHalf(2)} ${theme.spacing(1.1)}`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  color: ${({ theme }) => theme.roles.text.primary};
  background: transparent;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.panel};
    border-color: ${({ theme }) => theme.getAxisRole('axisClarity').border};
    color: ${({ theme }) => theme.getAxisRole('axisClarity').text};
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    text-decoration: none;
  }
`

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
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
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.roles.surface.panel};
  color: ${({ theme }) => theme.roles.text.primary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.roles.surface.chrome};
    border-color: ${({ theme }) => theme.getAxisRole('axisClarity').border};
    color: ${({ theme }) => theme.getAxisRole('axisClarity').text};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`
