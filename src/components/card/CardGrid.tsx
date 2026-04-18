// src/components/card/CardGrid.tsx
'use client'

import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled from 'styled-components'
import Grid from '@/components/primitives/Grid'

type GridProps = ComponentPropsWithoutRef<typeof Grid>

type Props = {
  children?: ReactNode
} & GridProps

const Outer = styled.div`
  width: 100%;
`

export default function CardGrid({
  children,
  className,
  columns,
  min,
  gap,
  dense,
  switchAt,
  ...rest
}: Props) {
  return (
    <Outer className={className}>
      <Grid
        columns={columns ?? 'auto'}
        min={min}
        gap={gap ?? 2}
        dense={dense}
        switchAt={switchAt ?? 'md'}
        {...rest}
      >
        {children}
      </Grid>
    </Outer>
  )
}
