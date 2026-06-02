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

        <BodyScanSurface
          tone="card"
          movement="arrival"
          radius="large"
          padding="lg"
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
    #6f8585 36%,
    ${({ theme }) => theme.roles.movement.arrival.field} 70%,
    ${({ theme }) => theme.roles.movement.arrival.card} 100%
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

const BodyScanSurface = styled(Surface)`
  border: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.arrival.border} 52%,
      transparent
    );
  background: ${({ theme }) => theme.roles.movement.arrival.card};
`

const ScanGrid = styled(Grid)`
  align-items: center;
  gap: ${({ theme }) => theme.layout.flow.cluster};
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
