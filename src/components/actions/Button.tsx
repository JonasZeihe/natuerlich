// src/components/actions/Button.tsx
'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link' | 'danger'
type Size = 'sm' | 'md'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacingHalf(1.25)};
  border-radius: 0.78rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  border-width: 1px;
  border-style: solid;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.12s ease;

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const roleStyles = css<{ $variant: Variant }>`
  ${({ theme, $variant }) => {
    const role = theme.roles.interactive.button[$variant]

    return css`
      color: ${role.fg};
      background-color: ${role.bg};
      border-color: ${role.border};
      box-shadow: none;

      &:hover {
        color: ${role.hoverFg};
        background-color: ${role.hoverBg};
        border-color: ${role.hoverBorder};
        transform: ${$variant === 'link' ? 'none' : 'translateY(-1px)'};
        text-decoration: ${$variant === 'link' ? 'underline' : 'none'};
        text-underline-offset: ${$variant === 'link' ? '0.16em' : 'initial'};
        text-decoration-thickness: ${$variant === 'link'
          ? '0.06em'
          : 'initial'};
      }

      &:active {
        color: ${role.activeFg};
        background-color: ${role.activeBg};
        border-color: ${role.activeBorder};
        transform: translateY(0);
      }

      &:disabled,
      &[aria-disabled='true'] {
        color: ${role.disabledFg};
        background-color: ${role.disabledBg};
        border-color: ${role.disabledBorder};
        box-shadow: none;
      }
    `
  }}
`

const sizeStyles = css<{ $size: Size }>`
  ${({ theme, $size }) =>
    $size === 'sm'
      ? css`
          min-height: ${theme.spacing(4)};
          padding-inline: ${theme.spacing(1.25)};
          padding-block: ${theme.spacingHalf(1.1)};
          min-width: ${theme.spacing(6.5)};
        `
      : css`
          min-height: ${theme.spacing(4.6)};
          padding-inline: ${theme.spacing(1.6)};
          padding-block: ${theme.spacingHalf(1.45)};
          min-width: ${theme.spacing(7.2)};
        `}
`

const linkSizeStyles = css`
  min-height: auto;
  min-width: 0;
  padding-inline: ${({ theme }) => theme.spacingHalf(1)};
  padding-block: 0;
  box-shadow: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`

const widthStyles = css<{ $fullWidth: boolean; $variant: Variant }>`
  width: ${({ $fullWidth, $variant }) =>
    $variant === 'link' ? 'auto' : $fullWidth ? '100%' : 'auto'};
  max-width: 100%;
`

const StyledButton = styled.button<{
  $variant: Variant
  $size: Size
  $fullWidth: boolean
}>`
  ${baseStyles};
  ${sizeStyles};
  ${({ $variant }) => ($variant === 'link' ? linkSizeStyles : '')};
  ${widthStyles};
  ${roleStyles};
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth = false, children, ...rest },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      type={rest.type ?? 'button'}
      {...rest}
    >
      {children}
    </StyledButton>
  )
})

export default Button
