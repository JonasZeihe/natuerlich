// src/components/miniCourse/BreathingExercise.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from 'framer-motion'
import styled, { css } from 'styled-components'
import {
  breathPhaseLabels,
  breathPhases,
  countdownStart,
  getBottomCarrierMotion,
  getTopCarrierMotion,
  phaseDurationSeconds,
  type BreathExerciseState,
} from './breathingMotion'

type CarrierTone = 'inhale' | 'exhale'

type CarrierStyle = {
  x: MotionValue<number>
  y: MotionValue<number>
  rotate: MotionValue<number>
  scale: MotionValue<number>
  opacity: MotionValue<number>
}

type CarrierAsset = {
  src: string
}

type CenterLayout = {
  x: number
  y: number
  scale: number
  surfaceAlpha: number
  borderAlpha: number
}

type VisualLayout = {
  center: CenterLayout
}

type Props = {
  showWebsiteAction?: boolean
}

const visualLayout: VisualLayout = {
  center: {
    x: 0,
    y: 0,
    scale: 0.7,
    surfaceAlpha: 0.52,
    borderAlpha: 0.48,
  },
}

const carrierAssets: Record<CarrierTone, CarrierAsset> = {
  inhale: {
    src: '/minikurs/001_Einatmen.webp',
  },
  exhale: {
    src: '/minikurs/002_Ausatmen.webp',
  },
}

export default function BreathingExercise({ showWebsiteAction = true }: Props) {
  const phaseProgress = useMotionValue(0)
  const [state, setState] = useState<BreathExerciseState>('idle')
  const [countdown, setCountdown] = useState(countdownStart)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phaseSecond, setPhaseSecond] = useState(1)

  const phase = breathPhases[phaseIndex]

  const topCarrierStyle: CarrierStyle = {
    x: useTransform(
      phaseProgress,
      (progress) => getTopCarrierMotion(phase, progress).x
    ),
    y: useTransform(
      phaseProgress,
      (progress) => getTopCarrierMotion(phase, progress).y
    ),
    rotate: useTransform(
      phaseProgress,
      (progress) => getTopCarrierMotion(phase, progress).rotate
    ),
    scale: useTransform(
      phaseProgress,
      (progress) => getTopCarrierMotion(phase, progress).scale
    ),
    opacity: useTransform(
      phaseProgress,
      (progress) => getTopCarrierMotion(phase, progress).opacity
    ),
  }

  const bottomCarrierStyle: CarrierStyle = {
    x: useTransform(
      phaseProgress,
      (progress) => getBottomCarrierMotion(phase, progress).x
    ),
    y: useTransform(
      phaseProgress,
      (progress) => getBottomCarrierMotion(phase, progress).y
    ),
    rotate: useTransform(
      phaseProgress,
      (progress) => getBottomCarrierMotion(phase, progress).rotate
    ),
    scale: useTransform(
      phaseProgress,
      (progress) => getBottomCarrierMotion(phase, progress).scale
    ),
    opacity: useTransform(
      phaseProgress,
      (progress) => getBottomCarrierMotion(phase, progress).opacity
    ),
  }

  useEffect(() => {
    if (state !== 'countdown') return

    if (countdown === 0) {
      setPhaseIndex(0)
      setPhaseSecond(1)
      phaseProgress.set(0)
      setState('running')
      return
    }

    const timer = window.setTimeout(() => {
      setCountdown((current) => current - 1)
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [countdown, phaseProgress, state])

  useEffect(() => {
    if (state !== 'running') {
      phaseProgress.stop()
      phaseProgress.set(0)
      return
    }

    setPhaseSecond(1)
    phaseProgress.set(0)

    const controls: AnimationPlaybackControls = animate(phaseProgress, 1, {
      duration: phaseDurationSeconds,
      ease: 'linear',
      onComplete: () => {
        setPhaseIndex((current) => (current + 1) % breathPhases.length)
      },
    })

    return () => {
      controls.stop()
    }
  }, [phaseIndex, phaseProgress, state])

  useEffect(() => {
    if (state !== 'running') return

    const timer = window.setInterval(() => {
      setPhaseSecond((current) =>
        current < phaseDurationSeconds ? current + 1 : current
      )
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [phaseIndex, state])

  const startExercise = () => {
    setCountdown(countdownStart)
    setPhaseIndex(0)
    setPhaseSecond(1)
    phaseProgress.set(0)
    setState('countdown')
  }

  const resetExercise = () => {
    setCountdown(countdownStart)
    setPhaseIndex(0)
    setPhaseSecond(1)
    phaseProgress.set(0)
    setState('idle')
  }

  const returnToWebsite = () => {
    window.location.assign('/#schnupperkurs')
  }

  return (
    <Stage aria-label="Geführte Atemübung">
      <Canvas>
        <CarrierScene viewBox="0 0 640 640" aria-hidden="true">
          <g transform="translate(320 320)">
            <CarrierGroup style={topCarrierStyle}>
              <BreathCarrier tone="inhale" />
            </CarrierGroup>

            <CarrierGroup style={bottomCarrierStyle}>
              <BreathCarrier tone="exhale" />
            </CarrierGroup>
          </g>
        </CarrierScene>

        <CenterFrame
          $x={visualLayout.center.x}
          $y={visualLayout.center.y}
          $scale={visualLayout.center.scale}
        >
          {state === 'idle' ? (
            <CenterButton
              type="button"
              onClick={startExercise}
              aria-label="Atemübung starten"
              $surfaceAlpha={visualLayout.center.surfaceAlpha}
              $borderAlpha={visualLayout.center.borderAlpha}
            >
              <CenterContent $state={state} aria-live="polite">
                <Phase $state={state}>Start</Phase>
              </CenterContent>
            </CenterButton>
          ) : (
            <Center
              $surfaceAlpha={visualLayout.center.surfaceAlpha}
              $borderAlpha={visualLayout.center.borderAlpha}
            >
              <CenterContent $state={state} aria-live="polite">
                {state === 'countdown' ? <Counter>{countdown}</Counter> : null}

                {state === 'running' ? (
                  <>
                    <Phase $state={state}>{breathPhaseLabels[phase]}</Phase>
                    <Counter>{phaseSecond}</Counter>
                  </>
                ) : null}
              </CenterContent>
            </Center>
          )}
        </CenterFrame>
      </Canvas>

      <AppActions>
        {showWebsiteAction ? (
          <QuietAction type="button" onClick={returnToWebsite}>
            Website
          </QuietAction>
        ) : null}

        <QuietAction
          type="button"
          onClick={resetExercise}
          disabled={state === 'idle'}
        >
          Reset
        </QuietAction>
      </AppActions>
    </Stage>
  )
}

const BreathCarrier = ({ tone }: { tone: CarrierTone }) => {
  const asset = carrierAssets[tone]

  return <CarrierImage href={asset.src} preserveAspectRatio="xMidYMid meet" />
}

const Stage = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
`

const Canvas = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 1;
  overflow: visible;

  @media (min-width: 48rem) {
    width: min(74vw, 44rem);
    max-width: none;
  }
`

const CarrierScene = styled.svg`
  --carrier-size: 20rem;

  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`

const CarrierGroup = styled(motion.g)`
  transform-box: view-box;
  transform-origin: center;
  will-change: transform, opacity;
`

const CarrierImage = styled.image`
  x: calc(var(--carrier-size) * -0.5);
  y: calc(var(--carrier-size) * -0.5);
  width: var(--carrier-size);
  height: var(--carrier-size);
  overflow: visible;
`

const CenterFrame = styled.div<{ $x: number; $y: number; $scale: number }>`
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  transform: translate(${({ $x }) => `${$x}px`}, ${({ $y }) => `${$y}px`})
    scale(${({ $scale }) => $scale});
  transform-origin: center;
`

const centerSurface = css<{
  $surfaceAlpha: number
  $borderAlpha: number
}>`
  --seal-size: 9.4rem;
  --seal-idle-title: 2.34rem;
  --seal-phase-title: 1.42rem;
  --seal-counter: 3.28rem;
  --seal-content: 7.2rem;
  --seal-running-gap: 0.03rem;

  position: relative;
  display: grid;
  place-items: center;
  width: var(--seal-size);
  aspect-ratio: 1;
  border: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.arrival.border}
        ${({ $borderAlpha }) => `${Math.round($borderAlpha * 100)}%`},
      transparent
    );
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.card}
      ${({ $surfaceAlpha }) => `${Math.round($surfaceAlpha * 100)}%`},
    transparent
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    --seal-size: 10.8rem;
    --seal-idle-title: 2.68rem;
    --seal-phase-title: 1.62rem;
    --seal-counter: 3.72rem;
    --seal-content: 8.2rem;
    --seal-running-gap: 0.02rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    --seal-size: 11.7rem;
    --seal-idle-title: 2.86rem;
    --seal-phase-title: 1.74rem;
    --seal-counter: 3.94rem;
    --seal-content: 8.8rem;
  }
`

const Center = styled.div<{
  $surfaceAlpha: number
  $borderAlpha: number
}>`
  ${centerSurface}
`

const CenterButton = styled.button<{
  $surfaceAlpha: number
  $borderAlpha: number
}>`
  ${centerSurface}

  appearance: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.roles.surface.card} 64%,
      transparent
    );
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.movement.arrival.accent};
    outline-offset: 0.24rem;
  }
`

const CenterContent = styled.div<{ $state: BreathExerciseState }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: none;
  text-align: center;
  gap: ${({ $state }) =>
    $state === 'running' ? 'var(--seal-running-gap)' : '0'};
  transform: ${({ $state }) =>
    $state === 'running' ? 'translateY(0.06rem)' : 'translateY(0)'};

  > * {
    max-width: var(--seal-content);
  }
`

const Phase = styled.p<{ $state: BreathExerciseState }>`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ $state }) =>
    $state === 'idle' ? 'var(--seal-idle-title)' : 'var(--seal-phase-title)'};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ $state }) => ($state === 'idle' ? 0.95 : 0.98)};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-wrap: balance;
  overflow-wrap: normal;
  word-break: keep-all;
`

const Counter = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: var(--seal-counter);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 0.76;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tighter};
`

const AppActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const QuietAction = styled.button`
  min-height: ${({ theme }) => theme.spacing(3.2)};
  padding: ${({ theme }) => `${theme.spacingHalf(0.5)} ${theme.spacing(0.9)}`};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: transparent;
  color: ${({ theme }) => theme.roles.text.secondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.roles.text.primary};
    background: color-mix(
      in srgb,
      ${({ theme }) => theme.roles.surface.card} 42%,
      transparent
    );
    border-color: color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.arrival.border} 42%,
      transparent
    );
  }

  &:disabled {
    cursor: default;
    opacity: 0.34;
    color: ${({ theme }) => theme.roles.text.subtle};
    background: transparent;
    border-color: transparent;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.movement.arrival.accent};
    outline-offset: 0.22rem;
  }
`
