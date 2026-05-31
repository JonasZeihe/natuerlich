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
    <ContentRail
      columns={3}
      min="15rem"
      gap={1}
      itemWidth="min(78vw, 21rem)"
      max="64rem"
      align="start"
    >
      {items.map((item, index) => (
        <ContentRailItem key={index} mode="line" stretch={false}>
          <Typography as="h3" variant="h3" color="primary" cadence="dense">
            {item.title}
          </Typography>

          <Typography as="p" variant="body" tone="soft" cadence="open">
            {item.text}
          </Typography>
        </ContentRailItem>
      ))}
    </ContentRail>
  </Shell>
)

const Shell = styled.div`
  width: 100%;
`

export default OrientationCards
