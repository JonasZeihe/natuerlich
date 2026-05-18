// src/components/content/PracticeFields.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import CircularSelector, {
  type CircularSelectorItem,
} from '@/components/controls/CircularSelector'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type PracticeFieldItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Props = {
  items: readonly PracticeFieldItem[]
  movement: MovementKey
  mobileAriaLabel: string
  footer?: ReactNode
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

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

const PracticeFields = ({
  items,
  movement,
  mobileAriaLabel,
  footer,
}: Props) => (
  <>
    <Desktop>
      <Grid columns={2} gap={2} switchAt="md">
        {items.map((item, index) => (
          <Surface
            key={index}
            tone={item.tone ?? 'card'}
            movement={movement}
            radius="large"
            bordered
            padding="lg"
            weight={item.tone === 'deep' ? 'strong' : 'steady'}
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

              <Typography as="p" variant="body" gutter={false}>
                {item.children}
              </Typography>
            </Stack>
          </Surface>
        ))}
      </Grid>

      {footer ? <Footer>{footer}</Footer> : null}
    </Desktop>

    <Mobile>
      <CircularSelector
        items={items as readonly CircularSelectorItem[]}
        movement={movement}
        ariaLabel={mobileAriaLabel}
      />

      {footer ? <Footer>{footer}</Footer> : null}
    </Mobile>
  </>
)

export default PracticeFields
