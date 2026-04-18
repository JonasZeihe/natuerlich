'use client'

import styled from 'styled-components'
import Typography from '@/design/typography'
import PageScaffold from '@/features/common/components/PageScaffold'
import { contactContent } from '@/features/common/content/siteContent'

export default function KontaktPage() {
  return (
    <PageScaffold
      intro={
        <Intro>
          <Typography as="h1" variant="h1" gutter={false}>
            Kontakt
          </Typography>
          <Typography variant="body" gutter={false}>
            Wenn Resonanz da ist, sollte es einen realen nächsten Schritt geben.
            Klar, würdig und ohne Druck.
          </Typography>
        </Intro>
      }
    >
      <Grid>
        <Card>
          <Typography as="h2" variant="h2" gutter={false}>
            Einstieg
          </Typography>
          <Typography variant="body" gutter={false}>
            {contactContent.body}
          </Typography>
        </Card>

        <Card>
          <Typography as="h2" variant="h2" gutter={false}>
            Direkter Kontakt
          </Typography>
          <MetaList>
            <MetaRow>
              <MetaLabel>E-Mail</MetaLabel>
              <MetaValue href={`mailto:${contactContent.email}`}>
                {contactContent.email}
              </MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaLabel>Telefon</MetaLabel>
              <MetaValue
                href={`tel:${contactContent.phone.replace(/\s+/g, '')}`}
              >
                {contactContent.phone}
              </MetaValue>
            </MetaRow>
          </MetaList>
        </Card>
      </Grid>
    </PageScaffold>
  )
}

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 60ch;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
`

const MetaList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
`

const MetaRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.4)};
`

const MetaLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.roles.text.subtle};
`

const MetaValue = styled.a`
  width: fit-content;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`
