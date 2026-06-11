// src/components/actions/Button.tsx
'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import type { ButtonVariantKey } from '@/design/theme'

type Variant = ButtonVariantKey
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
  max-width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: ${({ theme }) => theme.font.family.main};
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 1.12;
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.normal};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: ${({ theme }) => theme.color.focus.shadow};
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const sizeStyles = css<{ $size: Size }>`
  ${({ theme, $size }) =>
    $size === 'sm'
      ? css`
          min-height: 2.25rem;
          min-width: 3.25rem;
          gap: ${theme.space(1)};
          padding: ${theme.space(2)} ${theme.space(4)};
        `
      : css`
          min-height: 2.75rem;
          min-width: 3.75rem;
          gap: ${theme.space(2)};
          padding: ${theme.space(3)} ${theme.space(5)};
        `}
`

const linkResetStyles = css`
  min-height: auto;
  min-width: 0;
  padding: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
`

const variantStyles = css<{ $variant: Variant }>`
  ${({ theme, $variant }) => {
    const variant = theme.component.button[$variant]

    return css`
      color: ${variant.default.text};
      background: ${variant.default.background};
      border-color: ${variant.default.border};

      &:hover {
        color: ${variant.hover.text};
        background: ${variant.hover.background};
        border-color: ${variant.hover.border};
        text-decoration: ${$variant === 'link' ? 'underline' : 'none'};
        text-underline-offset: ${$variant === 'link' ? '0.16em' : 'initial'};
        text-decoration-thickness: ${$variant === 'link'
          ? '0.06em'
          : 'initial'};
        transform: ${$variant === 'link' ? 'none' : 'translateY(-1px)'};
      }

      &:active {
        color: ${variant.hover.text};
        background: ${variant.hover.background};
        border-color: ${variant.hover.border};
        transform: translateY(0);
      }

      &:disabled,
      &[aria-disabled='true'] {
        color: ${variant.disabled.text};
        background: ${variant.disabled.background};
        border-color: ${variant.disabled.border};
      }
    `
  }}
`

const StyledButton = styled.button<{
  $variant: Variant
  $size: Size
  $fullWidth: boolean
}>`
  ${baseStyles}
  ${sizeStyles}
  ${({ $variant }) => ($variant === 'link' ? linkResetStyles : '')}
  width: ${({ $fullWidth, $variant }) =>
    $variant === 'link' ? 'auto' : $fullWidth ? '100%' : 'auto'};
  ${variantStyles}
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    type,
    ...rest
  },
  ref
) {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      type={type ?? 'button'}
      {...rest}
    >
      {children}
    </StyledButton>
  )
})

export default Button
