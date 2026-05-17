// src/features/site/sections/ArrivalSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'
import Grid from '@/components/primitives/Grid'

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
          Meta-Placeholder: Auftakt der Seite. Erst landen, dann Orientierung
          finden: offen, warm, ruhig und ohne Verkaufsdruck.
        </Typography>

        <Typography
          as="p"
          variant="body"
          gutter={false}
          tone="soft"
          cadence="open"
          measure="prose"
        >
          Meta-Placeholder: Hier später die erste echte Setzung. Jonas wird als
          Lehrer spürbar, bevor Methode, Angebot oder Biografie nach vorn
          treten. Willkommen, aber mit Richtung.
        </Typography>
      </Stack>

      <Grid gap={3} offset={3}>
        <Button variant="ghost" onClick={onGoToActivation}>
          Placeholder: Aktivierung
        </Button>
        <Button variant="ghost" onClick={onGoToIntegration}>
          Placeholder: Rahmen
        </Button>
      </Grid>

      <ArrivalNote>
        <Stack gap={5}>
          <Typography as="p" variant="body" gutter={false} accent="axisFlow">
            Meta-Placeholder: Die Note entlastet den Einstieg. Man muss noch
            nicht wissen, welches Format passt. Der erste Schritt ist
            Orientierung.
          </Typography>

          <Typography as="p" variant="body" gutter={false} tone="soft">
            Meta-Placeholder: Einatmen öffnet, Ausatmen lässt sinken. Die
            nächste Bewegung darf aus dieser Ruhe entstehen.
          </Typography>
        </Stack>
      </ArrivalNote>
    </Surface>
  </Section>
)

export default ArrivalSection
