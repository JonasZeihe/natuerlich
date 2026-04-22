// src/components/forms/Checkbox.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type Props = {
  id: string
  checked: boolean
  onCheckedChange: (next: boolean) => void
  disabled?: boolean
  describedById?: string
}

export default function Checkbox({
  id,
  checked,
  onCheckedChange,
  disabled,
  describedById,
}: Props) {
  return (
    <Control
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      aria-describedby={describedById}
      onChange={(e) => onCheckedChange(e.currentTarget.checked)}
    />
  )
}

const Control = styled.input`
  appearance: none;
  width: 1.05rem;
  height: 1.05rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
  display: inline-grid;
  place-items: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background-color 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease,
    transform 0.06s ease;

  &::after {
    content: '';
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 0.18rem;
    transform: scale(0);
    transition: transform 0.12s ease;
    background: ${({ theme }) => theme.getAxisRole('axisDensity').fill};
  }

  &:checked {
    border-color: ${({ theme }) => theme.getAxisRole('axisDensity').border};
    background: ${({ theme }) => theme.getAxisRole('axisDensity').surface};
  }

  &:checked::after {
    transform: scale(1);
  }

  &:hover {
    background: ${({ theme }) => theme.roles.surface.interactive};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
