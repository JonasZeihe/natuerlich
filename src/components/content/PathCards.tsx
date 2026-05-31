// src/components/content/PathCards.tsx
'use client'

import { useState, type ReactNode } from 'react'
import styled from 'styled-components'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type AudienceKey = 'individual' | 'group' | 'company'

export type IndividualOffer = {
  format: ReactNode
  price: ReactNode
  text: ReactNode
}

export type GroupOffer = {
  format: ReactNode
  duration: ReactNode
  price: ReactNode
  text: ReactNode
  classText: ReactNode
  classPrice: ReactNode
}

export type CompanyOffer = {
  format: ReactNode
  duration: ReactNode
  price: ReactNode
  text: ReactNode
}

export type PathCardItem = {
  title: ReactNode
  line: ReactNode
  text: ReactNode
  individual: IndividualOffer
  group: GroupOffer
  company?: CompanyOffer
}

type Props = {
  items: readonly PathCardItem[]
}

const audienceItems: readonly {
  key: AudienceKey
  text: string
}[] = [
  { key: 'individual', text: 'Einzel' },
  { key: 'group', text: 'Gruppe' },
  { key: 'company', text: 'Unternehmen' },
]

const isSameText = (first: ReactNode, second: ReactNode) =>
  typeof first === 'string' && typeof second === 'string' && first === second

const renderMeta = (first: ReactNode, second: ReactNode) => (
  <Meta>
    <MetaItem>{first}</MetaItem>

    {isSameText(first, second) ? null : (
      <>
        <MetaDivider aria-hidden="true">·</MetaDivider>
        <MetaItem>{second}</MetaItem>
      </>
    )}
  </Meta>
)

const renderIndividual = (item: PathCardItem) => (
  <Details>
    <PriceLine>
      <Typography as="p" variant="subtitle" color="primary">
        {item.individual.format}
      </Typography>

      <Typography as="p" variant="subtitle" color="primary">
        {item.individual.price}
      </Typography>
    </PriceLine>

    <Typography as="p" variant="body" tone="soft" cadence="open">
      {item.individual.text}
    </Typography>
  </Details>
)

const renderGroup = (item: PathCardItem) => (
  <Details>
    <Stack gap={0.55}>
      <Typography as="p" variant="subtitle" color="primary">
        {item.group.format}
      </Typography>

      {renderMeta(item.group.duration, item.group.price)}

      <Typography as="p" variant="body" tone="soft" cadence="open">
        {item.group.text}
      </Typography>
    </Stack>

    <Stack gap={0.35}>
      <Typography as="p" variant="body" color="primary">
        {item.group.classText}
      </Typography>

      <Typography as="p" variant="body" tone="soft">
        {item.group.classPrice}
      </Typography>
    </Stack>
  </Details>
)

const renderCompany = (item: PathCardItem) => {
  if (!item.company) return null

  return (
    <Details>
      <Typography as="p" variant="subtitle" color="primary">
        {item.company.format}
      </Typography>

      {renderMeta(item.company.duration, item.company.price)}

      <Typography as="p" variant="body" tone="soft" cadence="open">
        {item.company.text}
      </Typography>
    </Details>
  )
}

const renderDetails = (item: PathCardItem, audience: AudienceKey) => {
  if (audience === 'individual') return renderIndividual(item)
  if (audience === 'company') return renderCompany(item)
  return renderGroup(item)
}

const PathCards = ({ items }: Props) => {
  const [audience, setAudience] = useState<AudienceKey>('group')
  const visibleItems =
    audience === 'company' ? items.filter((item) => item.company) : items
  const primaryItems = visibleItems.slice(0, 4)
  const supplementalItems = visibleItems.slice(4)

  return (
    <Shell>
      <Tabs aria-label="Angebotsrahmen">
        {audienceItems.map((item) => (
          <Tab
            key={item.key}
            type="button"
            $active={item.key === audience}
            aria-pressed={item.key === audience}
            onClick={() => setAudience(item.key)}
          >
            {item.text}
          </Tab>
        ))}
      </Tabs>

      <OfferFlow key={audience}>
        <ContentRail
          columns="auto"
          min="20rem"
          gap={1.15}
          itemWidth="min(88vw, 27rem)"
          variant="cards"
        >
          {primaryItems.map((item, index) => (
            <OfferCard key={index} mode="card">
              <Head>
                <Typography
                  as="h3"
                  variant="h2"
                  color="primary"
                  cadence="dense"
                >
                  {item.title}
                </Typography>

                <Typography as="p" variant="subtitle" color="primary">
                  {item.line}
                </Typography>

                <Typography as="p" variant="body" tone="soft" cadence="open">
                  {item.text}
                </Typography>
              </Head>

              {renderDetails(item, audience)}
            </OfferCard>
          ))}
        </ContentRail>

        {supplementalItems.length ? (
          <SupplementalFlow>
            {supplementalItems.map((item, index) => (
              <SupplementalPanel key={index}>
                <SupplementalHead>
                  <Typography
                    as="h3"
                    variant="h3"
                    color="primary"
                    cadence="dense"
                  >
                    {item.title}
                  </Typography>

                  <Typography as="p" variant="subtitle" color="primary">
                    {item.line}
                  </Typography>

                  <Typography as="p" variant="body" tone="soft" cadence="open">
                    {item.text}
                  </Typography>
                </SupplementalHead>

                {renderDetails(item, audience)}
              </SupplementalPanel>
            ))}
          </SupplementalFlow>
        ) : null}
      </OfferFlow>
    </Shell>
  )
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const Tab = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.roles.text.primary : theme.roles.surface.quiet};
  color: ${({ theme, $active }) =>
    $active ? theme.roles.surface.chrome : theme.roles.text.primary};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(1)}`};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
  }
`

const OfferFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing(1.35)};
  }
`

const OfferCard = styled(ContentRailItem)`
  gap: ${({ theme }) => theme.spacing(1.15)};
  padding: ${({ theme }) => theme.spacing(1.55)};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing(1.5)};
  }
`

const Head = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.65)};
`

const SupplementalFlow = styled.div`
  display: grid;
  width: min(100%, 64rem);
  margin-inline: auto;
`

const SupplementalPanel = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.05)};
  padding: ${({ theme }) => theme.spacing(1.45)};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.quiet} 72%,
    transparent
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 0.72fr) minmax(18rem, 0.58fr);
    align-items: start;
    padding: ${({ theme }) => theme.spacing(1.5)};
  }
`

const SupplementalHead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.65)};
`

const Details = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  padding-top: ${({ theme }) => theme.spacing(0.95)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.5)};
`

const MetaItem = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.roles.text.subtle};
`

const MetaDivider = styled.span`
  color: ${({ theme }) => theme.roles.text.subtle};
`

const PriceLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

export default PathCards
