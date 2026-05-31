// src/features/site/sections/MiniCourseSection.tsx
'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import StatementBreak from '@/components/content/StatementBreak'
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

        <Surface tone="card" movement="arrival" radius="large" padding="lg">
          <Grid columns={2} min="18rem" gap={3}>
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
          </Grid>
        </Surface>

        <AfterPractice>
          <Stack gap={1.35}>
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
          </Stack>
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
  gap: ${({ theme }) => theme.spacing(2.75)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(3.75)};
  }
`

const Hero = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const BreathingArea = styled.div`
  display: grid;
  place-items: center;
  min-height: 31rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: clamp(24rem, 58svh, 42rem);
  }
`

const ActionSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AfterPractice = styled.article`
  width: min(100%, 64ch);
  margin-inline: auto;
`

export default MiniCourseSection
