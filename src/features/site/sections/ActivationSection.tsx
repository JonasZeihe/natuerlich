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
        title="Wenn etwas stimmig wird, kommt Bewegung fast von selbst."
        accent="axisOpening"
        max="56rem"
      >
        Nach dem Ankommen und Sammeln muss nichts erzwungen werden. Manchmal
        reicht ein kleiner Impuls: ein Atemzug, der weiter wird, ein Körper, der
        sich aufrichtet, eine Bewegung, die wieder Lust macht. Praxis beginnt
        dort, wo etwas in dir antwortet.
      </SectionIntro>

      <SplitArea>
        <SplitPanel
          movement="activation"
          primary={{
            label: 'Freude als Anfang',
            title:
              'Nicht erst leisten, damit es sich irgendwann gut anfühlen darf.',
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
              'Freude ist nicht die Belohnung am Ende der Praxis. Sie kann der Grund sein, aus dem Bewegung überhaupt entsteht: neugierig, wach, körperlich, ohne diesen ganzen Film von höher, schneller, besser.',
          }}
          secondary={{
            label: 'Eigenes Maß',
            title:
              'Eine Übung darf sich verändern, bis sie wirklich zu dir passt.',
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
              'Wenn etwas zu viel ist, wird es reduziert. Wenn etwas zu wenig ist, darf es tiefer werden. Nicht, um beliebig zu werden, sondern damit die Praxis aus innerer Zustimmung geschieht und nicht gegen dich arbeitet.',
            action: (
              <Button variant="ghost" onClick={onGoToPracticeField}>
                Zur Praxis finden
              </Button>
            ),
          }}
        />
      </SplitArea>
    </Surface>
  </Section>
)

export default ActivationSection
