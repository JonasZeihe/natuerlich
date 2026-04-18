'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Typography from '@/design/typography'
import { contactContent } from '@/features/common/content/siteContent'

export default function HomeContactSection() {
  return (
    <Section>
      <Typography as="h2" variant="h2" gutter={false}>
        {contactContent.title}
      </Typography>

      <Typography variant="body" gutter={false}>
        {contactContent.body}
      </Typography>

      <ContactGrid>
        <ContactCard>
          <Label>E-Mail</Label>
          <Value href={`mailto:${contactContent.email}`}>
            {contactContent.email}
          </Value>
        </ContactCard>

        <ContactCard>
          <Label>Telefon</Label>
          <Value href={`tel:${contactContent.phone.replace(/\s+/g, '')}`}>
            {contactContent.phone}
          </Value>
        </ContactCard>

        <ActionCard href="/kontakt">Zum Kontaktbereich</ActionCard>
      </ContactGrid>
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.getAxisRole('axisResonance').surface} 0%,
    ${({ theme }) => theme.roles.surface.panel} 100%
  );
  border: 1px solid ${({ theme }) => theme.getAxisRole('axisResonance').border};
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const ContactCard = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.5)};
  padding: ${({ theme }) => theme.spacing(1.1)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.chrome};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.roles.text.subtle};
`

const Value = styled.a`
  width: fit-content;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const ActionCard = styled(Link)`
  display: grid;
  place-items: center;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing(1.1)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.chrome};
  border: 1px solid ${({ theme }) => theme.getAxisRole('axisClarity').border};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`
