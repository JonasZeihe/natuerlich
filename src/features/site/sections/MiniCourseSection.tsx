// src/features/site/sections/MiniCourseSection.tsx
'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
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
  lead: 'Beginne mit dem Atem. Öffne danach den Body Scan, wenn du deinen Körper genauer wahrnehmen möchtest.',
  bodyScan: {
    title: 'Den Körper einmal von innen lesen.',
    action: 'Body Scan öffnen',
  },
  afterBodyScan: {
    opening: 'Vielleicht bist du jetzt ein Stückchen mehr bei dir.',
    paragraphs: [
      'Atem, Wahrnehmung und Body Scan sind einfache Zugänge. Egal, wo du eben warst — dieser kleine Wechsel zählt.',
      'Ich mache keine Heilversprechen. Aber ich bin davon überzeugt, dass regelmäßige Praxis eine echte Entspannungsfähigkeit aufbauen kann. Nicht erst dann, wenn man schon müde, gereizt oder abgebrannt ist.',
      'Prävention ist nichts, was man sich für später aufspart. Sie ist ein Muster im Alltag: kurz innehalten, wahrnehmen, nachregulieren, bevor der Körper nur noch im Crash antwortet.',
      'Aus diesem Anfang kann Praxis werden: Yoga, Qigong, Taijiquan, Meditation, Entspannung. Nicht als Etiketten, sondern als Wege, den eigenen Zustand besser zu lesen und mit ihm zu arbeiten.',
    ],
    closing:
      'Wenn dich das neugierig macht, dann schau, wer ich bin, was ich unterrichte und wie ein gemeinsamer Einstieg aussehen kann.',
  },
} as const

const MiniCourseSection = ({}: Props) => {
  const [isBodyScanOpen, setIsBodyScanOpen] = useState(false)

  return (
    <Section
      id="minikurs"
      titleId="minikurs-title"
      ariaLabel="Minikurs"
      container="wide"
      variant="intro"
      rhythm="spacious"
      tone="default"
      movement="arrival"
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
              {miniCourseContent.lead}
            </Typography>
          </Hero>

          <BreathingArea aria-label="Atemübung">
            <BreathingExercise showWebsiteAction={false} />
          </BreathingArea>
        </ArrivalStage>

        <BodyScanWrap>
          <Surface tone="card" movement="arrival" radius="large" padding="lg">
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
          </Surface>
        </BodyScanWrap>

        <AfterPractice>
          <AfterPracticeStack>
            <Typography
              as="p"
              variant="body"
              tone="strong"
              cadence="open"
              measure="prose"
            >
              {miniCourseContent.afterBodyScan.opening}
            </Typography>

            {miniCourseContent.afterBodyScan.paragraphs.map((text) => (
              <Typography
                key={text}
                as="p"
                variant="body"
                tone="soft"
                cadence="open"
                measure="prose"
              >
                {text}
              </Typography>
            ))}

            <Typography
              as="p"
              variant="body"
              tone="strong"
              cadence="open"
              measure="prose"
            >
              {miniCourseContent.afterBodyScan.closing}
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
    </Section>
  )
}

const CourseFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.region};
`

const ArrivalStage = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(18rem, 0.46fr) minmax(28rem, 0.74fr);
    align-items: center;
    min-height: clamp(34rem, 72svh, 48rem);
    gap: ${({ theme }) => theme.layout.flow.chapter};
  }
`

const Hero = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.block};
  max-width: 34rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-self: start;
    padding-top: clamp(1rem, 7svh, 5rem);
  }
`

const BreathingArea = styled.div`
  display: grid;
  place-items: center;
  min-height: 31rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: clamp(28rem, 58svh, 42rem);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 0;
  }
`

const BodyScanWrap = styled.div`
  width: min(100%, 72rem);
  margin-inline: auto;
`

const ScanGrid = styled(Grid)`
  align-items: center;
  gap: ${({ theme }) => theme.layout.flow.cluster};
`

const ActionSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`

const AfterPractice = styled.article`
  width: min(100%, 64ch);
  margin-inline: auto;
`

const AfterPracticeStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

export default MiniCourseSection
