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
import styled from 'styled-components'
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
          <Center
            $surfaceAlpha={visualLayout.center.surfaceAlpha}
            $borderAlpha={visualLayout.center.borderAlpha}
          >
            <CenterContent aria-live="polite">
              {state === 'idle' ? (
                <>
                  <Phase>Start</Phase>
                  <Hint>Atemübung</Hint>
                  <PrimaryAction type="button" onClick={startExercise}>
                    Starten
                  </PrimaryAction>
                </>
              ) : null}

              {state === 'countdown' ? (
                <>
                  <CountdownPhase>Deine Atemübung beginnt</CountdownPhase>
                  <Counter>{countdown}</Counter>
                </>
              ) : null}

              {state === 'running' ? (
                <>
                  <Phase>{breathPhaseLabels[phase]}</Phase>
                  <Counter>{phaseSecond}</Counter>
                </>
              ) : null}
            </CenterContent>
          </Center>
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

const Center = styled.div<{ $surfaceAlpha: number; $borderAlpha: number }>`
  display: grid;
  place-items: center;
  width: clamp(8.75rem, 38vw, 10rem);
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
`

const CenterContent = styled.div`
  display: grid;
  place-items: center;
  gap: ${({ theme }) => theme.spacingHalf(0.25)};
  width: 100%;
  max-width: 8.25rem;
  text-align: center;
`

const Phase = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(1.24rem, 5.2vw, 1.5rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.02;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-wrap: balance;
`

const CountdownPhase = styled.p`
  margin: 0;
  max-width: 7.1rem;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(0.98rem, 4.3vw, 1.12rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 0.98;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  text-wrap: balance;
`

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.subtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`

const Counter = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(2.55rem, 11vw, 3.45rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 0.84;
`

const PrimaryAction = styled.button`
  margin-top: ${({ theme }) => theme.spacingHalf(1)};
  padding: ${({ theme }) => theme.spacingHalf(1)}
    ${({ theme }) => theme.spacing(1.25)};
  border: 1px solid ${({ theme }) => theme.roles.movement.arrival.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: transparent;
  color: ${({ theme }) => theme.roles.text.primary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.movement.arrival.accent};
    outline-offset: 0.25rem;
  }
`

const AppActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
`

const QuietAction = styled.button`
  min-height: ${({ theme }) => theme.spacing(3.35)};
  padding: ${({ theme }) => `${theme.spacingHalf(0.75)} ${theme.spacing(1)}`};
  border: 1px solid
    color-mix(
      in srgb,
      ${({ theme }) => theme.roles.movement.arrival.border} 38%,
      transparent
    );
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: color-mix(
    in srgb,
    ${({ theme }) => theme.roles.surface.card} 32%,
    transparent
  );
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
      ${({ theme }) => theme.roles.surface.card} 52%,
      transparent
    );
    border-color: ${({ theme }) => theme.roles.movement.arrival.border};
  }

  &:disabled {
    cursor: default;
    opacity: 0.38;
    color: ${({ theme }) => theme.roles.text.subtle};
    background: transparent;
    border-color: transparent;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.movement.arrival.accent};
    outline-offset: 0.25rem;
  }
`
