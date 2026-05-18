// src/components/content/ProofGrid.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type ProofGridItem = {
  label: ReactNode
  title?: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
  media?: boolean
}

type Props = {
  items: readonly ProofGridItem[]
  movement: MovementKey
}

const MediaFrame = styled.div<{ $movement: MovementKey }>`
  min-height: 18rem;
  border: 1px dashed
    ${({ theme, $movement }) => theme.getMovementRole($movement).border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme, $movement }) =>
    theme.getMovementRole($movement).quiet};
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing(1.05)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 14rem;
  }
`

const ProofGrid = ({ items, movement }: Props) => (
  <Grid columns={2} gap={2} switchAt="md">
    {items.map((item, index) => (
      <Surface
        key={index}
        tone={item.tone ?? 'card'}
        movement={movement}
        radius="large"
        bordered
        padding={item.media ? 'sm' : 'lg'}
        weight={item.tone === 'threshold' ? 'strong' : 'steady'}
        asset={item.asset}
      >
        {item.media ? (
          <MediaFrame $movement={movement}>
            <Typography
              as="p"
              variant="body"
              gutter={false}
              accent={item.accent ?? 'axisDensity'}
              measure="prose"
            >
              {item.children}
            </Typography>
          </MediaFrame>
        ) : (
          <Stack gap={4}>
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent={item.accent ?? 'axisDensity'}
            >
              {item.label}
            </Typography>

            {item.title ? (
              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent={item.accent ?? 'axisDensity'}
              >
                {item.title}
              </Typography>
            ) : null}

            <Typography as="p" variant="body" gutter={false}>
              {item.children}
            </Typography>
          </Stack>
        )}
      </Surface>
    ))}
  </Grid>
)

export default ProofGrid
