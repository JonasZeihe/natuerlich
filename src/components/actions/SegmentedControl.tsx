// src/components/actions/SegmentedControl.tsx
'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import Surface from '@/components/primitives/Surface'
import Button from '@/components/actions/Button'

export type SegmentedOptionId = string

export type SegmentedOption<T extends string = string> = {
  id: T
  label: string
  disabled?: boolean
}

type Props<T extends string = string> = {
  ariaLabel: string
  value: T
  options: readonly SegmentedOption<T>[]
  onChange: (next: T) => void
  disabled?: boolean
  variant?: 'default' | 'compact'
}

const isArrowKey = (key: string) =>
  key === 'ArrowLeft' ||
  key === 'ArrowRight' ||
  key === 'ArrowUp' ||
  key === 'ArrowDown'

export default function SegmentedControl<T extends string = string>({
  ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
  variant = 'default',
}: Props<T>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const enabled = useMemo(
    () => options.filter((o) => !(disabled || o.disabled)),
    [options, disabled]
  )

  useEffect(() => {
    if (disabled) return
    if (!options.length) return
    const active = refs.current[String(value)]
    if (active) return
    const fallback = enabled[0]?.id
    if (fallback) onChange(fallback)
  }, [disabled, options.length, value, enabled, onChange])

  const move = (dir: 1 | -1) => {
    if (disabled) return
    if (!enabled.length) return
    const idx = enabled.findIndex((o) => o.id === value)
    const next =
      idx === -1
        ? enabled[0]
        : enabled[(idx + dir + enabled.length) % enabled.length]
    onChange(next.id)
    refs.current[String(next.id)]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (!isArrowKey(e.key)) return
    e.preventDefault()
    const dir = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1
    move(dir)
  }

  return (
    <Root
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : undefined}
      tone="elevated"
      radius="pill"
      bordered
      padding="none"
    >
      {options.map((o) => {
        const active = o.id === value
        const isDisabled = disabled || Boolean(o.disabled)

        return (
          <Item
            key={String(o.id)}
            ref={(el) => {
              refs.current[String(o.id)] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-disabled={isDisabled ? 'true' : undefined}
            tabIndex={active && !isDisabled ? 0 : -1}
            disabled={isDisabled}
            $active={active}
            $variant={variant}
            onKeyDown={onKeyDown}
            onClick={() => onChange(o.id)}
            variant="ghost"
            size="sm"
          >
            {o.label}
          </Item>
        )
      })}
    </Root>
  )
}

const Root = styled(Surface)`
  display: inline-flex;
  align-items: stretch;
  overflow: hidden;

  &[aria-disabled='true'] {
    opacity: 0.7;
  }
`

const Item = styled(Button)<{
  $active: boolean
  $variant: 'default' | 'compact'
}>`
  && {
    border: 0;
    border-radius: 0;
    box-shadow: none;
    transform: none;
    width: auto;
    min-width: 0;

    background: ${({ $active, theme }) =>
      $active ? theme.roles.surface.panelAlt : 'transparent'};
    color: ${({ $active, theme }) =>
      $active
        ? theme.getAxisRole('axisClarity').text
        : theme.roles.text.primary};

    padding: ${({ $variant, theme }) =>
      $variant === 'compact'
        ? `${theme.spacingHalf(1.35)} ${theme.spacing(0.85)}`
        : `${theme.spacingHalf(1.75)} ${theme.spacing(1)}`};

    font-size: ${({ theme }) => theme.typography.fontSize.small};
    font-weight: ${({ $active, theme }) =>
      $active
        ? theme.typography.fontWeight.bold
        : theme.typography.fontWeight.medium};

    line-height: 1;
    min-height: ${({ $variant, theme }) =>
      $variant === 'compact' ? theme.spacing(3.5) : theme.spacing(4)};

    transition:
      background-color 0.16s ease,
      color 0.16s ease,
      box-shadow 0.16s ease;

    &:hover {
      background: ${({ theme }) => theme.roles.surface.interactive};
      box-shadow: none;
      transform: none;
      filter: none;
    }

    &:active {
      background: ${({ theme }) => theme.roles.surface.panelAlt};
      box-shadow: none;
      transform: none;
      filter: none;
    }

    &:focus-visible {
      outline: 2px solid transparent;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
      z-index: 1;
      position: relative;
    }

    &:disabled {
      cursor: not-allowed;
    }

    & + & {
      border-left: 1px solid ${({ theme }) => theme.roles.border.subtle};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: auto !important;
    }
  }
`
