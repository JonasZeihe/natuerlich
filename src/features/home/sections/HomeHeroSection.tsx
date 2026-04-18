'use client'

import Link from 'next/link'
import styled from 'styled-components'
import ButtonGrid from '@/components/actions/ButtonGrid'
import Typography from '@/design/typography'
import { heroContent } from '@/features/common/content/siteContent'

export default function HomeHeroSection() {
  return (
    <Section>
      <HeroCard>
        <Copy>
          <Typography
            as="p"
            variant="caption"
            accent="axisEnergy"
            gutter={false}
          >
            {heroContent.eyebrow}
          </Typography>

          <TitleWrap>
            <Typography as="h1" variant="h1" gutter={false} tone="strong">
              {heroContent.title}
            </Typography>
          </TitleWrap>

          <BodyWrap>
            <Typography variant="body" gutter={false}>
              {heroContent.body}
            </Typography>
          </BodyWrap>

          <ButtonGrid>
            <PrimaryLink href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </PrimaryLink>
            <SecondaryLink href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </SecondaryLink>
          </ButtonGrid>
        </Copy>

        <PortraitPanel aria-hidden="true">
          <PortraitFrame>
            <PortraitGlow />
            <PortraitPlaceholder>
              <PortraitLabel>Jonas</PortraitLabel>
              <PortraitSubline>Foto-Platzhalter</PortraitSubline>
            </PortraitPlaceholder>
          </PortraitFrame>
        </PortraitPanel>
      </HeroCard>
    </Section>
  )
}

const Section = styled.section`
  width: 100%;
`

const HeroCard = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.roles.surface.panel} 0%,
    ${({ theme }) => theme.roles.surface.panelAlt} 100%
  );
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing(1.35)};
  }
`

const Copy = styled.div`
  display: grid;
  align-content: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
  min-width: 0;
`

const TitleWrap = styled.div`
  max-width: 14ch;
`

const BodyWrap = styled.div`
  max-width: 60ch;
`

const PortraitPanel = styled.div`
  display: grid;
  place-items: stretch;
  min-width: 0;
`

const PortraitFrame = styled.div`
  position: relative;
  min-height: 26rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.getAxisRole('axisResonance').border};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.roles.surface.chrome} 0%,
    ${({ theme }) => theme.roles.surface.panelAlt} 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 18rem;
  }
`

const PortraitGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 50% 22%,
      ${({ theme }) => theme.getAxisRole('axisEnergy').surfaceStrong} 0%,
      transparent 34%
    ),
    radial-gradient(
      circle at 50% 100%,
      ${({ theme }) => theme.getAxisRole('axisResonance').surfaceStrong} 0%,
      transparent 40%
    );
`

const PortraitPlaceholder = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacingHalf(1)};
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.roles.text.primary};
`

const PortraitLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const PortraitSubline = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.roles.text.subtle};
`

const BaseLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(4.85)};
  padding-inline: ${({ theme }) => theme.spacing(1.75)};
  padding-block: ${({ theme }) => theme.spacingHalf(1.55)};
  border-radius: 0.78rem;
  border: 1px solid transparent;
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.12;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.12s ease,
    color 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
    text-decoration: none;
  }
`

const PrimaryLink = styled(BaseLink)`
  color: ${({ theme }) => theme.roles.interactive.button.primary.fg};
  background: ${({ theme }) => theme.roles.interactive.button.primary.bg};
  border-color: ${({ theme }) => theme.roles.interactive.button.primary.border};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.roles.interactive.button.primary.hoverFg};
    background: ${({ theme }) =>
      theme.roles.interactive.button.primary.hoverBg};
    border-color: ${({ theme }) =>
      theme.roles.interactive.button.primary.hoverBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`

const SecondaryLink = styled(BaseLink)`
  color: ${({ theme }) => theme.roles.interactive.button.ghost.fg};
  background: ${({ theme }) => theme.roles.interactive.button.ghost.bg};
  border-color: ${({ theme }) => theme.roles.interactive.button.ghost.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.roles.interactive.button.ghost.hoverFg};
    background: ${({ theme }) => theme.roles.interactive.button.ghost.hoverBg};
    border-color: ${({ theme }) =>
      theme.roles.interactive.button.ghost.hoverBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`
