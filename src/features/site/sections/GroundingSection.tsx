// src/features/site/sections/GroundingSection.tsx
'use client'

import styled from 'styled-components'
import SectionIntro from '@/components/content/SectionIntro'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

const QuestionArea = styled(Stack)`
  max-width: 44rem;
  margin-top: ${({ theme }) => theme.spacing(4)};
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
      <QuestionArea gap={3}>
        <Typography as="p" variant="body" gutter={false} cadence="open">
          Wie geht es dir gerade?
        </Typography>
        <Typography as="p" variant="body" gutter={false} cadence="open">
          Was bringt dich hierher?
        </Typography>
        <Typography as="p" variant="body" gutter={false} cadence="open">
          Was wäre gut, wenn es heute ein kleines Stück leichter würde?
        </Typography>
      </QuestionArea>
    </Surface>
  </Section>
)

export default GroundingSection
