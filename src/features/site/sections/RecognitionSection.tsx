// src/features/site/sections/RecognitionSection.tsx
'use client'

import styled from 'styled-components'
import Headline from '@/components/content/Headline'
import Section from '@/components/primitives/Section'
import Typography from '@/design/typography'

const RecognitionSection = () => (
  <RecognitionShell
    id="erkennen"
    titleId="erkennen-title"
    ariaLabel="Jonas"
    container="wide"
    content="default"
    variant="body"
    rhythm="spacious"
    tone="quiet"
    header={
      <Headline
        titleId="erkennen-title"
        title="Herzlich willkommen, ich bin Jonas :-)"
        accent="daoyin"
        weight="poster"
      />
    }
  >
    <RecognitionFlow>
      <Lead>
        <Typography as="h2" variant="h2" tone="strong" measure="title">
          Ein wichtiger Teil meines Weges begann bei Ulrich Rosen.
        </Typography>

        <Typography as="p" variant="body" tone="strong" measure="wide">
          Durch ihn und das Daoyin Zentrum Deutschland habe ich verstanden, dass
          diese Arbeit keine Dekoration ist. Sie ist Übung, Linie, Körperarbeit,
          Atem, Form, Aufmerksamkeit und die Bereitschaft, etwas wirklich ernst
          zu nehmen.
        </Typography>
      </Lead>

      <ProfileComposition>
        <RootsPane>
          <PaneBody>
            <Typography as="h3" variant="h3" tone="strong">
              Unterschiedliche Wurzeln. Gemeinsame Praxis.
            </Typography>

            <Typography as="p" variant="body" measure="wide">
              Yoga, Qigong, Daoyin Yangsheng Gong, Taijiquan, Meditation und
              Entspannung haben unterschiedliche Herkunft. Im Unterricht werden
              sie nicht gesammelt, sondern geübt: im Atem, im Körper, in der
              Aufmerksamkeit und in der Art, wie du mit dir arbeitest.
            </Typography>
          </PaneBody>
        </RootsPane>

        <JoyPane>
          <JoyBody>
            <Typography as="h2" variant="h2" tone="strong">
              Freude ist kein Gegensatz zu Anspruch.
            </Typography>

            <Typography as="p" variant="body" measure="wide">
              Ich mag Unterricht, der lebendig ist. Bewegung darf Freude machen,
              und gleichzeitig darf die Arbeit genau sein. Aus ernsthafter Übung
              entsteht Leichtigkeit: durch Wiederholung, Aufmerksamkeit und
              echte Lust an der Sache.
            </Typography>
          </JoyBody>
        </JoyPane>

        <PortraitPane>
          <Portrait
            src="/jonas_zeihe.webp"
            alt="Jonas"
            loading="lazy"
            decoding="async"
          />
        </PortraitPane>
      </ProfileComposition>
    </RecognitionFlow>
  </RecognitionShell>
)

const RecognitionShell = styled(Section)`
  padding-top: clamp(1.8rem, 5vw, 4.2rem);
  background: ${({ theme }) => theme.color.surface.quiet};
`

const RecognitionFlow = styled.div`
  display: grid;
  gap: clamp(
    ${({ theme }) => theme.layout.gap.region},
    8vw,
    calc(${({ theme }) => theme.layout.gap.region} * 1.5)
  );
  width: 100%;
  min-width: 0;
`

const Lead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 64ch;
  min-width: 0;
`

const ProfileComposition = styled.div`
  display: grid;
  grid-template-areas:
    'roots'
    'joy'
    'portrait';
  gap: clamp(2rem, 8vw, 3.4rem);
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-areas:
      'roots joy'
      'roots portrait';
    grid-template-columns: minmax(0, 0.96fr) minmax(18rem, 1fr);
    align-items: stretch;
    gap: clamp(2.2rem, 5vw, 4rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-areas: 'roots joy portrait';
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr) minmax(16rem, 0.8fr);
    align-items: center;
    gap: clamp(3rem, 5vw, 5.4rem);
  }
`

const RootsPane = styled.article`
  grid-area: roots;
  display: grid;
  align-items: center;
  min-width: 0;
  padding: clamp(1.75rem, 6vw, 3.25rem);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.domain.practice.daoyin} 24%,
    ${({ theme }) => theme.palette.bone}
  );
  border-radius: 44% 56% 48% 52% / 55% 43% 57% 45%;
  box-shadow: 0 1.4rem 3.4rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 10%, transparent);

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    border-radius: 36% 64% 42% 58% / 45% 32% 68% 55%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    min-height: clamp(23rem, 42vw, 32rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    aspect-ratio: 1;
    min-height: 0;
    transform: translateY(0.3rem) rotate(-1.1deg);

    > * {
      transform: rotate(1.1deg);
    }
  }
`

const PaneBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 34rem;
  min-width: 0;
  margin-inline: auto;
`

const JoyPane = styled.article`
  grid-area: joy;
  display: flex;
  min-width: 0;
  min-height: clamp(22rem, 72vw, 34rem);
  padding: clamp(1.45rem, 5vw, 2.45rem);
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.domain.practice.breath} 28%,
    ${({ theme }) => theme.palette.bone}
  );
  border-radius: 42% 58% 2.6rem 2.6rem / 44% 56% 2.8rem 2.8rem;
  box-shadow: 0 1.1rem 2.8rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 5%, transparent);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    min-height: clamp(22rem, 38vw, 34rem);
    align-items: center;
    border-radius: 42% 2.6rem 2.6rem 48% / 56% 2.4rem 2.8rem 44%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    height: clamp(22rem, 24vw, 26rem);
    min-height: 0;
    border-radius: 44% 2.4rem 2.6rem 50% / 58% 2.4rem 2.8rem 46%;
  }
`

const JoyBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  max-width: 34rem;
  min-width: 0;
`

const PortraitPane = styled.figure`
  grid-area: portrait;
  display: grid;
  min-width: 0;
  min-height: clamp(24rem, 94vw, 40rem);
  margin: 0;
  overflow: clip;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 1.2rem 3rem
    color-mix(in srgb, ${({ theme }) => theme.palette.ink} 8%, transparent);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    min-height: clamp(22rem, 38vw, 34rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    height: clamp(22rem, 24vw, 26rem);
    min-height: 0;
  }
`

const Portrait = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 35%;
`

export default RecognitionSection
