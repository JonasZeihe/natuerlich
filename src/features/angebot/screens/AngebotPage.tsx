'use client'

import styled from 'styled-components'
import Typography from '@/design/typography'
import PageScaffold from '@/features/common/components/PageScaffold'
import { formats, practiceFields } from '@/features/common/content/siteContent'

export default function AngebotPage() {
  return (
    <PageScaffold
      intro={
        <Intro>
          <Typography as="h1" variant="h1" gutter={false}>
            Angebot
          </Typography>
          <Typography variant="body" gutter={false}>
            Die Methoden stehen hier nicht als lose Sammlung. Sie bleiben an
            dieselbe Lehrerlinie gebunden.
          </Typography>
        </Intro>
      }
    >
      <Section>
        <Typography as="h2" variant="h2" gutter={false}>
          Praxisfelder
        </Typography>
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
      </Section>

      <Section>
        <Typography as="h2" variant="h2" gutter={false}>
          Formate
        </Typography>
        <Grid>
          {formats.map((format) => (
            <Card key={format.title}>
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
            </Card>
          ))}
        </Grid>
      </Section>
    </PageScaffold>
  )
}

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 60ch;
`

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
`
