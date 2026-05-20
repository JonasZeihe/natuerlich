// src/features/site/sections/MiniCourseSection.tsx
'use client'

import { useState } from 'react'
import styled from 'styled-components'
import Button from '@/components/actions/Button'
import BodyScanDialog from '@/components/miniCourse/BodyScanDialog'
import BreathingExercise from '@/components/miniCourse/BreathingExercise'
import Grid from '@/components/primitives/Grid'
import Inline from '@/components/primitives/Inline'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import { bodyScanContent } from '@/features/miniCourse/model/bodyScan'
import { miniCourseContent } from '@/features/miniCourse/model/miniCourse'

type Props = {
  onGoToPracticeField: () => void
}

const MiniCourseSection = ({ onGoToPracticeField }: Props) => {
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
      <Stack gap={5}>
        <Hero>
          <Typography
            as="h1"
            id="minikurs-title"
            variant="h1"
            cadence="dense"
            measure="title"
            gutter={false}
          >
            {miniCourseContent.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            tone="soft"
            cadence="open"
            measure="prose"
            gutter={false}
          >
            {miniCourseContent.lead}
          </Typography>
        </Hero>

        <BreathingArea aria-label="Atemübung">
          <BreathingExercise showWebsiteAction={false} />
        </BreathingArea>

        <Surface tone="card" movement="arrival" radius="large" padding="lg">
          <Grid columns={2} min="18rem" gap={3}>
            <Stack gap={1.25}>
              <Typography
                as="h2"
                variant="h2"
                cadence="dense"
                measure="title"
                gutter={false}
              >
                {miniCourseContent.bodyScan.title}
              </Typography>

              <Typography
                as="p"
                variant="body"
                tone="soft"
                cadence="open"
                measure="prose"
                gutter={false}
              >
                {miniCourseContent.bodyScan.body}
              </Typography>
            </Stack>

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

        <Grid columns={3} min="16rem" gap={1.5}>
          {miniCourseContent.introduction.map((text) => (
            <Typography
              key={text}
              as="p"
              variant="body"
              tone="soft"
              cadence="open"
              measure="prose"
              gutter={false}
            >
              {text}
            </Typography>
          ))}
        </Grid>

        <Inline gap={1} align="center">
          <Button type="button" variant="primary" onClick={onGoToPracticeField}>
            {miniCourseContent.navigation.primary}
          </Button>

          {miniCourseContent.navigation.links.map((item) => (
            <a key={item.href} href={item.href}>
              {item.text}
            </a>
          ))}
        </Inline>
      </Stack>

      {isBodyScanOpen ? (
        <BodyScanDialog
          content={bodyScanContent}
          onClose={() => setIsBodyScanOpen(false)}
        />
      ) : null}
    </Section>
  )
}

const Hero = styled.header`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const BreathingArea = styled.div`
  display: grid;
  place-items: center;
  min-height: clamp(24rem, 58svh, 42rem);
`

const ActionSlot = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`

export default MiniCourseSection
