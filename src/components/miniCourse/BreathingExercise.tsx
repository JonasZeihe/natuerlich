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
import styled from 'styled-components'
import { breathCarrierPaths } from './breathingGeometry'
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

type Props = {
  showWebsiteAction?: boolean
}

const BreathingExercise = ({ showWebsiteAction = true }: Props) => {
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

        <Center>
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
                <Phase>Deine Atemübung beginnt</Phase>
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
  const paths =
    tone === 'inhale' ? breathCarrierPaths.inhale : breathCarrierPaths.exhale

  return (
    <CarrierShape $tone={tone}>
      <CarrierBody d={paths.body} />
      <CarrierInner d={paths.innerEdge} />
      <CarrierOuter d={paths.outerEdge} />
    </CarrierShape>
  )
}

const Stage = styled.section`
  display: grid;
  place-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  min-height: min(74svh, 54rem);
`

const Canvas = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 27rem);
  aspect-ratio: 1;
  margin-inline: auto;
  overflow: visible;

  @media (min-width: 48rem) {
    width: min(74vw, 44rem);
  }
`

const CarrierScene = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`

const CarrierGroup = styled(motion.g)`
  will-change: transform, opacity;
`

const CarrierShape = styled.g<{ $tone: CarrierTone }>`
  --carrier-fill: ${({ theme, $tone }) =>
    $tone === 'inhale'
      ? `color-mix(in srgb, ${theme.roles.movement.arrival.wash} 68%, ${theme.roles.surface.card})`
      : `color-mix(in srgb, ${theme.roles.movement.arrival.assetCounter} 26%, ${theme.roles.movement.arrival.field})`};
  --carrier-edge: ${({ theme, $tone }) =>
    $tone === 'inhale'
      ? theme.roles.movement.arrival.accent
      : theme.roles.movement.arrival.deep};
  --carrier-line: ${({ theme, $tone }) =>
    $tone === 'inhale'
      ? theme.roles.movement.arrival.wash
      : theme.roles.movement.arrival.assetCounter};
`

const CarrierBody = styled.path`
  fill: var(--carrier-fill);
  stroke: var(--carrier-edge);
  stroke-linejoin: round;
  stroke-width: 6;
`

const CarrierInner = styled.path`
  fill: none;
  stroke: var(--carrier-edge);
  stroke-linecap: round;
  stroke-width: 4;
  opacity: 0.58;
`

const CarrierOuter = styled.path`
  fill: none;
  stroke: var(--carrier-line);
  stroke-linecap: round;
  stroke-width: 2.5;
  opacity: 0.36;
`

const Center = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: clamp(11.25rem, 43vw, 16rem);
  aspect-ratio: 1;
  border: 1px solid ${({ theme }) => theme.roles.movement.arrival.border};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.surface.card};
`

const CenterContent = styled.div`
  display: grid;
  place-items: center;
  gap: ${({ theme }) => theme.spacingHalf(1)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: center;
`

const Phase = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.roles.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: clamp(1.25rem, 4vw, 2.35rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.08;
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
  font-size: clamp(3.35rem, 10vw, 5.9rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 0.88;
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
  gap: ${({ theme }) => theme.spacing(1)};
`

const QuietAction = styled.button`
  padding: ${({ theme }) => theme.spacingHalf(1)}
    ${({ theme }) => theme.spacing(1)};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: transparent;
  color: ${({ theme }) => theme.roles.text.subtle};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: 1;

  &:disabled {
    cursor: default;
    opacity: 0.34;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.movement.arrival.accent};
    outline-offset: 0.25rem;
  }
`

export default BreathingExercise
