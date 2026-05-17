// src/features/site/sections/ArrivalSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToActivation: () => void
  onGoToIntegration: () => void
}

const ArrivalStage = styled.div`
  position: relative;
  min-height: min(44rem, calc(100svh - 8rem));
  display: flex;
  align-items: center;
  padding-block: clamp(1rem, 3vw, 2.5rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: auto;
    padding-block: 0;
  }
`

const BreathIn = styled.img`
  position: absolute;
  z-index: 0;
  left: clamp(-5rem, -11vw, -6rem);
  bottom: clamp(15rem, 9vw, 8rem);
  width: clamp(28rem, 44vw, 50rem);
  height: auto;
  pointer-events: none;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    left: clamp(-13rem, -35vw, -7rem);
    bottom: clamp(4rem, 18vw, 8rem);
    width: clamp(24rem, 86vw, 38rem);
  }
`

const BreathOut = styled.img`
  position: absolute;
  z-index: 0;
  right: clamp(5rem, -4vw, -1.5rem);
  bottom: clamp(0rem, -5vw, -2rem);
  width: clamp(18rem, 27vw, 32rem);
  height: auto;
  pointer-events: none;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: clamp(-6rem, -20vw, -3rem);
    bottom: clamp(-5rem, -16vw, -2rem);
    width: clamp(17rem, 60vw, 28rem);
  }
`

const ContentWrap = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 48rem);
  margin-left: clamp(1rem, 7vw, 7rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(100%, 42rem);
    margin-left: 0;
  }
`

const HeadSurface = styled(Surface)`
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.getMovementRole('arrival').card} 88%,
    transparent
  );
`

const HeadStack = styled(Stack)`
  min-width: 0;
`

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
  margin-top: ${({ theme }) => theme.spacingHalf(0.4)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    align-items: stretch;

    > * {
      flex: 1 1 auto;
    }
  }
`

const ArrivalNote = styled.div`
  max-width: 35rem;
`

const ArrivalSection = ({ onGoToActivation, onGoToIntegration }: Props) => (
  <Section
    id="ankommen"
    container="wide"
    padY
    variant="intro"
    tone="opening"
    mix={['opening', 'flow']}
    ariaLabel="Ankommen"
    titleId="ankommen-title"
  >
    <BreathIn
      src="/bewegungen/001_Atembogen.webp"
      width={1024}
      height={1024}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="high"
    />
    <ArrivalStage>
      <ContentWrap>
        <HeadSurface
          tone="quiet"
          movement="arrival"
          radius="large"
          bordered={false}
          padding="lg"
          weight="quiet"
        >
          <HeadStack gap={1}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              tone="soft"
              measure="wide"
            >
              Ankommen
            </Typography>

            <Stack gap={0.7}>
              <Typography
                as="h1"
                variant="h1"
                id="ankommen-title"
                cadence="dense"
                measure="title"
                gutter={false}
                tone="strong"
              >
                Meta-Placeholder: Diese erste Bewegung öffnet den Raum wie eine
                Einatmung: hell, ruhig, einladend, ohne schon erklären zu
                müssen.
              </Typography>

              <Typography
                as="p"
                variant="body"
                gutter={false}
                tone="soft"
                cadence="open"
                measure="prose"
              >
                Meta-Placeholder: Hier später das herzliche Willkommen und die
                erste Setzung. Jonas wird als Lehrer spürbar, bevor Methode,
                Angebot oder Biografie nach vorn treten.
              </Typography>
            </Stack>

            <ActionsRow>
              <Button variant="ghost" onClick={onGoToActivation}>
                Meta-Placeholder: In Bewegung kommen
              </Button>
              <Button variant="ghost" onClick={onGoToIntegration}>
                Meta-Placeholder: Rahmen finden
              </Button>
            </ActionsRow>

            <ArrivalNote>
              <Stack gap={0.44}>
                <Typography
                  as="p"
                  variant="body"
                  gutter={false}
                  accent="axisFlow"
                >
                  Meta-Placeholder: Einatmen öffnet. Ausatmen lässt sinken.
                  Dazwischen entsteht der erste Raum dieser Seite.
                </Typography>

                <Typography as="p" variant="body" gutter={false} tone="soft">
                  Kein Hero-Klischee. Kein Symbolbild. Auftakt als Bewegung.
                </Typography>
              </Stack>
            </ArrivalNote>
          </HeadStack>
        </HeadSurface>
      </ContentWrap>
    </ArrivalStage>
    <BreathOut
      src="/bewegungen/002_Ausatembogen.webp"
      width={1024}
      height={1024}
      alt=""
      aria-hidden="true"
      decoding="async"
      loading="lazy"
    />
  </Section>
)

export default ArrivalSection
