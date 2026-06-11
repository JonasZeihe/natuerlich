// src/features/site/sections/MiniCourseSection.tsx
'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import HighlightText from '@/components/utilities/HighlightText'
import BodyScanDialog from '@/components/miniCourse/BodyScanDialog'
import BreathingExercise from '@/components/miniCourse/BreathingExercise'
import Grid from '@/components/primitives/Grid'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import { bodyScanContent } from '@/features/miniCourse/model/bodyScan'

type Props = {
  onGoToPracticeField: () => void
}

const miniCourseContent = {
  title: 'Komm erst mal an.',
  bodyScan: {
    title: 'Den Körper einmal von innen lesen.',
    action: 'Body Scan öffnen',
  },
} as const

const MiniCourseSection = ({}: Props) => {
  const [isBodyScanOpen, setIsBodyScanOpen] = useState(false)

  return (
    <MiniCourseShell
      id="minikurs"
      titleId="minikurs-title"
      ariaLabel="Minikurs"
      container="wide"
      rail="wide"
      variant="intro"
      rhythm="spacious"
      tone="default"
    >
      <CourseFlow>
        <ArrivalStage>
          <Hero>
            <Typography
              as="h1"
              id="minikurs-title"
              variant="h1"
              cadence="dense"
              measure="title"
            >
              {miniCourseContent.title}
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
            >
              Beginne mit der Atemübung. Öffne danach den Body Scan, wenn du
              deinen Körper genauer wahrnehmen möchtest.
            </Typography>
          </Hero>

          <BreathingArea aria-label="Atemübung">
            <BreathingExercise showWebsiteAction={false} />
          </BreathingArea>
        </ArrivalStage>

        <BodyScanShell>
          <BodyScanShape aria-hidden="true" />
          <BodyScanSurface
            tone="bare"
            movement="arrival"
            radius="none"
            padding="none"
          >
            <ScanGrid columns={2} min="18rem">
              <Typography as="h2" variant="h2" cadence="dense" measure="title">
                {miniCourseContent.bodyScan.title}
              </Typography>

              <ActionSlot>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsBodyScanOpen(true)}
                >
                  {miniCourseContent.bodyScan.action}
                </Button>
              </ActionSlot>
            </ScanGrid>
          </BodyScanSurface>
        </BodyScanShell>

        <AfterPractice>
          <AfterPracticeStack>
            <Typography
              as="p"
              variant="body"
              tone="strong"
              cadence="open"
              measure="prose"
            >
              Vielleicht bist du jetzt ein Stückchen mehr bei dir.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
            >
              <HighlightText accent="breath">Atem</HighlightText>, Wahrnehmung
              und <HighlightText accent="qigong">Body Scan</HighlightText> sind
              einfache Zugänge. Egal, wo du eben warst — dieser kleine Wechsel
              zählt.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
            >
              Ich mache keine Heilversprechen. Aber ich bin davon überzeugt,
              dass{' '}
              <HighlightText accent="daoyin">regelmäßige Praxis</HighlightText>{' '}
              eine echte Entspannungsfähigkeit aufbauen kann. Nicht erst dann,
              wenn man schon müde, gereizt oder abgebrannt ist.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
            >
              <HighlightText accent="taiji">Prävention</HighlightText> ist
              nichts, was man sich für später aufspart. Sie ist ein Muster im
              Alltag: kurz innehalten, wahrnehmen, nachregulieren, bevor der
              Körper nur noch im Crash antwortet.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
            >
              Aus diesem Anfang kann{' '}
              <HighlightText accent="daoyin">Praxis</HighlightText> werden:
              Yoga, Qigong, Taijiquan, Meditation, Entspannung. Nicht als
              Etiketten, sondern als Wege, den eigenen Zustand besser zu lesen
              und mit ihm zu arbeiten.
            </Typography>

            <Typography
              as="p"
              variant="body"
              tone="strong"
              cadence="open"
              measure="prose"
            >
              Wenn dich das neugierig macht, dann schau, wer ich bin, was ich
              unterrichte und wie ein gemeinsamer Einstieg aussehen kann.
            </Typography>
          </AfterPracticeStack>
        </AfterPractice>
      </CourseFlow>

      {isBodyScanOpen ? (
        <BodyScanDialog
          content={bodyScanContent}
          onClose={() => setIsBodyScanOpen(false)}
        />
      ) : null}
    </MiniCourseShell>
  )
}

const MiniCourseShell = styled(Section)`
  background: linear-gradient(
    180deg,
    #2c4351 0%,
    ${({ theme }) => theme.roles.movement.arrival.field} 40%,
    ${({ theme }) => theme.roles.movement.arrival.card} 80%
  );
`

const CourseFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
  width: 100%;
  min-width: 0;
`

const ArrivalStage = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
  min-width: 0;
`

const Hero = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.block};
  max-width: 38rem;
  min-width: 0;
  color: ${({ theme }) => theme.roles.movement.arrival.textInverse};

  h1,
  p {
    color: inherit;
  }
`

const BreathingArea = styled.div`
  display: grid;
  place-items: center;
  min-width: 0;
`

const BodyScanShell = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  min-width: 0;
  width: 100%;
  min-height: clamp(9.4rem, 34vw, 13.4rem);
  margin-top: calc(${({ theme }) => theme.layout.flow.cluster} * -0.35);
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: clamp(8.8rem, 39vw, 11.6rem);
    margin-left: calc(${({ theme }) => theme.layout.inset.page} * -1);
    width: calc(100% + ${({ theme }) => theme.layout.inset.page});
  }
`

const BodyScanShape = styled.div`
  position: absolute;
  z-index: 0;
  inset-block: 0;
  left: 0;
  width: min(52rem, 100%);
  pointer-events: none;
  background: ${({ theme }) => theme.roles.movement.arrival.card};
  border-radius: 52% 48% 45% 55% / 58% 50% 50% 42%;
  box-shadow: 0 1.1rem 2.8rem
    color-mix(
      in srgb,
      ${({ theme }) => theme.foundations.palette.ink} 8%,
      transparent
    );
  transform: translateX(-8%) rotate(-1.8deg);
  transform-origin: 50% 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 0;
    bottom: 0;
    left: 0;
    width: min(31rem, calc(100vw + 7rem));
    border-radius: 48% 52% 43% 57% / 56% 48% 52% 44%;
    transform: translateX(-38%) rotate(-4deg);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 50%;
    width: min(58rem, 92%);
    transform: translateX(-50%) rotate(-1.2deg);
    border-radius: 50% 50% 46% 54% / 56% 49% 51% 44%;
  }
`

const BodyScanSurface = styled(Surface)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: min(46rem, 86%);
  margin-left: clamp(1rem, 4vw, 2.4rem);
  background: transparent;
  color: ${({ theme }) => theme.color.text.primary};
  padding: clamp(1.2rem, 4vw, 2.1rem) clamp(1.4rem, 5vw, 3rem)
    clamp(1.25rem, 4vw, 2.2rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: min(22rem, calc(100vw - 3.8rem));
    margin-left: ${({ theme }) => theme.layout.inset.page};
    padding: clamp(1.05rem, 5vw, 1.55rem) clamp(1rem, 5vw, 1.5rem)
      clamp(1.1rem, 5vw, 1.65rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: min(48rem, 78%);
    margin-inline: auto;
    padding-inline: clamp(2.4rem, 4.5vw, 4.2rem);
  }
`

const ScanGrid = styled(Grid)`
  align-items: center;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    max-width: 17rem;
  }
`

const ActionSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`

const AfterPractice = styled.article`
  max-width: 64ch;
  min-width: 0;
  margin-inline: auto;
`

const AfterPracticeStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

export default MiniCourseSection
