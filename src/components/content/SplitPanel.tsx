// src/components/content/SplitPanel.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type SplitPanelItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  action?: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Props = {
  primary: SplitPanelItem
  secondary: SplitPanelItem
  movement: MovementKey
}

const PanelContent = styled(Stack)`
  min-height: 100%;
`

const renderPanel = (item: SplitPanelItem, movement: MovementKey) => (
  <Surface
    tone={item.tone ?? 'field'}
    movement={movement}
    radius="large"
    bordered
    padding="lg"
    weight="steady"
    asset={item.asset}
  >
    <PanelContent gap={4}>
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

      {item.action}
    </PanelContent>
  </Surface>
)

const SplitPanel = ({ primary, secondary, movement }: Props) => (
  <Grid columns={2} gap={2} switchAt="md">
    {renderPanel(primary, movement)}
    {renderPanel(secondary, movement)}
  </Grid>
)

export default SplitPanel
