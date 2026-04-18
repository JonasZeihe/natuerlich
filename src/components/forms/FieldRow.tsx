// src/components/forms/FieldRow.tsx
'use client'

import React from 'react'
import styled from 'styled-components'

type FieldRowProps = {
  labelFor?: string
  label?: React.ReactNode
  title?: React.ReactNode
  hint?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  align?: 'start' | 'center'
}

const hasContent = (value: React.ReactNode): boolean => {
  if (value == null || value === false) return false
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

export default function FieldRow({
  labelFor,
  label,
  title,
  hint,
  actions,
  children,
  disabled = false,
  align = 'center',
}: FieldRowProps) {
  const showTitle = hasContent(title)
  const showHint = hasContent(hint)
  const showActions = hasContent(actions)
  const showLabel = hasContent(label)
  const showControl = hasContent(children)
  const showBody = showControl || showLabel
  const interactive = !disabled && showBody

  return (
    <Root
      aria-disabled={disabled ? 'true' : undefined}
      data-interactive={interactive ? 'true' : undefined}
    >
      {(showTitle || showHint || showActions) && (
        <Header>
          {(showTitle || showHint) && (
            <Meta>
              {showTitle ? <Title>{title}</Title> : null}
              {showHint ? <Hint>{hint}</Hint> : null}
            </Meta>
          )}

          {showActions ? <ActionSlot>{actions}</ActionSlot> : null}
        </Header>
      )}

      {showBody ? (
        <BodyRow $align={align}>
          {showControl ? <ControlSlot>{children}</ControlSlot> : null}
          {showLabel ? (
            labelFor ? (
              <InlineLabel htmlFor={labelFor}>{label}</InlineLabel>
            ) : (
              <InlineText>{label}</InlineText>
            )
          ) : null}
        </BodyRow>
      ) : null}
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(1)};
  min-width: 0;
  padding: ${({ theme }) => `${theme.spacing(0.75)} ${theme.spacing(0.85)}`};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  background: ${({ theme }) => theme.roles.surface.panel};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    background-color 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease,
    opacity 0.16s ease;

  &[data-interactive='true']:hover {
    background: ${({ theme }) => theme.roles.surface.panelAlt};
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }

  &[aria-disabled='true'] {
    opacity: 0.6;
  }
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(0.75)};
  min-width: 0;
`

const Meta = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacingHalf(0.5)};
  min-width: 0;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.roles.text.primary};
  min-width: 0;
`

const Hint = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.roles.text.subtle};
  min-width: 0;
`

const ActionSlot = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacingHalf(1)};
  flex: 0 0 auto;
  min-width: 0;
`

const BodyRow = styled.div<{ $align: 'start' | 'center' }>`
  display: inline-flex;
  align-items: ${({ $align }) =>
    $align === 'start' ? 'flex-start' : 'center'};
  gap: ${({ theme }) => theme.spacing(0.75)};
  min-width: 0;
`

const ControlSlot = styled.div`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
`

const InlineCopy = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.roles.text.primary};
  min-width: 0;
`

const InlineText = styled(InlineCopy)``

const InlineLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.roles.text.primary};
  min-width: 0;
  cursor: pointer;
`
