// src/components/actions/ThemeToggleButton.tsx
'use client'

import { FiMoon, FiSun } from 'react-icons/fi'
import styled from 'styled-components'
import { useNatuerlichkeitTheme } from '@/design/Providers'
import { getClientLogger } from '@/logging'

const ToggleButtonRoot = styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacingHalf(1.5)};
  padding-inline: ${({ theme }) => theme.spacing(1.25)};
  padding-block: ${({ theme }) => theme.spacingHalf(1.5)};
  min-height: ${({ theme }) => theme.spacing(4.5)};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  font-family: ${({ theme }) => theme.typography.fontFamily.button};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  color: ${({ theme }) => theme.roles.interactive.toggle.fg};
  background-color: ${({ theme }) => theme.roles.interactive.toggle.bg};
  border-color: ${({ theme }) => theme.roles.interactive.toggle.border};
  box-shadow: ${({ theme }) => theme.boxShadow.xs};
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover {
    background-color: ${({ theme }) => theme.roles.interactive.toggle.hoverBg};
    border-color: ${({ theme }) => theme.roles.interactive.toggle.hoverBorder};
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
    filter: brightness(1.02);
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.boxShadow.xs};
    filter: none;
  }

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.roles.focus.ring};
  }

  svg {
    flex-shrink: 0;
    width: 1.1em;
    height: 1.1em;
    color: ${({ theme }) => theme.roles.interactive.toggle.icon};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

const Label = styled.span`
  display: inline-block;
  line-height: 1;
`

export default function ThemeToggleButton() {
  const { mode, toggleMode } = useNatuerlichkeitTheme()
  const isDark = mode === 'dark'

  const handleClick = () => {
    const nextMode = isDark ? 'light' : 'dark'

    getClientLogger()
      .withContext({
        cat: 'theme',
        phase: 'intent',
      })
      .info('theme_toggle_intent', {
        from: mode,
        to: nextMode,
      })

    toggleMode()
  }

  return (
    <ToggleButtonRoot
      type="button"
      onClick={handleClick}
      aria-label={
        isDark ? 'Helle Ansicht aktivieren' : 'Dunkle Ansicht aktivieren'
      }
      title={isDark ? 'Helle Ansicht' : 'Dunkle Ansicht'}
      aria-pressed={isDark}
    >
      {isDark ? <FiSun /> : <FiMoon />}
      <Label aria-hidden="true">{isDark ? 'Hell' : 'Dunkel'}</Label>
    </ToggleButtonRoot>
  )
}
