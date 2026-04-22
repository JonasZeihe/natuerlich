// src/design/motion.ts
export type MotionPrimitive =
  | string
  | number
  | readonly number[]
  | Record<string, string | number | readonly number[]>

export type FramerMotionTarget = Record<string, string | number>

export type FramerMotionTransition = Record<string, MotionPrimitive>

export type FramerMotionPreset = {
  initial?: FramerMotionTarget
  animate?: FramerMotionTarget
  exit?: FramerMotionTarget
  whileHover?: FramerMotionTarget
  whileTap?: FramerMotionTarget
  transition: FramerMotionTransition
}

const durations = {
  instant: '0.001ms',
  micro: '0.08s',
  fast: '0.16s',
  base: '0.18s',
  medium: '0.24s',
  slow: '0.32s',
} as const

const easings = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  decelerate: 'cubic-bezier(0.16, 1, 0.3, 1)',
  accelerate: 'cubic-bezier(0.7, 0, 0.84, 0)',
  emphasis: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const

const distances = {
  nudge: '1px',
  hover: '2px',
  headerHide: 'calc(-100% - 0.75rem)',
} as const

const scale = {
  hover: 1.01,
  press: 0.985,
} as const

const opacity = {
  hidden: 0,
  soft: 0.72,
  visible: 1,
} as const

const springs = {
  ui: {
    type: 'spring',
    stiffness: 420,
    damping: 34,
    mass: 0.9,
  },
  settle: {
    type: 'spring',
    stiffness: 280,
    damping: 30,
    mass: 1,
  },
} as const

const css = {
  link: [
    `color ${durations.base} ${easings.standard}`,
    `text-decoration-color ${durations.base} ${easings.standard}`,
  ].join(', '),
  interactive: {
    control: [
      `background-color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `color ${durations.base} ${easings.standard}`,
      `box-shadow ${durations.base} ${easings.standard}`,
      `transform ${durations.micro} ${easings.decelerate}`,
      `filter ${durations.base} ${easings.standard}`,
    ].join(', '),
    toggleButton: [
      `opacity ${durations.base} ${easings.standard}`,
      `transform ${durations.micro} ${easings.decelerate}`,
      `box-shadow ${durations.base} ${easings.standard}`,
    ].join(', '),
    toggleTrack: [
      `background-color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `box-shadow ${durations.base} ${easings.standard}`,
    ].join(', '),
    toggleThumb: [
      `transform ${durations.medium} ${easings.emphasis}`,
      `background-color ${durations.base} ${easings.standard}`,
      `box-shadow ${durations.base} ${easings.standard}`,
    ].join(', '),
    segmented: [
      `background-color ${durations.fast} ${easings.standard}`,
      `color ${durations.fast} ${easings.standard}`,
      `box-shadow ${durations.fast} ${easings.standard}`,
      `transform ${durations.micro} ${easings.decelerate}`,
    ].join(', '),
  },
  navigation: {
    headerShell: [
      `background-color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `backdrop-filter ${durations.base} ${easings.standard}`,
      `-webkit-backdrop-filter ${durations.base} ${easings.standard}`,
      `opacity ${durations.medium} ${easings.decelerate}`,
      `transform ${durations.medium} ${easings.decelerate}`,
    ].join(', '),
    headerChrome: `background-color ${durations.base} ${easings.standard}`,
    link: [
      `color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `background-color ${durations.base} ${easings.standard}`,
    ].join(', '),
    menuButton: [
      `background-color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `color ${durations.base} ${easings.standard}`,
      `box-shadow ${durations.base} ${easings.standard}`,
      `transform ${durations.micro} ${easings.decelerate}`,
    ].join(', '),
  },
  surface: {
    settle: [
      `background-color ${durations.base} ${easings.standard}`,
      `border-color ${durations.base} ${easings.standard}`,
      `box-shadow ${durations.base} ${easings.standard}`,
      `opacity ${durations.base} ${easings.standard}`,
      `transform ${durations.medium} ${easings.decelerate}`,
    ].join(', '),
  },
  feedback: {
    dissolve: [
      `opacity ${durations.medium} ${easings.decelerate}`,
      `transform ${durations.medium} ${easings.decelerate}`,
    ].join(', '),
  },
} as const

const framer = {
  interactive: {
    hover: {
      whileHover: { scale: scale.hover, y: -1 },
      transition: { duration: 0.16, ease: [0.2, 0, 0, 1] },
    },
    press: {
      whileTap: { scale: scale.press, y: 0 },
      transition: { duration: 0.08, ease: [0.16, 1, 0.3, 1] },
    },
    settle: {
      initial: { opacity: opacity.soft, y: 2 },
      animate: { opacity: opacity.visible, y: 0 },
      transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    },
  },
  navigation: {
    headerReveal: {
      initial: { opacity: opacity.hidden, y: -16 },
      animate: { opacity: opacity.visible, y: 0 },
      transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    },
    headerHide: {
      initial: { opacity: opacity.visible, y: 0 },
      animate: { opacity: opacity.hidden, y: -16 },
      transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    },
    dissolve: {
      initial: { opacity: opacity.hidden },
      animate: { opacity: opacity.visible },
      exit: { opacity: opacity.hidden },
      transition: { duration: 0.24, ease: [0.2, 0, 0, 1] },
    },
  },
  surface: {
    enter: {
      initial: { opacity: opacity.hidden, y: 12 },
      animate: { opacity: opacity.visible, y: 0 },
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
    settle: {
      initial: { opacity: opacity.soft, scale: 0.995 },
      animate: { opacity: opacity.visible, scale: 1 },
      transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
    },
  },
  feedback: {
    dissolveIn: {
      initial: { opacity: opacity.hidden, y: 6 },
      animate: { opacity: opacity.visible, y: 0 },
      transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    },
    dissolveOut: {
      initial: { opacity: opacity.visible, y: 0 },
      animate: { opacity: opacity.hidden, y: -4 },
      transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] },
    },
  },
} as const satisfies Record<string, Record<string, FramerMotionPreset>>

const reduced = {
  media: '(prefers-reduced-motion: reduce)',
  duration: durations.instant,
  behavior: 'auto' as const,
  css: {
    instant: `all ${durations.instant} linear`,
  },
  framer: {
    immediate: {
      duration: 0,
    },
  },
} as const

export const motion = {
  foundations: {
    durations,
    easings,
    distances,
    scale,
    opacity,
    springs,
  },
  css,
  framer,
  reduced,
  scroll: {
    behavior: 'smooth' as const,
  },
} as const

export type AppMotion = typeof motion
export default motion
