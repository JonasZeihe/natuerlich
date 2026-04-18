'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Typography from '@/design/typography'
import { transparencyHighlights } from '@/features/common/content/siteContent'

export default function HomeTransparencySection() {
  return (
    <Section>
      <Heading>
        <Typography as="h2" variant="h2" gutter={false}>
          Transparenz ist hier kein Anhang.
        </Typography>
        <Typography variant="body" gutter={false}>
          Wer ist Jonas? Was ist möglich? Wie sieht ein Einstieg aus? Was kostet
          es? Diese Fragen gehören nicht in den Nebel.
        </Typography>
      </Heading>

      <List>
        {transparencyHighlights.map((item) => (
          <ListItem key={item}>
            <Marker aria-hidden="true" />
            <Typography variant="body" gutter={false}>
              {item}
            </Typography>
          </ListItem>
        ))}
      </List>

      <MoreLink href="/faq">Zu FAQ, Rahmen und Einstieg</MoreLink>
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
`

const Heading = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  max-width: 62ch;
`

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.7)};
  list-style: none;
`

const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing(0.75)};
  align-items: start;
`

const Marker = styled.span`
  width: 0.7rem;
  height: 0.7rem;
  margin-top: 0.45rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.getAxisRole('axisEnergy').fill};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
`

const MoreLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`
