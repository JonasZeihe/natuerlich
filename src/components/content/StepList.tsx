// src/components/content/StepList.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type StepListItem = {
  label?: ReactNode
  title?: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  bordered?: boolean
  asset?: AssetConsumerSpec | null
}

type Props = {
  items: readonly StepListItem[]
  movement: MovementKey
}

const Shell = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.1)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 0.86fr 1.14fr 0.86fr;
    align-items: end;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing(0.85)};
  }
`

const StepList = ({ items, movement }: Props) => (
  <Shell>
    {items.map((item, index) => (
      <Surface
        key={index}
        tone={item.tone ?? (index === 1 ? 'field' : 'quiet')}
        movement={movement}
        radius="large"
        bordered={item.bordered ?? false}
        padding={index === 1 ? 'lg' : 'md'}
        asset={item.asset}
      >
        <Stack gap={1}>
          {item.title ? (
            <Typography as="h3" variant="h3" color="primary">
              {item.title}
            </Typography>
          ) : null}

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {item.children}
          </Typography>
        </Stack>
      </Surface>
    ))}
  </Shell>
)

export default StepList
