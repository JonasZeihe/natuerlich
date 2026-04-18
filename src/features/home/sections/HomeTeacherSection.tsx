'use client'

import styled from 'styled-components'
import Callout from '@/components/feedback/Callout'
import Typography from '@/design/typography'
import { teacherProfile } from '@/features/common/content/siteContent'

export default function HomeTeacherSection() {
  return (
    <Section>
      <Copy>
        <Typography as="h2" variant="h2" gutter={false}>
          {teacherProfile.title}
        </Typography>

        <TextStack>
          {teacherProfile.body.map((paragraph) => (
            <Typography key={paragraph} variant="body" gutter={false}>
              {paragraph}
            </Typography>
          ))}
        </TextStack>
      </Copy>

      <Aside>
        <Callout title="Woran Vertrauen hier entsteht" tone="info">
          Nicht durch Pathos. Nicht durch Zertifikatsmassen. Sondern dadurch,
          dass Haltung, Sprache, Angebot und reale Praxis zusammenfallen.
        </Callout>
      </Aside>
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const TextStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  max-width: 66ch;
`

const Aside = styled.aside`
  display: grid;
`
