// src/components/content/ContactPanel.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Grid from '@/components/primitives/Grid'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'

export type ContactPanelItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Props = {
  items: readonly ContactPanelItem[]
  footerLabel?: ReactNode
  footer: ReactNode
  footerAccent?: AxisKey
  movement: MovementKey
  footerAsset?: AssetConsumerSpec | null
}

const Shell = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(0.5)};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.roles.surface.quiet};
  }
`

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

const ContactPanel = ({
  items,
  footerLabel,
  footer,
  footerAccent = 'axisDensity',
  movement,
  footerAsset,
}: Props) => (
  <Shell>
    <Grid columns={2} gap={2} switchAt="md">
      {items.map((item, index) => (
        <Surface
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

            <Typography as="p" variant="body" gutter={false}>
              {item.children}
            </Typography>
          </Stack>
        </Surface>
      ))}
    </Grid>

    <Footer>
      <Surface
        tone="field"
        movement={movement}
        radius="large"
        bordered
        padding="md"
        weight="steady"
        asset={footerAsset}
      >
        <Stack gap={4}>
          {footerLabel ? (
            <Typography
              as="p"
              variant="caption"
              gutter={false}
              accent={footerAccent}
            >
              {footerLabel}
            </Typography>
          ) : null}

          <Typography as="p" variant="body" gutter={false} measure="prose">
            {footer}
          </Typography>
        </Stack>
      </Surface>
    </Footer>
  </Shell>
)

export default ContactPanel
