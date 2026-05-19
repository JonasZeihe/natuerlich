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
        titleId="aktivieren-title"
        title="Jetzt fangen wir an."
        accent="axisOpening"
        max="56rem"
      >
        Nicht perfekt. Nicht feierlich. Mit dem Körper, der heute da ist. Ein
        Atemzug mehr. Ein bisschen Wärme. Der erste ehrliche Schritt aus dem
        Sitzen ins Tun.
      </SectionIntro>

      <SplitArea>
        <SplitPanel
          movement="activation"
          primary={{
            label: 'Auftakt',
            title: 'Wir bringen den Körper in Gang.',
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
              'Aufrichten. Atmen. Warm werden. Nicht als Pflichtprogramm, sondern weil Bewegung Freude machen darf, bevor sie Arbeit wird.',
          }}
          secondary={{
            label: 'Wärme',
            title: 'Und wenn wir warm sind, beginnt die eigentliche Praxis.',
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
              'Dann wird es klarer. Genauer. Interessanter. Der Körper ist wach genug, um nicht nur mitzumachen, sondern wirklich dabei zu sein.',
          }}
        />
      </SplitArea>
    </Surface>
  </Section>
)

export default ActivationSection
