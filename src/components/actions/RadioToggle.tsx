// src/components/actions/RadioToggle.tsx
'use client'

import styled, { css } from 'styled-components'

type RadioToggleBaseProps<T extends string = string> = Readonly<{
  value: T
  onValue: T
  offValue: T
  onChange: (next: T) => void
  disabled?: boolean
  variant?: 'default' | 'compact'
}>

type RadioToggleWithLabel<T extends string = string> = RadioToggleBaseProps<T> &
  Readonly<{
    label: string
    ariaLabel?: string
  }>

type RadioToggleWithAriaLabel<T extends string = string> =
  RadioToggleBaseProps<T> &
    Readonly<{
      label?: undefined
      ariaLabel: string
    }>

export type RadioToggleProps<T extends string = string> =
  | RadioToggleWithLabel<T>
  | RadioToggleWithAriaLabel<T>

export default function RadioToggle<T extends string = string>({
  ariaLabel,
  label,
  value,
  onValue,
  offValue,
  onChange,
  disabled = false,
  variant = 'compact',
}: RadioToggleProps<T>) {
  const checked = value === onValue
  const accessibleLabel = ariaLabel ?? label

  const handleToggle = () => {
    if (disabled) return
    onChange(checked ? offValue : onValue)
  }

  const switchControl = (
    <SwitchButton
      type="button"
      role="switch"
      aria-label={accessibleLabel}
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleToggle}
      $variant={variant}
    >
      <Track aria-hidden="true" $checked={checked} $variant={variant}>
        <Thumb $checked={checked} $variant={variant} />
      </Track>
    </SwitchButton>
  )

  if (!label) {
    return <Root>{switchControl}</Root>
  }

  return (
    <Row $disabled={disabled}>
      <Label>{label}</Label>
      {switchControl}
    </Row>
  )
}

const Root = styled.div`
  display: inline-flex;
  align-items: center;
  min-width: 0;
`

const Row = styled.div<{
  $disabled: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  min-width: 0;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.58;
    `}
`

const Label = styled.span`
  min-width: 0;
  flex: 1 1 auto;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const SwitchButton = styled.button<{
  $variant: 'default' | 'compact'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  -webkit-tap-highlight-color: transparent;
  transition: ${({ theme }) => theme.motion.css.interactive.toggleButton};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 1;
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const Track = styled.span<{
  $checked: boolean
  $variant: 'default' | 'compact'
}>`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border: 1px solid;
  transition: ${({ theme }) => theme.motion.css.interactive.toggleTrack};

  ${({ $variant, theme }) =>
    $variant === 'compact'
      ? css`
          width: ${theme.spacing(5.5)};
          height: ${theme.spacing(3.5)};
        `
      : css`
          width: ${theme.spacing(6.5)};
          height: ${theme.spacing(4)};
        `}

  ${({ theme, $checked }) => {
    const accent = theme.getAxisRole('axisOpening')

    return css`
      background: ${$checked ? accent.surface : theme.roles.surface.panelAlt};
      border-color: ${$checked ? accent.border : theme.roles.border.subtle};
      box-shadow: ${theme.boxShadow.xs};
    `
  }}

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const Thumb = styled.span<{
  $checked: boolean
  $variant: 'default' | 'compact'
}>`
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 50%;
  transition: ${({ theme }) => theme.motion.css.interactive.toggleThumb};

  ${({ $variant, theme }) =>
    $variant === 'compact'
      ? css`
          width: ${theme.spacing(2.5)};
          height: ${theme.spacing(2.5)};
        `
      : css`
          width: ${theme.spacing(3)};
          height: ${theme.spacing(3)};
        `}

  ${({ theme, $checked, $variant }) => {
    const accent = theme.getAxisRole('axisOpening')
    const inset = theme.spacingHalf(1)

    const compactTravel = `calc(${theme.spacing(5.5)} - ${theme.spacing(2.5)} - ${theme.spacingHalf(2)})`
    const defaultTravel = `calc(${theme.spacing(6.5)} - ${theme.spacing(3)} - ${theme.spacingHalf(2)})`
    const travel = $variant === 'compact' ? compactTravel : defaultTravel

    return css`
      background: ${$checked ? accent.fill : theme.roles.surface.panel};
      box-shadow: ${theme.boxShadow.sm};
      transform: translate(calc(${inset} + ${$checked ? travel : '0px'}), -50%);
    `
  }}

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`
