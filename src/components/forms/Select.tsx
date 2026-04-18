// src/components/forms/Select.tsx
'use client'

import React, { SelectHTMLAttributes } from 'react'
import styled from 'styled-components'

export type SelectOption<T extends string> = Readonly<{
  value: T
  label: string
  disabled?: boolean
}>

export type SelectProps<T extends string> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
> & {
  id: string
  label?: string
  hint?: string
  value: T
  onChange: (next: T) => void
  options: ReadonlyArray<SelectOption<T>>
}

export default function Select<T extends string>({
  id,
  label,
  hint,
  value,
  onChange,
  options,
  disabled,
  ...rest
}: SelectProps<T>) {
  const hintId = hint ? `${id}__hint` : undefined

  return (
    <Field aria-disabled={disabled ? 'true' : undefined}>
      {label ? (
        <LabelRow>
          <Label htmlFor={id}>{label}</Label>
        </LabelRow>
      ) : null}

      <Control>
        <NativeSelect
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          disabled={disabled}
          aria-describedby={hintId}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </NativeSelect>
        <Chevron aria-hidden="true">▾</Chevron>
      </Control>

      {hint ? (
        <Hint id={hintId} role="note">
          {hint}
        </Hint>
      ) : null}
    </Field>
  )
}

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(1.5)};
  min-width: 0;
`

const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  min-width: 0;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.roles.text.primary};
  min-width: 0;
`

const Control = styled.div`
  position: relative;
  display: grid;
  align-items: center;
`

const NativeSelect = styled.select`
  width: 100%;
  appearance: none;
  background: ${({ theme }) => theme.roles.surface.panel};
  color: ${({ theme }) => theme.roles.text.primary};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) =>
    `${theme.spacingHalf(2.25)} ${theme.spacing(2.25)} ${theme.spacingHalf(2.25)} ${theme.spacing(1)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  line-height: 1.2;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  min-width: 0;

  &:hover {
    background: ${({ theme }) => theme.roles.surface.panelAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Chevron = styled.span`
  position: absolute;
  right: ${({ theme }) => theme.spacing(0.85)};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.roles.text.subtle};
  pointer-events: none;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`

const Hint = styled.div`
  color: ${({ theme }) => theme.roles.text.subtle};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: 1.35;
`
