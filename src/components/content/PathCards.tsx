// src/components/content/PathCards.tsx
'use client'

import { useState, type ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Button from '@/components/actions/Button'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
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
      <Typography as="p" variant="h3">
        {item.individual.format}
      </Typography>

      <Typography as="p" variant="h3">
        {item.individual.price}
      </Typography>
    </PriceLine>

    <SoftText as="p" variant="body">
      {item.individual.text}
    </SoftText>
  </Details>
)

const renderGroup = (item: PathCardItem) => (
  <Details>
    <DetailStack>
      <Typography as="p" variant="h3">
        {item.group.format}
      </Typography>

      {renderMeta(item.group.duration, item.group.price)}

      <SoftText as="p" variant="body">
        {item.group.text}
      </SoftText>
    </DetailStack>

    <CompactStack>
      <Typography as="p" variant="body">
        {item.group.classText}
      </Typography>

      <SoftText as="p" variant="body">
        {item.group.classPrice}
      </SoftText>
    </CompactStack>
  </Details>
)

const renderCompany = (item: PathCardItem) => {
  if (!item.company) return null

  return (
    <Details>
      <Typography as="p" variant="h3">
        {item.company.format}
      </Typography>

      {renderMeta(item.company.duration, item.company.price)}

      <SoftText as="p" variant="body">
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
          <Button
            key={item.key}
            type="button"
            variant={item.key === audience ? 'primary' : 'ghost'}
            size="sm"
            aria-pressed={item.key === audience}
            onClick={() => setAudience(item.key)}
          >
            {item.text}
          </Button>
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
                  <Typography as="h3" variant="h2" measure="title">
                    {item.title}
                  </Typography>

                  <Typography as="p" variant="h3">
                    {item.line}
                  </Typography>

                  <SoftText as="p" variant="body">
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
                    <Typography as="h3" variant="h3">
                      {item.title}
                    </Typography>

                    <Typography as="p" variant="body" tone="strong">
                      {item.line}
                    </Typography>

                    <SoftText as="p" variant="body">
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
  gap: ${({ theme }) => theme.layout.gap.cluster};
  width: 100%;
  min-width: 0;
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(0.5)};
`

const OfferFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.cluster};

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    gap: ${({ theme }) => theme.layout.gap.region};
  }
`

const offerToneCSS = (tone: OfferTone) => css`
  ${({ theme }) => {
    const { palette } = theme

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
  gap: ${({ theme }) => theme.layout.gap.block};
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  ${({ $tone }) => offerToneCSS($tone)}
`

const Head = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
`

const SupplementalFlow = styled.div`
  display: grid;
  min-width: 0;
`

const SupplementalPanel = styled.article<{ $tone: OfferTone }>`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.block};
  padding: ${({ theme }) => theme.layout.surfacePadding.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  ${({ $tone }) => offerToneCSS($tone)}

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: minmax(0, 0.72fr) minmax(18rem, 0.58fr);
    align-items: start;
  }
`

const SupplementalHead = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.gap.text};
`

const Details = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(0.85)};
  padding-top: ${({ theme }) => theme.space(1)};
  border-top: 1px solid var(--offer-divider);
`

const DetailStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(0.55)};
`

const CompactStack = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space(0.35)};
`

const SoftText = styled(Typography)`
  color: var(--offer-soft);
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.space(0.25)} ${({ theme }) => theme.space(0.5)};
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
  gap: ${({ theme }) => theme.space(0.75)};
`

export default PathCards
