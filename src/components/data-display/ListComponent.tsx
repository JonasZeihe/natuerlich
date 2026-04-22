// src/components/data-display/ListComponent.tsx
'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

export type ListItem = {
  id?: string | number
  icon?: ReactNode
  text?: ReactNode
}

export type ListComponentProps = {
  items?: readonly ListItem[]
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  margin: ${({ theme }) => theme.spacing(3)} 0;
  padding: 0;
  list-style: none;
`

const ListItemRow = styled.li`
  display: grid;
  cursor: default;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing(1.2)};
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.roles.surface.panel};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.roles.surface.interactive};
    border-color: ${({ theme }) => theme.getAxisRole('axisFlow').border};
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing(1)};
    gap: ${({ theme }) => theme.spacing(0.8)};
  }
`

const IconWrapper = styled.span`
  font-size: 1.3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.getAxisRole('axisFlow').text};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.roles.text.primary};
  word-break: break-word;
  min-width: 0;

  & strong {
    color: ${({ theme }) => theme.getAxisRole('axisFlow').text};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize.small};
  }
`

export default function ListComponent({ items = [] }: ListComponentProps) {
  if (!Array.isArray(items) || items.length === 0) return null

  return (
    <List>
      {items.map(({ id, icon, text }, index) => (
        <ListItemRow key={id ?? `item-${index}`}>
          <IconWrapper aria-hidden="true">{icon ?? null}</IconWrapper>
          <Content>{text ?? null}</Content>
        </ListItemRow>
      ))}
    </List>
  )
}
