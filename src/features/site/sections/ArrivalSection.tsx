// src/features/site/sections/ArrivalSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Grid from '@/components/primitives/Grid'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToActivation: () => void
  onGoToIntegration: () => void
}

const ArrivalNote = styled.div`
  max-width: 35rem;
`

const ArrivalSection = ({ onGoToActivation, onGoToIntegration }: Props) => (
  <Section
    id="ankommen"
    container="wide"
    content="left"
    frame="screen"
    padY
    variant="intro"
    tone="opening"
    movement="arrival"
    mix={['opening', 'flow']}
    ariaLabel="Ankommen"
    titleId="ankommen-title"
    assets={[
      {
        name: '001_Atembogen',
        left: 'clamp(5rem, -11vw, -5rem)',
        bottom: 'clamp(42rem, 16vw, 15rem)',
        width: 'clamp(28rem, 44vw, 50rem)',
        presence: 'strong',
        boundary: 'bleed',
        priority: true,
        mobile: {
          left: 'clamp(-5rem, -36vw, -6rem)',
          top: 'clamp(-2rem, -10vw, -1.5rem)',
          width: 'clamp(26rem, 104vw, 38rem)',
        },
      },
      {
        name: '002_Ausatembogen',
        right: 'clamp(35rem, 4vw, 5rem)',
        bottom: 'clamp(15rem, -2vw, 0rem)',
        width: 'clamp(18rem, 27vw, 32rem)',
        presence: 'default',
        boundary: 'bleed',
        mobile: {
          right: 'clamp(0rem, -28vw, -4rem)',
          bottom: 'clamp(0rem, -12vw, -1.5rem)',
          width: 'clamp(18rem, 72vw, 28rem)',
        },
      },
      {
        name: '029_Präsenzfeld',
        right: 'clamp(-10rem, -8vw, -4rem)',
        top: 'clamp(5rem, 12vw, 12rem)',
        width: 'clamp(18rem, 28vw, 34rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.22,
        mobile: {
          right: '-10rem',
          top: '35%',
          width: '26rem',
          opacity: 0.14,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="arrival"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <Stack gap={5}>
        <Typography
          as="h1"
          variant="h1"
          id="ankommen-title"
          cadence="dense"
          measure="title"
          gutter={false}
          tone="strong"
        >
          Praxis beginnt nicht bei der Technik. Sie beginnt bei der Frage, warum
          du überhaupt da bist.
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          Du musst noch nicht wissen, ob Yoga, Qigong, Taijiquan, Meditation
          oder Einzelarbeit zu dir passt. Komm erst einmal an. Atme. Spür, wo du
          gerade stehst. Von dort aus wird klarer, was dich wirklich trägt.
        </Typography>
      </Stack>

      <Grid gap={3} offset={3}>
        <Button variant="ghost" onClick={onGoToActivation}>
          In Bewegung kommen
        </Button>
        <Button variant="ghost" onClick={onGoToIntegration}>
          Passenden Rahmen finden
        </Button>
      </Grid>

      <ArrivalNote>
        <Stack gap={5}>
          <Typography as="p" variant="body" gutter={false} accent="axisFlow">
            Hier geht es nicht darum, dich in eine Methode zu drücken. Es geht
            darum, eine Praxis zu finden, die aus dir heraus Sinn ergibt: ruhig,
            klar, körperlich und ehrlich genug, um im Alltag zu tragen.
          </Typography>

          <Typography as="p" variant="body" gutter={false} tone="soft">
            Manchmal beginnt Veränderung nicht mit mehr Anstrengung, sondern mit
            einem Moment, in dem du merkst: So wie bisher muss es nicht
            weiterlaufen.
          </Typography>
        </Stack>
      </ArrivalNote>
    </Surface>
  </Section>
)

export default ArrivalSection
