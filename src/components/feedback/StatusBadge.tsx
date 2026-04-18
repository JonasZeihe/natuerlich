// src/components/feedback/StatusBadge.tsx
'use client'

import React from 'react'
import styled, { css } from 'styled-components'

export type StatusKind = 'ok' | 'warn' | 'error' | 'pending'
export type StatusBadgeVariant = 'icon' | 'label' | 'both'
export type StatusBadgeSize = 'sm' | 'md'

type Props = {
  status: StatusKind
  variant?: StatusBadgeVariant
  size?: StatusBadgeSize
  labelOverride?: string
  ariaLabel?: string
}

const iconFor: Record<StatusKind, string> = {
  ok: '✅',
  warn: '⚠️',
  error: '🛑',
  pending: '⏳',
}

const defaultLabelFor: Record<StatusKind, string> = {
  ok: 'Bereit',
  warn: 'Achtung',
  error: 'Fehler',
  pending: 'Läuft',
}

const intentKeyForStatus = (status: StatusKind) => {
  switch (status) {
    case 'ok':
      return 'success'
    case 'warn':
      return 'warning'
    case 'error':
      return 'danger'
    default:
      return 'neutral'
  }
}

const Root = styled.span<{
  $status: StatusKind
  $size: StatusBadgeSize
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacingHalf(1.5)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  line-height: 1;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};

  ${({ theme, $status }) => {
    const intent = theme.getIntentRole(intentKeyForStatus($status))
    return css`
      background: ${intent.surface};
      border: 1px solid ${intent.border};
      color: ${intent.contrast};
    `
  }}

  ${({ theme, $size }) =>
    $size === 'sm'
      ? css`
          padding: ${theme.spacingHalf(1.25)} ${theme.spacingHalf(2.5)};
          font-size: ${theme.typography.fontSize.small};
        `
      : css`
          padding: ${theme.spacingHalf(1.6)} ${theme.spacingHalf(3)};
          font-size: ${theme.typography.fontSize.body};
        `}
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const Label = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

export default function StatusBadge({
  status,
  variant = 'both',
  size = 'sm',
  labelOverride,
  ariaLabel,
}: Props) {
  const label = labelOverride ?? defaultLabelFor[status]
  const icon = iconFor[status]
  const resolvedAria = ariaLabel ?? label

  return (
    <Root $status={status} $size={size} aria-label={resolvedAria} role="status">
      {variant === 'icon' || variant === 'both' ? (
        <Icon aria-hidden="true">{icon}</Icon>
      ) : null}
      {variant === 'label' || variant === 'both' ? (
        <Label aria-hidden="true">{label}</Label>
      ) : null}
    </Root>
  )
}
