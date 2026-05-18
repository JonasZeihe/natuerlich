// src/components/content/PathCards.tsx
'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Card from '@/components/primitives/Card'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type PathCardFact = {
  label: ReactNode
  value: ReactNode
}

export type PathCardDetail = {
  title: ReactNode
  text: ReactNode
  facts?: readonly PathCardFact[]
}

export type PathCardItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
  details?: readonly PathCardDetail[]
}

type Props = {
  items: readonly PathCardItem[]
  movement: MovementKey
  mobileAriaLabel: string
  columns?: number
}

const Desktop = styled.div`
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const Mobile = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const MobileTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: ${({ theme }) => theme.spacing(0.25)};
  padding: ${({ theme }) =>
    `${theme.spacing(0.25)} ${theme.spacing(0.25)} ${theme.spacing(1)}`};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MobileSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: start;
`

const Progress = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  margin-top: ${({ theme }) => theme.spacing(0.75)};
`

const ProgressDot = styled.span<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '1.35rem' : '0.45rem')};
  height: 0.45rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.roles.text.primary : theme.roles.border.subtle};
`

const DetailList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const DetailItem = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.75)};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  border-top: 1px solid ${({ theme }) => theme.roles.border.subtle};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }
`

const FactList = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.spacing(0.5)};
  margin: 0;
  padding: 0;
  list-style: none;
`

const FactLine = styled.li`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

const renderDetails = (
  details: readonly PathCardDetail[] | undefined,
  accent: AxisKey
) =>
  details?.length ? (
    <DetailList>
      {details.map((detail, index) => (
        <DetailItem key={index}>
          <Stack gap={1}>
            <Typography
              as="h4"
              variant="subtitle"
              gutter={false}
              accent={accent}
            >
              {detail.title}
            </Typography>

            <Typography as="p" variant="body" gutter={false} tone="soft">
              {detail.text}
            </Typography>
          </Stack>

          {detail.facts?.length ? (
            <FactList>
              {detail.facts.map((fact, factIndex) => (
                <FactLine key={factIndex}>
                  <Typography as="span" variant="caption" gutter={false}>
                    {fact.label}
                  </Typography>

                  <Typography
                    as="span"
                    variant="caption"
                    gutter={false}
                    accent={accent}
                  >
                    {fact.value}
                  </Typography>
                </FactLine>
              ))}
            </FactList>
          ) : null}
        </DetailItem>
      ))}
    </DetailList>
  ) : null

const PathCard = ({
  item,
  movement,
}: {
  item: PathCardItem
  movement: MovementKey
}) => {
  const accent = item.accent ?? 'axisDensity'

  return (
    <Card
      tone={item.tone ?? 'card'}
      movement={movement}
      radius="large"
      bordered
      padding="md"
      asset={item.asset}
    >
      <Stack gap={4}>
        <Typography as="p" variant="caption" gutter={false} accent={accent}>
          {item.label}
        </Typography>

        <Typography as="h3" variant="h3" gutter={false} accent={accent}>
          {item.title}
        </Typography>

        <Typography as="p" variant="body" gutter={false} measure="prose">
          {item.children}
        </Typography>

        {renderDetails(item.details, accent)}
      </Stack>
    </Card>
  )
}

const PathCards = ({
  items,
  movement,
  mobileAriaLabel,
  columns = Math.min(items.length, 4),
}: Props) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current

    if (!track) return

    const width = track.clientWidth

    if (!width) return

    setActiveIndex(
      Math.max(
        0,
        Math.min(items.length - 1, Math.round(track.scrollLeft / width))
      )
    )
  }, [items.length])

  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      syncActiveIndex()
    })
  }, [syncActiveIndex])

  useEffect(
    () => () => {
      if (frameRef.current === null) return

      window.cancelAnimationFrame(frameRef.current)
    },
    []
  )

  return (
    <>
      <Desktop>
        <Grid columns={columns} min="15rem" gap={2} switchAt="lg">
          {items.map((item, index) => (
            <PathCard key={index} item={item} movement={movement} />
          ))}
        </Grid>
      </Desktop>

      <Mobile>
        <MobileTrack
          ref={trackRef}
          aria-label={mobileAriaLabel}
          role="list"
          onScroll={handleScroll}
        >
          {items.map((item, index) => (
            <MobileSlide key={index} role="listitem">
              <PathCard item={item} movement={movement} />
            </MobileSlide>
          ))}
        </MobileTrack>

        <Progress aria-hidden="true">
          {items.map((_, index) => (
            <ProgressDot key={index} $active={index === activeIndex} />
          ))}
        </Progress>
      </Mobile>
    </>
  )
}

export default PathCards
