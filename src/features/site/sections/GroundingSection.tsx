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
        title="Bevor Praxis beginnt, lohnt sich ein kurzer Blick nach innen."
        accent="axisDensity"
        max="54rem"
      >
        Vielleicht bist du hier, weil du weniger Stress willst. Vielleicht, weil
        du wieder in Bewegung kommen möchtest. Vielleicht auch nur, weil du
        merkst, dass etwas so nicht weiterlaufen soll. Das alles ist ein Anfang.
        Aber gute Praxis beginnt für mich nicht damit, sofort die richtige
        Methode zu wählen. Sie beginnt dort, wo spürbar wird, was gerade
        wirklich los ist.
      </SectionIntro>

      <StepArea>
        <StepList
          movement="grounding"
          items={[
            {
              label: 'Nicht sofort entscheiden',
              children:
                'Du musst nicht direkt wissen, ob Yoga, Qigong, Taijiquan, Meditation oder Einzelarbeit richtig ist. Erst einmal geht es darum, wieder wahrzunehmen, wo du überhaupt stehst.',
            },
            {
              label: 'Den Widerstand ernst nehmen',
              tone: 'field',
              title:
                'Wenn etwas in dir keine Lust hat, ist das nicht automatisch Faulheit.',
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
                'Vielleicht stimmt nur die Form noch nicht. Vielleicht ist zu viel Druck drin, zu wenig Sinn, zu wenig Spielraum. Manchmal zeigt Widerstand ziemlich genau, wo die Achse verrutscht ist.',
            },
            {
              label: 'Die eigene Achse finden',
              accent: 'axisFlow',
              children:
                'Praxis trägt anders, wenn sie nicht gegen dich arbeitet. Nicht aus Zwang, nicht aus Selbstoptimierung, sondern aus innerer Zustimmung.',
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
              Von hier aus
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              Manchmal ist Stress nur die Oberfläche. Darunter liegt etwas
              Einfacheres und zugleich Tieferes: der Wunsch, wieder bei sich
              anzukommen — körperlich, ruhig, ehrlich und ohne diesen ganzen
              Film von höher, schneller, besser.
            </Typography>
          </Stack>
        </Surface>
      </GroundingNote>
    </Surface>
  </Section>
)

export default GroundingSection
