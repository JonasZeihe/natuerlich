'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import styled from 'styled-components'
import type { AssetConsumerSpec } from '@/components/assets/registry'
import Surface from '@/components/primitives/Surface'
import Stack from '@/components/primitives/Stack'
import type { AxisKey, MovementKey, SurfaceToneKey } from '@/design/theme'
import Typography from '@/design/typography'
import {
  activeIndexFromRotation,
  circularDistance,
  easeOutCubic,
  projectCircularTarget,
  wrapIndex,
} from './circularSelectorMath'

export type CircularSelectorItem = {
  label: ReactNode
  title: ReactNode
  children: ReactNode
  tone?: SurfaceToneKey
  accent?: AxisKey
  asset?: AssetConsumerSpec | null
}

type Props = {
  items: readonly CircularSelectorItem[]
  movement: MovementKey
  ariaLabel: string
}

const Shell = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const Wheel = styled.div`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  touch-action: pan-y;
  user-select: none;
`

const Rail = styled.div`
  position: relative;
  min-height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Option = styled.button<{
  $distance: number
  $active: boolean
}>`
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(5.8rem, 25vw, 8rem);
  min-height: 2.8rem;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.roles.border.strong : theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.roles.surface.card : theme.roles.surface.quiet};
  color: ${({ theme, $active }) =>
    $active ? theme.roles.text.primary : theme.roles.text.subtle};
  transform: translate(
      calc(-50% + ${({ $distance }) => $distance * 4.9}rem),
      calc(
        -50% +
          ${({ $distance }) =>
            Math.abs($distance) * Math.abs($distance) * 0.14}rem
      )
    )
    scale(${({ $active }) => ($active ? 1 : 0.88)});
  opacity: ${({ $distance }) => Math.max(0, 1 - Math.abs($distance) * 0.34)};
  z-index: ${({ $active }) => ($active ? 2 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacingHalf(1.8)} ${theme.spacing(1.1)}`};
  font: inherit;
  cursor: pointer;
  transition:
    transform 0.22s ${({ theme }) => theme.motion.foundations.easings.emphasis},
    opacity 0.22s ${({ theme }) => theme.motion.foundations.easings.standard},
    background-color 0.18s
      ${({ theme }) => theme.motion.foundations.easings.standard},
    border-color 0.18s
      ${({ theme }) => theme.motion.foundations.easings.standard},
    color 0.18s ${({ theme }) => theme.motion.foundations.easings.standard};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(0.75)};
`

const Control = styled.button`
  min-width: 2.75rem;
  min-height: 2.75rem;
  border: 1px solid ${({ theme }) => theme.roles.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.roles.surface.card};
  color: ${({ theme }) => theme.roles.text.primary};
  font: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 3px;
  }
`

const ActivePanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
`

const getPointerX = (event: React.PointerEvent<HTMLElement>) => event.clientX

const CircularSelector = ({ items, movement, ariaLabel }: Props) => {
  const count = items.length
  const [rotation, setRotation] = useState(0)
  const dragRef = useRef<{
    startX: number
    startRotation: number
    lastX: number
    lastTime: number
    velocity: number
    pointerId: number
  } | null>(null)
  const frameRef = useRef<number | null>(null)

  const activeIndex = activeIndexFromRotation(rotation, count)
  const activeItem = items[activeIndex]

  const stopAnimation = useCallback(() => {
    if (frameRef.current === null) return
    window.cancelAnimationFrame(frameRef.current)
    frameRef.current = null
  }, [])

  const animateTo = useCallback(
    (target: number, velocity = 0) => {
      stopAnimation()

      const start = rotation
      const distance = target - start
      const duration = Math.max(
        260,
        Math.min(780, 360 + Math.abs(distance) * 90)
      )
      const startedAt = performance.now()

      const tick = (time: number) => {
        const progress = Math.min(1, (time - startedAt) / duration)
        const eased = easeOutCubic(progress)

        setRotation(start + distance * eased)

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(tick)
          return
        }

        setRotation(target)
        frameRef.current = null
      }

      frameRef.current = window.requestAnimationFrame(tick)
    },
    [rotation, stopAnimation]
  )

  const setActive = useCallback(
    (index: number) => animateTo(wrapIndex(index, count)),
    [animateTo, count]
  )

  const moveBy = useCallback(
    (step: -1 | 1) => setActive(activeIndex + step),
    [activeIndex, setActive]
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (count <= 1) return

      stopAnimation()

      const now = performance.now()
      const x = getPointerX(event)

      dragRef.current = {
        startX: x,
        startRotation: rotation,
        lastX: x,
        lastTime: now,
        velocity: 0,
        pointerId: event.pointerId,
      }

      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [count, rotation, stopAnimation]
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      const now = performance.now()
      const x = getPointerX(event)
      const delta = x - drag.startX
      const stepWidth = 78
      const nextRotation = drag.startRotation - delta / stepWidth
      const elapsed = Math.max(1, now - drag.lastTime)

      drag.velocity = ((drag.lastX - x) / stepWidth / elapsed) * 16.67
      drag.lastX = x
      drag.lastTime = now

      setRotation(nextRotation)
    },
    []
  )

  const handlePointerEnd = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      dragRef.current = null

      const target = projectCircularTarget(rotation, drag.velocity, 2)
      animateTo(target, drag.velocity)

      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        return
      }
    },
    [animateTo, rotation]
  )

  const visibleOptions = useMemo(
    () =>
      items.map((item, index) => ({
        item,
        index,
        distance: circularDistance(index, rotation, count),
      })),
    [count, items, rotation]
  )

  useEffect(() => () => stopAnimation(), [stopAnimation])

  if (!count || !activeItem) return null

  return (
    <Shell aria-label={ariaLabel}>
      <Wheel
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <Rail>
          {visibleOptions.map(({ item, index, distance }) =>
            Math.abs(distance) <= 2 ? (
              <Option
                key={index}
                type="button"
                $distance={distance}
                $active={index === activeIndex}
                aria-pressed={index === activeIndex}
                onClick={() => setActive(index)}
              >
                <Typography
                  as="span"
                  variant="caption"
                  gutter={false}
                  accent={item.accent ?? 'axisDensity'}
                >
                  {item.label}
                </Typography>
              </Option>
            ) : null
          )}
        </Rail>

        <Controls>
          <Control type="button" onClick={() => moveBy(-1)} aria-label="Zurück">
            ‹
          </Control>
          <Control type="button" onClick={() => moveBy(1)} aria-label="Weiter">
            ›
          </Control>
        </Controls>

        <ActivePanel>
          <Surface
            tone={activeItem.tone ?? 'card'}
            movement={movement}
            radius="large"
            bordered
            padding="lg"
            weight="steady"
            asset={activeItem.asset}
          >
            <Stack gap={4}>
              <Typography
                as="p"
                variant="caption"
                gutter={false}
                accent={activeItem.accent ?? 'axisDensity'}
              >
                {activeItem.label}
              </Typography>

              <Typography
                as="h3"
                variant="h3"
                gutter={false}
                accent={activeItem.accent ?? 'axisDensity'}
              >
                {activeItem.title}
              </Typography>

              <Typography as="p" variant="body" gutter={false}>
                {activeItem.children}
              </Typography>
            </Stack>
          </Surface>
        </ActivePanel>
      </Wheel>
    </Shell>
  )
}

export default CircularSelector
