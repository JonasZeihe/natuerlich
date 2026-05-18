// src/features/site/sections/ActivationSection.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import SectionIntro from '@/components/content/SectionIntro'
import SplitPanel from '@/components/content/SplitPanel'
import Section from '@/components/primitives/Section'
import Surface from '@/components/primitives/Surface'

type Props = {
  onGoToPracticeField: () => void
}

const SplitArea = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
`

const ActivationSection = ({ onGoToPracticeField }: Props) => (
  <Section
    id="aktivieren"
    titleId="aktivieren-title"
    ariaLabel="Aktivieren"
    container="wide"
    content="left"
    variant="body"
    rhythm="default"
    tone="expand"
    movement="activation"
    energy="tension"
    assets={[
      {
        name: '004_Aufrichtung',
        right: 'clamp(1rem, 7vw, 10rem)',
        top: 'clamp(4rem, 7vw, 8rem)',
        width: 'clamp(15rem, 25vw, 29rem)',
        presence: 'default',
        boundary: 'bleed',
        opacity: 0.48,
        mobile: {
          right: '-8rem',
          top: '2rem',
          width: '24rem',
          opacity: 0.22,
        },
      },
      {
        name: '007_Atemsäule',
        left: 'clamp(30rem, 52vw, 62rem)',
        bottom: 'clamp(-8rem, -4vw, -2rem)',
        width: 'clamp(13rem, 21vw, 26rem)',
        presence: 'subtle',
        boundary: 'bleed',
        opacity: 0.24,
        mobile: {
          left: '-7rem',
          bottom: '-5rem',
          width: '21rem',
          opacity: 0.16,
        },
      },
    ]}
  >
    <Surface
      tone="bare"
      movement="activation"
      radius="none"
      bordered={false}
      padding="lg"
      weight="quiet"
    >
      <SectionIntro
        label="Aktivieren"
        titleId="aktivieren-title"
        title="Aus Sammlung wird Wachheit. Der Körper wird nicht optimiert, sondern wieder ansprechbar."
        accent="axisOpening"
        max="56rem"
      >
        Hier beginnt Praxis als Beziehung. Atem, Körper und Aufmerksamkeit
        greifen ineinander. Nicht als Trick, nicht als Entspannungsritual,
        sondern als erster lebendiger Kontakt zum eigenen System.
      </SectionIntro>

      <SplitArea>
        <SplitPanel
          movement="activation"
          primary={{
            label: 'Atem und Wahrnehmung',
            title:
              'Nicht runterfahren, um wieder zu funktionieren. Sondern spüren, wo das System gerade steht.',
            accent: 'axisFlow',
            tone: 'field',
            asset: {
              name: '007_Atemsäule',
              right: '-5rem',
              bottom: '-7rem',
              width: 'clamp(11rem, 23vw, 18rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.25,
            },
            children:
              'Diese Fläche bereitet später Meditation, Atemarbeit, Achtsamkeit und Entspannung vor. Noch nicht als Angebotsliste, sondern als aktivierende Grundlage.',
          }}
          secondary={{
            label: 'Erste Tatkraft',
            title: 'Die Form darf sich verändern, bis sie wieder passt.',
            accent: 'axisOpening',
            tone: 'threshold',
            asset: {
              name: '031_Tatkraft',
              right: '-6rem',
              top: '-6rem',
              width: 'clamp(11rem, 24vw, 18rem)',
              presence: 'subtle',
              boundary: 'bleed',
              opacity: 0.3,
            },
            children:
              'Hier entsteht später der Übergang vom Verstehen ins Tun. Nicht Disziplin als Selbstzwang, sondern der Moment, in dem innere Zustimmung eine erste Bewegung möglich macht.',
            action: (
              <Button variant="ghost" onClick={onGoToPracticeField}>
                Zur eigentlichen Arbeit
              </Button>
            ),
          }}
        />
      </SplitArea>
    </Surface>
  </Section>
)

export default ActivationSection
