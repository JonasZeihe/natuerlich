// src/components/content/OrientationCards.tsx
'use client'

import { type ReactNode } from 'react'
import styled from 'styled-components'
import ContentRail, { ContentRailItem } from '@/components/content/ContentRail'
import Typography from '@/design/typography'

export type OrientationCardItem = {
  title: ReactNode
  text: ReactNode
}

type Props = {
  items: readonly OrientationCardItem[]
  ariaLabel?: string
}

const OrientationCards = ({ items, ariaLabel }: Props) => (
  <Shell aria-label={ariaLabel}>
    <ContentRail columns={3} min="15rem" align="stretch">
      {items.map((item, index) => (
        <Card key={index}>
          <Typography as="h3" variant="h3" color="primary" cadence="dense">
            {item.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {item.text}
          </Typography>
        </Card>
      ))}
    </ContentRail>
  </Shell>
)

const Shell = styled.div`
  width: 100%;
  max-width: 64rem;
  min-width: 0;
`

const Card = styled(ContentRailItem)`
  align-content: start;
  gap: ${({ theme }) => theme.layout.flow.text};
  padding-top: ${({ theme }) => theme.layout.flow.block};
  border-top: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.practice.border} 46%,
      transparent
    );
`

export default OrientationCards
