// src/components/actions/ButtonGrid.tsx
'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.1)};
  width: 100%;

  > * {
    flex: 0 0 auto;
    max-width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing(1.35)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing(0.95)};
  }
`

export default function ButtonGrid({ children, ...rest }: Props) {
  return <Wrapper {...rest}>{children}</Wrapper>
}
