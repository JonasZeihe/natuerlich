'use client'

import styled from 'styled-components'
import Typography from '@/design/typography'
import PageScaffold from '@/features/common/components/PageScaffold'
import { faqItems } from '@/features/common/content/siteContent'

export default function FaqPage() {
  return (
    <PageScaffold
      intro={
        <Intro>
          <Typography as="h1" variant="h1" gutter={false}>
            FAQ / Rahmen / Einstieg
          </Typography>
          <Typography variant="body" gutter={false}>
            Transparenz ist Teil der Ernsthaftigkeit. Was für eine echte
            Entscheidung nötig ist, soll lesbar sein.
          </Typography>
        </Intro>
      }
    >
      <FaqList>
        {faqItems.map((item) => (
          <FaqCard key={item.question}>
            <Typography
              as="h2"
              variant="h3"
              accent="axisClarity"
              gutter={false}
            >
              {item.question}
            </Typography>
            <Typography variant="body" gutter={false}>
              {item.answer}
            </Typography>
          </FaqCard>
        ))}
      </FaqList>
    </PageScaffold>
  )
}

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.8)};
  max-width: 62ch;
`

const FaqList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const FaqCard = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.7)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
`
