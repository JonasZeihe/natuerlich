'use client'

import styled, { css, useTheme } from 'styled-components'
import type { EnergyInput, EnergyMix } from '@/design/theme'
import {
  ORNAMENT_CSS_REGISTRY,
  type OrnamentBoundary,
  type OrnamentCssName,
  type OrnamentCssSpec,
  type OrnamentPlacement,
  type OrnamentPresence,
} from './registry'

type LayerProps = {
  $name: OrnamentCssName
  $placement: OrnamentPlacement
  $presence: OrnamentPresence
  $boundary: OrnamentBoundary
  $startColor: string
  $endColor: string
  $surfaceColor: string
  $edgeColor: string
}

const resolveFallbackColors = (
  theme: ReturnType<typeof useTheme>,
  energy?: EnergyInput,
  mix?: EnergyMix
) => {
  if (mix) {
    const first = theme.getEnergyRole(mix[0])
    const second = theme.getEnergyRole(mix[1])

    return {
      startColor: first.fill,
      endColor: second.fill,
      surfaceColor: first.surface,
      edgeColor: second.border,
    }
  }

  if (energy) {
    const role = theme.getEnergyRole(energy)

    return {
      startColor: role.fill,
      endColor: role.border,
      surfaceColor: role.surface,
      edgeColor: role.border,
    }
  }

  return {
    startColor: theme.roles.border.accent,
    endColor: theme.roles.border.subtle,
    surfaceColor: theme.roles.surface.panelAlt,
    edgeColor: theme.roles.border.subtle,
  }
}

const resolveLayerOpacity = (
  placement: OrnamentPlacement,
  presence: OrnamentPresence
) => {
  if (placement === 'section') {
    if (presence === 'subtle') return 0.28
    if (presence === 'strong') return 0.54
    return 0.4
  }

  if (presence === 'subtle') return 0.22
  if (presence === 'strong') return 0.46
  return 0.34
}

const paperWashStyles = css<LayerProps>`
  background:
    radial-gradient(
      ellipse at 18% 22%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 18%, transparent)
        0%,
      transparent 44%
    ),
    radial-gradient(
      ellipse at 82% 72%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 14%, transparent) 0%,
      transparent 46%
    ),
    linear-gradient(
      135deg,
      transparent 0%,
      color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 34%,
          transparent
        )
        48%,
      transparent 100%
    ),
    repeating-linear-gradient(
      0deg,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 8%, transparent) 0,
      transparent 1px,
      transparent 7px
    ),
    repeating-linear-gradient(
      90deg,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 6%, transparent) 0,
      transparent 1px,
      transparent 9px
    );
  background-size:
    100% 100%,
    100% 100%,
    100% 100%,
    34px 34px,
    42px 42px;

  &::before {
    opacity: 0.2;
    background-image:
      radial-gradient(
        circle at 14% 22%,
        color-mix(in srgb, ${({ $startColor }) => $startColor} 22%, transparent)
          0 1px,
        transparent 1.6px
      ),
      radial-gradient(
        circle at 68% 58%,
        color-mix(in srgb, ${({ $endColor }) => $endColor} 18%, transparent) 0
          1px,
        transparent 1.7px
      );
    background-size:
      29px 31px,
      43px 37px;
  }

  &::after {
    opacity: 0.32;
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 18%, transparent),
        transparent 18%,
        transparent 82%,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 14%, transparent)
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 12%, transparent),
        transparent 24%,
        transparent 76%,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 10%, transparent)
      );
  }
`

const cellularWashStyles = css<LayerProps>`
  background:
    radial-gradient(
      ellipse at 18% 34%,
      transparent 0 23%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 16%, transparent)
        24% 25%,
      transparent 26% 100%
    ),
    radial-gradient(
      ellipse at 42% 20%,
      transparent 0 18%,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 12%, transparent) 19%
        20%,
      transparent 21% 100%
    ),
    radial-gradient(
      ellipse at 72% 38%,
      transparent 0 25%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 14%, transparent) 26%
        27%,
      transparent 28% 100%
    ),
    radial-gradient(
      ellipse at 34% 76%,
      transparent 0 21%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 11%, transparent)
        22% 23%,
      transparent 24% 100%
    ),
    radial-gradient(
      ellipse at 78% 78%,
      transparent 0 22%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 12%, transparent) 23%
        24%,
      transparent 25% 100%
    ),
    linear-gradient(
      120deg,
      transparent,
      color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 42%,
          transparent
        )
        52%,
      transparent
    );
  background-size:
    44rem 30rem,
    38rem 26rem,
    48rem 32rem,
    42rem 28rem,
    40rem 30rem,
    100% 100%;
  background-position:
    -8rem -5rem,
    8rem -6rem,
    60% -3rem,
    -6rem 60%,
    88% 72%,
    center;

  &::before {
    opacity: 0.2;
    background:
      linear-gradient(
        118deg,
        transparent 0 46%,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 16%, transparent)
          46.2%,
        transparent 46.8% 100%
      ),
      linear-gradient(
        63deg,
        transparent 0 58%,
        color-mix(in srgb, ${({ $startColor }) => $startColor} 10%, transparent)
          58.2%,
        transparent 58.8% 100%
      );
    background-size:
      34rem 25rem,
      28rem 20rem;
  }

  &::after {
    opacity: 0.36;
    background:
      radial-gradient(
        ellipse at 50% 50%,
        transparent 0 58%,
        color-mix(
            in srgb,
            ${({ $surfaceColor }) => $surfaceColor} 36%,
            transparent
          )
          100%
      ),
      linear-gradient(
        180deg,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 20%,
          transparent
        ),
        transparent 34%,
        transparent 72%,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 24%,
          transparent
        )
      );
  }
`

const wovenVeilStyles = css<LayerProps>`
  background:
    linear-gradient(
      32deg,
      transparent 0 23%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 10%, transparent)
        23.5% 30%,
      transparent 30.5% 100%
    ),
    linear-gradient(
      32deg,
      transparent 0 54%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 12%, transparent) 54.5%
        61%,
      transparent 61.5% 100%
    ),
    linear-gradient(
      148deg,
      transparent 0 32%,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 10%, transparent)
        32.5% 38%,
      transparent 38.5% 100%
    ),
    linear-gradient(
      148deg,
      transparent 0 68%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 8%, transparent)
        68.5% 74%,
      transparent 74.5% 100%
    ),
    radial-gradient(
      ellipse at 52% 52%,
      color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 45%,
          transparent
        )
        0%,
      transparent 68%
    );
  background-size:
    34rem 24rem,
    38rem 26rem,
    36rem 24rem,
    42rem 28rem,
    100% 100%;
  background-position:
    -8rem -3rem,
    8rem 3rem,
    -4rem 8rem,
    12rem -5rem,
    center;

  &::before {
    opacity: 0.26;
    background:
      repeating-linear-gradient(
        32deg,
        transparent 0 34px,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 11%, transparent)
          35px,
        transparent 36px 72px
      ),
      repeating-linear-gradient(
        148deg,
        transparent 0 38px,
        color-mix(in srgb, ${({ $startColor }) => $startColor} 8%, transparent)
          39px,
        transparent 40px 76px
      );
  }

  &::after {
    opacity: 0.42;
    background:
      radial-gradient(
        ellipse at 22% 40%,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 45%,
          transparent
        ),
        transparent 46%
      ),
      radial-gradient(
        ellipse at 82% 64%,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 38%,
          transparent
        ),
        transparent 42%
      );
  }
`

const edgeWeatherStyles = css<LayerProps>`
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 18%, transparent) 0%,
      transparent 14%,
      transparent 86%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 12%, transparent)
        100%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 14%, transparent) 0%,
      transparent 18%,
      transparent 78%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 12%, transparent) 100%
    ),
    radial-gradient(
      ellipse at 8% 18%,
      color-mix(in srgb, ${({ $startColor }) => $startColor} 16%, transparent),
      transparent 36%
    ),
    radial-gradient(
      ellipse at 92% 82%,
      color-mix(in srgb, ${({ $endColor }) => $endColor} 14%, transparent),
      transparent 38%
    );

  &::before {
    opacity: 0.32;
    background:
      repeating-linear-gradient(
        90deg,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 13%, transparent) 0,
        transparent 1px,
        transparent 15px
      ),
      repeating-linear-gradient(
        0deg,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 9%, transparent) 0,
        transparent 1px,
        transparent 19px
      );
    mask-image: linear-gradient(
      90deg,
      black 0%,
      transparent 18%,
      transparent 82%,
      black 100%
    );
    -webkit-mask-image: linear-gradient(
      90deg,
      black 0%,
      transparent 18%,
      transparent 82%,
      black 100%
    );
  }

  &::after {
    opacity: 0.38;
    background:
      linear-gradient(
        180deg,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 30%,
          transparent
        ),
        transparent 22%,
        transparent 72%,
        color-mix(
          in srgb,
          ${({ $surfaceColor }) => $surfaceColor} 32%,
          transparent
        )
      ),
      radial-gradient(
        ellipse at center,
        transparent 0 54%,
        color-mix(in srgb, ${({ $edgeColor }) => $edgeColor} 12%, transparent)
          100%
      );
  }
`

const resolveOrnamentCssStyles = (name: OrnamentCssName) => {
  if (name === 'cellularWash') return cellularWashStyles
  if (name === 'wovenVeil') return wovenVeilStyles
  if (name === 'edgeWeather') return edgeWeatherStyles
  return paperWashStyles
}

const Layer = styled.div<LayerProps>`
  position: absolute;
  inset: ${({ $boundary }) => ($boundary === 'bleed' ? '-8%' : '0')};
  z-index: 0;
  pointer-events: none;
  user-select: none;
  overflow: hidden;
  border-radius: inherit;
  opacity: ${({ $placement, $presence }) =>
    resolveLayerOpacity($placement, $presence)};

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
  }

  ${({ $name }) => resolveOrnamentCssStyles($name)}
`

export default function OrnamentCss({
  name,
  placement,
  presence = 'default',
  boundary = 'contained',
  energy,
  mix,
}: OrnamentCssSpec) {
  const theme = useTheme()
  const entry = ORNAMENT_CSS_REGISTRY[name]

  if (!entry || !entry.placements.includes(placement)) {
    return null
  }

  const { startColor, endColor, surfaceColor, edgeColor } =
    resolveFallbackColors(theme, energy, mix)

  return (
    <Layer
      aria-hidden
      $name={name}
      $placement={placement}
      $presence={presence}
      $boundary={boundary}
      $startColor={startColor}
      $endColor={endColor}
      $surfaceColor={surfaceColor}
      $edgeColor={edgeColor}
    />
  )
}
