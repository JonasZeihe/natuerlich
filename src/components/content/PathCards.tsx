'use client'

import { useState, type ReactNode } from 'react'
import styled from 'styled-components'
import Card from '@/components/primitives/Card'
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
  label: string
}[] = [
  { key: 'individual', label: 'Einzel' },
  { key: 'group', label: 'Gruppe' },
  { key: 'company', label: 'Firma' },
]

const Wrap = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Tabs = styled.div`
  position: sticky;
  top: ${({ theme }) => theme.spacing(1)};
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(0.35)};
  padding: ${({ theme }) => theme.spacing(0.35)};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.surface.card};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    width: min(100%, 26rem);
  }
`

const Tab = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.roles.text.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.roles.surface.chrome : theme.roles.text.primary};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(1)}`};
  font: inherit;
  cursor: pointer;
`

const List = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-inline: ${({ theme }) => `-${theme.spacing(1)}`};
  padding-inline: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(0.25)};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }
`

const Item = styled.div`
  flex: 0 0 min(86vw, 24rem);
  scroll-snap-align: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-basis: auto;
  }
`

const Body = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.35)};
`

const Head = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.4)};
`

const Panel = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding-top: ${({ theme }) => theme.spacing(1)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(1)};
`

const GroupFlow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.9)};
`

const Step = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.35)};
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

const Pill = styled.div`
  display: inline-flex;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => `${theme.spacing(0.3)} ${theme.spacing(0.7)}`};
`

const IndividualCard = ({ item }: { item: PathCardItem }) => (
  <Item>
    <Card
      tone="card"
      movement="integration"
      radius="large"
      bordered
      padding="md"
    >
      <Body>
        <Head>
          <Typography as="h3" variant="h3" gutter={false}>
            {item.title}
          </Typography>

          <Typography as="p" variant="subtitle" gutter={false}>
            {item.line}
          </Typography>
        </Head>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          {item.text}
        </Typography>

        <Panel>
          <Row>
            <Typography as="p" variant="caption" gutter={false}>
              {item.individual.format}
            </Typography>

            <Typography as="p" variant="subtitle" gutter={false}>
              {item.individual.price}
            </Typography>
          </Row>

          <Typography as="p" variant="body" gutter={false} tone="soft">
            {item.individual.text}
          </Typography>
        </Panel>
      </Body>
    </Card>
  </Item>
)

const GroupCard = ({ item }: { item: PathCardItem }) => (
  <Item>
    <Card
      tone="card"
      movement="integration"
      radius="large"
      bordered
      padding="md"
    >
      <Body>
        <Head>
          <Typography as="h3" variant="h3" gutter={false}>
            {item.title}
          </Typography>

          <Typography as="p" variant="subtitle" gutter={false}>
            {item.line}
          </Typography>
        </Head>

        <Typography as="p" variant="body" gutter={false} tone="soft">
          {item.text}
        </Typography>

        <GroupFlow>
          <Step>
            <Typography as="p" variant="caption" gutter={false}>
              Kurs
            </Typography>

            <Typography as="p" variant="subtitle" gutter={false}>
              {item.group.format}
            </Typography>

            <Meta>
              <Pill>
                <Typography as="span" variant="caption" gutter={false}>
                  {item.group.duration}
                </Typography>
              </Pill>

              <Pill>
                <Typography as="span" variant="caption" gutter={false}>
                  {item.group.price}
                </Typography>
              </Pill>
            </Meta>

            <Typography as="p" variant="body" gutter={false}>
              {item.group.text}
            </Typography>
          </Step>

          <Step>
            <Typography as="p" variant="caption" gutter={false}>
              Danach
            </Typography>

            <Typography as="p" variant="body" gutter={false}>
              {item.group.classText}
            </Typography>

            <Typography as="p" variant="caption" gutter={false}>
              {item.group.classPrice}
            </Typography>
          </Step>
        </GroupFlow>
      </Body>
    </Card>
  </Item>
)

const CompanyCard = ({ item }: { item: PathCardItem }) => {
  if (!item.company) {
    return null
  }

  return (
    <Item>
      <Card
        tone="card"
        movement="integration"
        radius="large"
        bordered
        padding="md"
      >
        <Body>
          <Head>
            <Typography as="h3" variant="h3" gutter={false}>
              {item.title}
            </Typography>

            <Typography as="p" variant="subtitle" gutter={false}>
              {item.line}
            </Typography>
          </Head>

          <Typography as="p" variant="body" gutter={false} tone="soft">
            {item.text}
          </Typography>

          <Panel>
            <Typography as="p" variant="subtitle" gutter={false}>
              {item.company.format}
            </Typography>

            <Meta>
              <Pill>
                <Typography as="span" variant="caption" gutter={false}>
                  {item.company.duration}
                </Typography>
              </Pill>

              <Pill>
                <Typography as="span" variant="caption" gutter={false}>
                  {item.company.price}
                </Typography>
              </Pill>
            </Meta>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              {item.company.text}
            </Typography>
          </Panel>
        </Body>
      </Card>
    </Item>
  )
}

const PathCards = ({ items }: Props) => {
  const [audience, setAudience] = useState<AudienceKey>('group')

  const visibleItems =
    audience === 'company' ? items.filter((item) => item.company) : items

  return (
    <Wrap>
      <Tabs aria-label="Angebotsrahmen">
        {audienceItems.map((item) => (
          <Tab
            key={item.key}
            type="button"
            $active={item.key === audience}
            onClick={() => setAudience(item.key)}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>

      <List>
        {visibleItems.map((item, index) => {
          if (audience === 'individual') {
            return <IndividualCard key={index} item={item} />
          }

          if (audience === 'company') {
            return <CompanyCard key={index} item={item} />
          }

          return <GroupCard key={index} item={item} />
        })}
      </List>
    </Wrap>
  )
}

export default PathCards
