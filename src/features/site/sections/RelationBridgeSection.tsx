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
  --bridge-bottom-cut: calc(var(--bridge-cut) * 0.95);
  --bridge-top-path: path(
    'M 0 92 C 170 72 260 18 420 32 C 580 46 650 104 820 84 C 960 68 1040 28 1200 42 C 1700 78 2300 16 4000 42 L 4000 4000 L 0 4000 Z'
  );
  --bridge-bottom-path: path(
    'M 0 0 L 4000 0 L 4000 42 C 2300 16 1700 78 1200 42 C 1040 28 960 68 820 84 C 650 104 580 46 420 32 C 260 18 170 72 0 92 Z'
  );

  position: relative;
  z-index: 1;
  margin-block: calc(var(--bridge-cut) * -0.72);
  padding-block: calc(var(--bridge-cut) * 0.72);
  color: ${({ theme }) => theme.color.text.inverse};
  background: transparent;
  overflow: visible;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    z-index: 0;
    background: ${({ theme }) => theme.domain.phase.relation};
    pointer-events: none;
  }

  &::before {
    top: 0;
    bottom: calc(var(--bridge-bottom-cut) - 1px);
    clip-path: var(--bridge-top-path);
  }

  &::after {
    bottom: 0;
    height: var(--bridge-bottom-cut);
    clip-path: var(--bridge-bottom-path);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    --bridge-cut: clamp(4.8rem, 22vw, 7.2rem);
    --bridge-bottom-cut: calc(var(--bridge-cut) * 1.05);
    --bridge-top-path: path(
      'M 0 76 C 58 58 96 20 154 30 C 220 42 244 86 316 68 C 356 58 384 38 430 42 C 620 54 760 24 1200 42 L 1200 2400 L 0 2400 Z'
    );
    --bridge-bottom-path: path(
      'M 0 0 L 1200 0 L 1200 42 C 760 24 620 54 430 42 C 384 38 356 58 316 68 C 244 86 220 42 154 30 C 96 20 58 58 0 76 Z'
    );

    margin-block: calc(var(--bridge-cut) * -0.76);
    padding-block: calc(var(--bridge-cut) * 0.86);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    --bridge-cut: clamp(7rem, 10vw, 11rem);
    --bridge-bottom-cut: calc(var(--bridge-cut) * 0.9);
    --bridge-top-path: path(
      'M 0 94 C 210 76 340 28 520 36 C 720 45 820 104 1030 78 C 1200 57 1360 26 1536 42 C 2100 84 2800 18 5000 42 L 5000 5000 L 0 5000 Z'
    );
    --bridge-bottom-path: path(
      'M 0 0 L 5000 0 L 5000 42 C 2800 18 2100 84 1536 42 C 1360 26 1200 57 1030 78 C 820 104 720 45 520 36 C 340 28 210 76 0 94 Z'
    );

    margin-block: calc(var(--bridge-cut) * -0.68);
    padding-block: calc(var(--bridge-cut) * 0.58);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.xl}) {
    --bridge-top-path: path(
      'M 0 104 C 300 82 470 34 730 42 C 990 50 1120 112 1420 82 C 1640 60 1780 28 1920 44 C 2600 92 3400 18 6000 44 L 6000 6000 L 0 6000 Z'
    );
    --bridge-bottom-path: path(
      'M 0 0 L 6000 0 L 6000 44 C 3400 18 2600 92 1920 44 C 1780 28 1640 60 1420 82 C 1120 112 990 50 730 42 C 470 34 300 82 0 104 Z'
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
