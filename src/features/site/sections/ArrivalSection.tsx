// src/features/site/sections/ArrivalSection.tsx
'use client'

import Button from '@/components/actions/Button'
import Grid from '@/components/primitives/Grid'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

type Props = {
  onGoToActivation: () => void
  onGoToSchnupperkurs: () => void
}

const ArrivalSection = ({ onGoToActivation, onGoToSchnupperkurs }: Props) => (
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
          Schön, dass du da bist.
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          Komm erst einmal an. Atme ein. Atme aus. Du musst noch nichts leisten,
          nichts beweisen und nichts über dich wissen. Für den Anfang reicht
          dieser Moment.
        </Typography>
      </Stack>

      <Grid gap={3} offset={3}>
        <Button variant="ghost" onClick={onGoToSchnupperkurs}>
          Schnupperkurs starten
        </Button>
        <Button variant="ghost" onClick={onGoToActivation}>
          In Bewegung kommen
        </Button>
      </Grid>
    </Surface>
  </Section>
)

export default ArrivalSection
