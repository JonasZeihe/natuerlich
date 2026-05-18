// src/components/content/PathCards.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import CircularSelector, {
  type CircularSelectorItem,
} from '@/components/controls/CircularSelector'
import Card from '@/components/primitives/Card'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type PathCardItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Props = {
  items: readonly PathCardItem[]
  movement: MovementKey
  mobileAriaLabel: string
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

const PathCards = ({ items, movement, mobileAriaLabel }: Props) => (
  <>
    <Desktop>
      <Grid columns={4} min="15rem" gap={2} switchAt="lg">
        {items.map((item, index) => (
          <Card
            key={index}
            tone={item.tone ?? 'card'}
            movement={movement}
            radius="large"
            bordered
            padding="md"
            asset={item.asset}
          >
            <Stack gap={4}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent={item.accent ?? 'axisDensity'}
              >
                {item.label}
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent={item.accent ?? 'axisDensity'}
              >
                {item.title}
              </Typography>

              <Typography as="p" variant="body" gutter={false} measure="prose">
                {item.children}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Grid>
    </Desktop>

    <Mobile>
      <CircularSelector
        items={items as readonly CircularSelectorItem[]}
        movement={movement}
        ariaLabel={mobileAriaLabel}
      />
    </Mobile>
  </>
)

export default PathCards
