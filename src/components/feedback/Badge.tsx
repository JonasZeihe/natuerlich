// src/components/feedback/Badge.tsx
'use client'

import { type HTMLAttributes } from 'react'
import styled, { useTheme } from 'styled-components'
import BadgeLibrary, { type BadgeKey } from './BadgeLibrary'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  badgeKey: BadgeKey
}

type BadgeContainerProps = {
  $background: string
}

const BadgeContainer = styled.span<BadgeContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
  background-color: ${({ $background }) => $background};
  color: ${({ theme }) => theme.roles.text.inverse};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: ${({ theme }) => `${theme.spacing(0.7)} ${theme.spacing(2)}`};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition:
    opacity 0.2s ease-out,
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out;
  user-select: none;
  cursor: default;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing(0.6)} ${theme.spacing(1.5)}`};
    font-size: ${({ theme }) => theme.typography.fontSize.small};
    gap: ${({ theme }) => theme.spacing(0.5)};
  }
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  line-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.98rem;
  }
`

const Label = styled.span`
  display: inline-block;
`

export default function Badge({ badgeKey, ...rest }: BadgeProps) {
  const theme = useTheme()
  const badge = BadgeLibrary[badgeKey]

  if (!badge) return null

  const { label, icon: Icon, colorLight, colorDark } = badge
  const background = theme.mode === 'dark' ? colorDark : colorLight

  return (
    <BadgeContainer $background={background} aria-label={label} {...rest}>
      {Icon ? (
        <IconWrapper aria-hidden="true">
          <Icon />
        </IconWrapper>
      ) : null}
      <Label>{label}</Label>
    </BadgeContainer>
  )
}
