// src/components/content/PracticeFields.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
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

const DesktopGrid = styled(Grid)`
  align-items: stretch;
`

const MobileSequence = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

const Field = styled.article`
  min-width: 0;
  height: 100%;
`

const FieldSurface = styled(Surface)`
  height: 100%;
`

const Body = styled.div`
  width: min(100%, 38rem);
`

const Marker = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

const MarkerLine = styled.span`
  width: 2rem;
  height: 1px;
  background: ${({ theme }) => theme.roles.border.subtle};
`

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

const PracticeFieldCard = ({
  item,
  movement,
  index,
  mobile = false,
}: {
  item: PracticeFieldItem
  movement: MovementKey
  index: number
  mobile?: boolean
}) => {
  const accent = item.accent ?? 'axisDensity'

  return (
    <FieldSurface
      tone={item.tone ?? 'card'}
      movement={movement}
      radius="large"
      bordered
      padding={mobile ? 'md' : 'lg'}
      weight="steady"
      asset={item.asset}
    >
      <Body>
        <Stack gap={mobile ? 3 : 4}>
          <Marker>
            <Typography
              as="span"
              variant="caption"
              gutter={false}
              accent={accent}
            >
              {String(index + 1).padStart(2, '0')}
            </Typography>

            <MarkerLine />

            <Typography
              as="span"
              variant="caption"
              gutter={false}
              accent={accent}
            >
              {item.label}
            </Typography>
          </Marker>

          <Typography
            as="h3"
            variant="h3"
            gutter={false}
            color="primary"
            measure="full"
          >
            {item.title}
          </Typography>

          <Typography
            as="p"
            variant="body"
            gutter={false}
            tone="soft"
            cadence="open"
          >
            {item.children}
          </Typography>
        </Stack>
      </Body>
    </FieldSurface>
  )
}

const PracticeFields = ({
  items,
  movement,
  mobileAriaLabel,
  footer,
}: Props) => (
  <>
    <Desktop>
      <DesktopGrid columns={2} gap={2} switchAt="md">
        {items.map((item, index) => (
          <Field key={index}>
            <PracticeFieldCard item={item} movement={movement} index={index} />
          </Field>
        ))}
      </DesktopGrid>

      {footer ? <Footer>{footer}</Footer> : null}
    </Desktop>

    <Mobile aria-label={mobileAriaLabel}>
      <MobileSequence>
        {items.map((item, index) => (
          <Field key={index}>
            <PracticeFieldCard
              item={item}
              movement={movement}
              index={index}
              mobile
            />
          </Field>
        ))}
      </MobileSequence>

      {footer ? <Footer>{footer}</Footer> : null}
    </Mobile>
  </>
)

export default PracticeFields
