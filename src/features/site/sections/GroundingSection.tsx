// src/features/site/sections/GroundingSection.tsx
'use client'

import styled from 'styled-components'
import SectionIntro from '@/components/content/SectionIntro'
import StepList from '@/components/content/StepList'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

const StepArea = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const GroundingNote = styled.div`
  max-width: 41rem;
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const GroundingSection = () => (
  <Section
    id="sammeln"
    titleId="sammeln-title"
    ariaLabel="Sammeln"
    container="wide"
    content="left"
    frame="content"
    variant="body"
    rhythm="spacious"
    tone="clarify"
    movement="grounding"
    mix={['density', 'flow']}
    assets={[
      {
        name: '008_Sammelpunkt',
        right: 'clamp(4rem, 8vw, 12rem)',
        top: 'clamp(2rem, 6vw, 6rem)',
        width: 'clamp(16rem, 27vw, 30rem)',
        presence: 'default',
        boundary: 'bleed',
        opacity: 0.42,
        mobile: {
          right: 'clamp(-9rem, -30vw, -5rem)',
          top: 'clamp(1rem, 8vw, 4rem)',
          width: 'clamp(18rem, 82vw, 32rem)',
          opacity: 0.24,
        },
      },
      {
        name: '010_Resonanzfeld',
        left: 'clamp(18rem, 48vw, 58rem)',
        bottom: 'clamp(-10rem, -9vw, -4rem)',
        width: 'clamp(18rem, 28vw, 34rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.22,
        mobile: {
          left: 'clamp(-9rem, -34vw, -5rem)',
          bottom: 'clamp(-8rem, -18vw, -3rem)',
          width: 'clamp(20rem, 88vw, 32rem)',
          opacity: 0.18,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="grounding"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Sammeln"
        titleId="sammeln-title"
        title="Bevor Praxis wirkt, muss klarer werden, von wo aus du überhaupt beginnst."
        accent="axisDensity"
        max="54rem"
      >
        Diese Bewegung stellt die Motivationsachse in den Raum. Bin ich hier, um
        wieder besser zu funktionieren? Oder bin ich hier, weil ich mich selbst
        wieder spüren will?
      </SectionIntro>

      <StepArea>
        <StepList
          movement="grounding"
          items={[
            {
              label: 'Grund',
              children:
                'Nicht zuerst: Welche Technik passt? Sondern: Warum bin ich hier? Was sucht in mir eigentlich nach Form?',
            },
            {
              label: 'Achse',
              tone: 'field',
              title:
                'Wenn die Achse verrutscht, wird selbst Entspannung zur Wartungspause.',
              asset: {
                name: '008_Sammelpunkt',
                right: '-5rem',
                bottom: '-6rem',
                width: 'clamp(10rem, 22vw, 17rem)',
                presence: 'subtle',
                boundary: 'bleed',
                opacity: 0.22,
              },
              children:
                'Sammlung heißt: den Punkt wiederfinden, von dem aus Praxis wirklich meine wird.',
            },
            {
              label: 'Zustimmung',
              accent: 'axisFlow',
              children:
                'Es geht nicht darum, den inneren Widerstand niederzudrücken. Vielleicht zeigt er nur, dass Form, Maß oder Richtung noch nicht stimmen.',
            },
          ]}
        />
      </StepArea>

      <GroundingNote>
        <Surface
          tone="note"
          movement="grounding"
          radius="large"
          bordered
          padding="md"
          weight="quiet"
          asset={{
            name: '010_Resonanzfeld',
            right: '-6rem',
            top: '-5rem',
            width: 'clamp(11rem, 24vw, 18rem)',
            presence: 'subtle',
            boundary: 'bleed',
            opacity: 0.26,
            mobile: {
              right: '-8rem',
              top: '-5rem',
              width: '16rem',
              opacity: 0.18,
            },
          }}
        >
          <Stack gap={4}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent="axisFlow"
            >
              Übergang
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Diese Section beruhigt nicht, um passiv zu werden. Sie sammelt
              genug innere Zustimmung, damit die nächste Bewegung wacher, klarer
              und körperlicher einsetzen kann.
            </Typography>
          </Stack>
        </Surface>
      </GroundingNote>
    </Surface>
  </Section>
)

export default GroundingSection
