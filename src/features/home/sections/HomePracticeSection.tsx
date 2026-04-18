'use client'

import styled from 'styled-components'
import Typography from '@/design/typography'
import { formats, practiceFields } from '@/features/common/content/siteContent'

export default function HomePracticeSection() {
  return (
    <Section>
      <Intro>
        <Typography as="h2" variant="h2" gutter={false}>
          Was Jonas konkret trägt
        </Typography>
        <Typography variant="body" gutter={false}>
          Die Praxisfelder stehen hier nicht lose nebeneinander. Sie sind
          Ausfaltung derselben Lehrerlinie.
        </Typography>
      </Intro>

      <Grid>
        {practiceFields.map((field) => (
          <Card key={field.title}>
            <Typography
              as="h3"
              variant="h3"
              accent="axisClarity"
              gutter={false}
            >
              {field.title}
            </Typography>
            <Typography variant="body" gutter={false}>
              {field.text}
            </Typography>
          </Card>
        ))}
      </Grid>

      <FormatsWrap>
        {formats.map((format) => (
          <FormatCard key={format.title}>
            <Typography
              as="h3"
              variant="subtitle"
              accent="axisEnergy"
              gutter={false}
            >
              {format.title}
            </Typography>
            <Typography variant="body" gutter={false}>
              {format.text}
            </Typography>
          </FormatCard>
        ))}
      </FormatsWrap>
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 64ch;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const FormatsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const FormatCard = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.getAxisRole('axisResonance').border};
  background: ${({ theme }) => theme.getAxisRole('axisResonance').surface};
`
