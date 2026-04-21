// src/features/site/screens/HomePage.tsx
'use client'

import styled, { css } from 'styled-components'
import PageWrapper from '@/components/patterns/wrapper/PageWrapper'
import { type SiteSectionId } from '@/features/site/model/sections'
import ContactSection from '@/features/site/sections/ContactSection'
import EntrySection from '@/features/site/sections/EntrySection'
import PositioningSection from '@/features/site/sections/PositioningSection'
import PracticeSection from '@/features/site/sections/PracticeSection'
import PracticalInfoSection from '@/features/site/sections/PracticalInfoSection'
import TeacherSection from '@/features/site/sections/TeacherSection'

const scrollToSection = (targetId: SiteSectionId) => {
  const element = document.getElementById(targetId)
  if (!element) return

  const reduce =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  element.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  })

  try {
    history.replaceState(null, '', `#${targetId}`)
  } catch {}
}

type ZoneTone =
  | 'opening'
  | 'clarify'
  | 'expand'
  | 'deepen'
  | 'relief'
  | 'arrival'

export default function HomePage() {
  return (
    <PageWrapper variant="landing" introOffset={false} noFooterGap>
      <FlowRail aria-hidden="true" />
      <Zone $tone="opening" data-zone="opening">
        <EntrySection
          onGoToPractice={() => scrollToSection('praxis')}
          onGoToFrame={() => scrollToSection('rahmen')}
        />
      </Zone>

      <Zone $tone="clarify" data-zone="clarify">
        <PositioningSection />
      </Zone>

      <Zone $tone="expand" data-zone="expand">
        <PracticeSection onGoToFrame={() => scrollToSection('rahmen')} />
      </Zone>

      <Zone $tone="deepen" data-zone="deepen">
        <TeacherSection />
      </Zone>

      <Zone $tone="relief" data-zone="relief">
        <PracticalInfoSection
          onGoToContact={() => scrollToSection('kontakt')}
        />
      </Zone>

      <Zone $tone="arrival" data-zone="arrival">
        <ContactSection />
      </Zone>
    </PageWrapper>
  )
}

const zoneToneStyles = {
  opening: css`
    --zone-pad-top: clamp(1.2rem, 4vw, 2.4rem);
    --zone-pad-bottom: clamp(1.4rem, 4.8vw, 3rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(95, 135, 134, 0.12)'
        : 'rgba(47, 78, 80, 0.09)'};
    --zone-overlay-mid: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.08)'
        : 'rgba(72, 91, 106, 0.05)'};
    --zone-overlay-bottom: transparent;
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(20, 23, 27, 0.06)'};
  `,
  clarify: css`
    --zone-pad-top: clamp(0.6rem, 2.6vw, 1.4rem);
    --zone-pad-bottom: clamp(0.8rem, 3vw, 1.8rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.06)'
        : 'rgba(72, 91, 106, 0.045)'};
    --zone-overlay-mid: transparent;
    --zone-overlay-bottom: transparent;
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.08)'
        : 'rgba(72, 91, 106, 0.07)'};
  `,
  expand: css`
    --zone-pad-top: clamp(0.5rem, 2vw, 1.2rem);
    --zone-pad-bottom: clamp(1rem, 3.2vw, 2rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(209, 102, 44, 0.05)'
        : 'rgba(162, 74, 30, 0.04)'};
    --zone-overlay-mid: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(95, 135, 134, 0.05)'
        : 'rgba(47, 78, 80, 0.035)'};
    --zone-overlay-bottom: transparent;
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(95, 135, 134, 0.08)'
        : 'rgba(47, 78, 80, 0.06)'};
  `,
  deepen: css`
    --zone-pad-top: clamp(1rem, 3vw, 2rem);
    --zone-pad-bottom: clamp(1.4rem, 4vw, 2.8rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(95, 135, 134, 0.08)'
        : 'rgba(47, 78, 80, 0.05)'};
    --zone-overlay-mid: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.14)' : 'rgba(20, 23, 27, 0.05)'};
    --zone-overlay-bottom: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.03)'
        : 'rgba(72, 91, 106, 0.03)'};
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(20, 23, 27, 0.06)'};
  `,
  relief: css`
    --zone-pad-top: clamp(0.8rem, 2.8vw, 1.8rem);
    --zone-pad-bottom: clamp(1rem, 3vw, 2rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.05)'
        : 'rgba(72, 91, 106, 0.04)'};
    --zone-overlay-mid: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(209, 102, 44, 0.03)'
        : 'rgba(162, 74, 30, 0.025)'};
    --zone-overlay-bottom: transparent;
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(142, 163, 179, 0.08)'
        : 'rgba(72, 91, 106, 0.07)'};
  `,
  arrival: css`
    --zone-pad-top: clamp(1.1rem, 3.8vw, 2.4rem);
    --zone-pad-bottom: clamp(1.8rem, 5vw, 3.8rem);
    --zone-overlay-top: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(209, 102, 44, 0.05)'
        : 'rgba(162, 74, 30, 0.04)'};
    --zone-overlay-mid: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(95, 135, 134, 0.06)'
        : 'rgba(47, 78, 80, 0.045)'};
    --zone-overlay-bottom: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(20, 23, 27, 0.03)'};
    --zone-line: ${({ theme }) =>
      theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(20, 23, 27, 0.06)'};
  `,
} satisfies Record<ZoneTone, ReturnType<typeof css>>

const Zone = styled.section<{ $tone: ZoneTone }>`
  position: relative;
  width: 100%;
  padding-block: var(--zone-pad-top) var(--zone-pad-bottom);
  ${({ $tone }) => zoneToneStyles[$tone]}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        var(--zone-overlay-top) 0%,
        var(--zone-overlay-mid) 48%,
        var(--zone-overlay-bottom) 100%
      ),
      radial-gradient(
        120% 70% at 50% 0%,
        var(--zone-overlay-top) 0%,
        transparent 72%
      );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: clamp(1rem, 4vw, 2rem);
    right: clamp(1rem, 4vw, 2rem);
    bottom: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--zone-line) 18%,
      var(--zone-line) 82%,
      transparent 100%
    );
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &[data-zone='opening']::after,
  &[data-zone='arrival']::after {
    opacity: 0.7;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &::after {
      left: clamp(0.75rem, 3vw, 1.2rem);
      right: clamp(0.75rem, 3vw, 1.2rem);
    }
  }
`

const FlowRail = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: max(1rem, calc(50% - min(38rem, 42vw)));
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) =>
        theme.mode === 'dark'
          ? 'rgba(95, 135, 134, 0.06)'
          : 'rgba(47, 78, 80, 0.05)'}
      8%,
    ${({ theme }) =>
        theme.mode === 'dark'
          ? 'rgba(142, 163, 179, 0.1)'
          : 'rgba(72, 91, 106, 0.08)'}
      34%,
    ${({ theme }) =>
        theme.mode === 'dark'
          ? 'rgba(95, 135, 134, 0.08)'
          : 'rgba(47, 78, 80, 0.06)'}
      58%,
    ${({ theme }) =>
        theme.mode === 'dark'
          ? 'rgba(209, 102, 44, 0.08)'
          : 'rgba(162, 74, 30, 0.06)'}
      82%,
    transparent 100%
  );
  opacity: 0.55;
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    left: clamp(0.9rem, 4vw, 1.4rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`
