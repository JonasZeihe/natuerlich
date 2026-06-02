// src/components/content/PathCards.tsx
'use client'

import { useState, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type AudienceKey = 'individual' | 'group' | 'company'
type OfferTone = 'foundation' | 'qigong' | 'yoga' | 'taiji' | 'special'

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
  tone?: OfferTone
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

const inferOfferTone = (title: ReactNode): OfferTone => {
  const label = String(title)

  if (label.includes('Qigong')) return 'qigong'
  if (label.includes('Yoga')) return 'yoga'
  if (label.includes('Taijiquan')) return 'taiji'
  if (label.includes('Besondere')) return 'special'
  return 'foundation'
}

const getOfferTone = (item: PathCardItem): OfferTone =>
  item.tone ?? inferOfferTone(item.title)

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
      <Typography as="p" variant="subtitle">
        {item.individual.format}
      </Typography>

      <Typography as="p" variant="subtitle">
        {item.individual.price}
      </Typography>
    </PriceLine>

    <SoftText as="p" variant="body" cadence="open">
      {item.individual.text}
    </SoftText>
  </Details>
)

const renderGroup = (item: PathCardItem) => (
  <Details>
    <Stack gap={0.55}>
      <Typography as="p" variant="subtitle">
        {item.group.format}
      </Typography>

      {renderMeta(item.group.duration, item.group.price)}

      <SoftText as="p" variant="body" cadence="open">
        {item.group.text}
      </SoftText>
    </Stack>

    <Stack gap={0.35}>
      <Typography as="p" variant="body">
        {item.group.classText}
      </Typography>

      <SoftText as="p" variant="body">
        {item.group.classPrice}
      </SoftText>
    </Stack>
  </Details>
)

const renderCompany = (item: PathCardItem) => {
  if (!item.company) return null

  return (
    <Details>
      <Typography as="p" variant="subtitle">
        {item.company.format}
      </Typography>

      {renderMeta(item.company.duration, item.company.price)}

      <SoftText as="p" variant="body" cadence="open">
        {item.company.text}
      </SoftText>
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
          min="18rem"
          gap="clamp(0.9rem, 1.45vw, 1.45rem)"
          itemWidth="min(82vw, 25rem)"
          variant="cards"
          align="stretch"
        >
          {primaryItems.map((item, index) => {
            const tone = getOfferTone(item)

            return (
              <OfferCard key={index} $tone={tone}>
                <Head>
                  <Typography as="h3" variant="h2" cadence="dense">
                    {item.title}
                  </Typography>

                  <Typography as="p" variant="subtitle">
                    {item.line}
                  </Typography>

                  <SoftText as="p" variant="body" cadence="open">
                    {item.text}
                  </SoftText>
                </Head>

                {renderDetails(item, audience)}
              </OfferCard>
            )
          })}
        </ContentRail>

        {supplementalItems.length ? (
          <SupplementalFlow>
            {supplementalItems.map((item, index) => {
              const tone = getOfferTone(item)

              return (
                <SupplementalPanel key={index} $tone={tone}>
                  <SupplementalHead>
                    <Typography as="h3" variant="h3" cadence="dense">
                      {item.title}
                    </Typography>

                    <Typography as="p" variant="subtitle">
                      {item.line}
                    </Typography>

                    <SoftText as="p" variant="body" cadence="open">
                      {item.text}
                    </SoftText>
                  </SupplementalHead>

                  {renderDetails(item, audience)}
                </SupplementalPanel>
              )
            })}
          </SupplementalFlow>
        ) : null}
      </OfferFlow>
    </Shell>
  )
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};
  width: 100%;
  min-width: 0;
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
    $active
      ? theme.foundations.palette.mossDeep
      : `color-mix(in srgb, ${theme.foundations.palette.morningLight} 82%, white)`};
  color: ${({ theme, $active }) =>
    $active
      ? theme.foundations.palette.ivory
      : theme.foundations.palette.mossDeep};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(1)}`};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.border.focus};
    outline-offset: 3px;
  }
`

const OfferFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.layout.flow.region};
  }
`

const offerToneCSS = (tone: OfferTone) => css`
  ${({ theme }) => {
    const { palette } = theme.foundations

    const map = {
      foundation: {
        background: 'color-mix(in srgb, #FFF4E3 72%, white)',
        text: null,
        soft: palette.inkSoft,
        divider: 'color-mix(in srgb, #B87336 18%, transparent)',
      },
      qigong: {
        background: palette.blueLight,
        text: null,
        soft: palette.inkSoft,
        divider: 'color-mix(in srgb, #315D70 22%, transparent)',
      },
      yoga: {
        background: palette.sandLight,
        text: null,
        soft: palette.inkSoft,
        divider: 'color-mix(in srgb, #755537 20%, transparent)',
      },
      taiji: {
        background: palette.blueDeep,
        text: palette.ivory,
        soft: 'color-mix(in srgb, #F8F1E5 82%, transparent)',
        divider: 'color-mix(in srgb, #F8F1E5 18%, transparent)',
      },
      special: {
        background: 'color-mix(in srgb, #F2EFE6 74%, white)',
        text: null,
        soft: palette.inkSoft,
        divider: 'color-mix(in srgb, #8D8B84 18%, transparent)',
      },
    } satisfies Record<
      OfferTone,
      {
        background: string
        text: string | null
        soft: string
        divider: string
      }
    >

    const colors = map[tone]

    return css`
      --offer-soft: ${colors.soft};
      --offer-divider: ${colors.divider};

      background: ${colors.background};
      ${colors.text
        ? css`
            color: ${colors.text};
          `
        : ''}
    `
  }}
`

const OfferCard = styled(ContentRailItem)<{ $tone: OfferTone }>`
  gap: ${({ theme }) => theme.layout.flow.block};
  padding: ${({ theme }) => theme.layout.surface.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  ${({ $tone }) => offerToneCSS($tone)}
`

const Head = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const SupplementalFlow = styled.div`
  display: grid;
  min-width: 0;
`

const SupplementalPanel = styled.article<{ $tone: OfferTone }>`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.block};
  padding: ${({ theme }) => theme.layout.surface.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  ${({ $tone }) => offerToneCSS($tone)}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 0.72fr) minmax(18rem, 0.58fr);
    align-items: start;
  }
`

const SupplementalHead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const Details = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.85)};
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid var(--offer-divider);
`

const SoftText = styled(Typography)`
  color: var(--offer-soft);
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(0.25)}
    ${({ theme }) => theme.spacing(0.5)};
  color: var(--offer-soft);
`

const MetaItem = styled.span`
  display: inline-flex;
`

const MetaDivider = styled.span``

const PriceLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

export default PathCards
