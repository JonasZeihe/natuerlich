'use client'

import styled from 'styled-components'
import Callout from '@/components/feedback/Callout'
import Typography from '@/design/typography'
import PageScaffold from '@/features/common/components/PageScaffold'
import { teacherProfile } from '@/features/common/content/siteContent'

export default function JonasPage() {
  return (
    <PageScaffold
      intro={
        <Intro>
          <Typography as="h1" variant="h1" gutter={false}>
            Jonas
          </Typography>
          <Typography variant="body" gutter={false}>
            Nicht als Marke. Nicht als Guru. Sondern als Lehrer, dessen Arbeit
            aus Reibung, Anspruch, Freude und echter Praxisfähigkeit kommt.
          </Typography>
        </Intro>
      }
    >
      <Layout>
        <MainCard>
          <Typography as="h2" variant="h2" gutter={false}>
            {teacherProfile.title}
          </Typography>

          <Paragraphs>
            {teacherProfile.body.map((paragraph) => (
              <Typography key={paragraph} variant="body" gutter={false}>
                {paragraph}
              </Typography>
            ))}
          </Paragraphs>
        </MainCard>

        <Aside>
          <Callout title="Wichtiger Unterschied" tone="neutral">
            Diese Seite soll keine perfekte Geschichte erzählen. Sie soll lesbar
            machen, warum diese Arbeit tragen kann.
          </Callout>

          <Callout title="Was hier bewusst fehlt" tone="warning">
            Keine Wellnessrolle. Keine Heilsfigur. Keine weichgezeichnete
            Authentizität.
          </Callout>
        </Aside>
      </Layout>
    </PageScaffold>
  )
}

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 62ch;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
  gap: ${({ theme }) => theme.spacing(1.25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const MainCard = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
`

const Paragraphs = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
`

const Aside = styled.aside`
  display: grid;
  align-content: start;
  gap: ${({ theme }) => theme.spacing(0.9)};
`
