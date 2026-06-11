// src/features/site/sections/RelationBridgeSection.tsx
'use client'

import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Typography from '@/design/typography'

const RelationBridgeSection = () => (
  <BridgeSection
    id="beziehung"
    titleId="beziehung-title"
    ariaLabel="Beziehung zu dir selbst"
    container="wide"
    rail="wide"
    variant="body"
    rhythm="spacious"
  >
    <BridgeGrid>
      <BridgeIntro>
        <Typography as="h2" id="beziehung-title" variant="h1" measure="title">
          Auch die Beziehung zu dir selbst zählt.
        </Typography>
      </BridgeIntro>

      <BridgeBody>
        <Typography as="p" variant="body" measure="text">
          In der Figur Rama berührt mich die Frage, wie ein Mensch seinen
          Beziehungen gerecht wird: als Sohn, als Partner, als Freund, als
          Mensch in Verantwortung.
        </Typography>

        <Typography as="p" variant="body" measure="text">
          Lange habe ich diese Frage vor allem nach außen verstanden. Für andere
          da sein. Verlässlich sein. Den eigenen Platz finden in dem, was das
          Leben gerade verlangt.
        </Typography>

        <Typography as="p" variant="body" measure="text">
          Irgendwann wurde klarer: Die Beziehung zu mir selbst gehört dazu.
          Nicht als Rückzug aus der Welt. Nicht als Selbstoptimierung. Sondern
          als einfache, ehrliche Praxis.
        </Typography>

        <Typography as="p" variant="body" measure="text">
          Atem, Bewegung, Entspannung und stille Übung helfen mir, wieder
          ansprechbar zu werden: für mich, für andere und für das, was gerade
          wirklich da ist.
        </Typography>
      </BridgeBody>
    </BridgeGrid>
  </BridgeSection>
)

const BridgeSection = styled(Section)`
  --bridge-cut: clamp(5.8rem, 17vw, 10rem);
  --bridge-path: path(
    'M 0 92 C 170 72 260 18 420 32 C 580 46 650 104 820 84 C 960 68 1040 28 1200 42 C 1700 78 2300 16 4000 42 L 4000 4000 L 0 4000 Z'
  );

  position: relative;
  z-index: 1;
  margin-top: calc(var(--bridge-cut) * -0.72);
  padding-top: calc(var(--bridge-cut) * 0.72);
  color: ${({ theme }) => theme.color.text.inverse};
  background: transparent;
  overflow: visible;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    background: ${({ theme }) => theme.domain.phase.relation};
    clip-path: var(--bridge-path);
    pointer-events: none;
  }

  &::before {
    z-index: 0;
    inset-block: 0;
  }

  &::after {
    z-index: 0;
    top: 100%;
    height: calc(var(--bridge-cut) * 0.95);
    transform: scale(-1);
    transform-origin: center;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    --bridge-cut: clamp(4.8rem, 22vw, 7.2rem);
    --bridge-path: path(
      'M 0 76 C 58 58 96 20 154 30 C 220 42 244 86 316 68 C 356 58 384 38 430 42 C 620 54 760 24 1200 42 L 1200 2400 L 0 2400 Z'
    );

    margin-top: calc(var(--bridge-cut) * -0.76);
    padding-top: calc(var(--bridge-cut) * 0.86);

    &::after {
      height: calc(var(--bridge-cut) * 1.05);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    --bridge-cut: clamp(7rem, 10vw, 11rem);
    --bridge-path: path(
      'M 0 94 C 210 76 340 28 520 36 C 720 45 820 104 1030 78 C 1200 57 1360 26 1536 42 C 2100 84 2800 18 5000 42 L 5000 5000 L 0 5000 Z'
    );

    margin-top: calc(var(--bridge-cut) * -0.68);
    padding-top: calc(var(--bridge-cut) * 0.58);

    &::after {
      height: calc(var(--bridge-cut) * 0.9);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.xl}) {
    --bridge-path: path(
      'M 0 104 C 300 82 470 34 730 42 C 990 50 1120 112 1420 82 C 1640 60 1780 28 1920 44 C 2600 92 3400 18 6000 44 L 6000 6000 L 0 6000 Z'
    );
  }
`

const BridgeGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.region};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
    align-items: center;
  }
`

const BridgeIntro = styled.header`
  display: grid;
  max-width: 34rem;
  min-width: 0;

  h2 {
    color: ${({ theme }) => theme.color.text.inverse};
  }
`

const BridgeBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 64ch;
  min-width: 0;
`

export default RelationBridgeSection
