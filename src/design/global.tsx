// src/design/global.tsx
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    width: 100%;
    min-width: 0;
    min-height: 100vh;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    color-scheme: light;
    text-rendering: optimizeLegibility;
    scroll-behavior: ${({ theme }) => theme.motion.scroll.behavior};
    background: ${({ theme }) => theme.color.surface.page};
  }

  body {
    font-family: ${({ theme }) => theme.font.family.main};
    font-size: ${({ theme }) => theme.text.body.fontSize};
    line-height: ${({ theme }) => theme.text.body.lineHeight};
    color: ${({ theme }) => theme.color.text.default};
    background: ${({ theme }) => theme.color.surface.page};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.color.link.default};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
    text-decoration-color: ${({ theme }) => theme.color.link.default};
    transition: ${({ theme }) => theme.motion.css.link};
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.color.link.hover};
    text-decoration-color: ${({ theme }) => theme.color.link.hover};
  }

  ::selection {
    background: ${({ theme }) => theme.color.focus.ring};
    color: ${({ theme }) => theme.color.text.inverse};
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    max-width: 100%;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    background: transparent;
    border: none;
    border-radius: 0;
  }

  input,
  select,
  textarea {
    background: ${({ theme }) => theme.color.surface.field};
    border: 1px solid ${({ theme }) => theme.color.border.default};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.color.text.default};
    box-shadow: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.text.muted};
    opacity: 1;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.focus.ring};
    outline-offset: 2px;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: ${({ theme }) => theme.font.family.mono};
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    *,
    *::before,
    *::after {
      animation-duration: ${({ theme }) => theme.motion.reduced.duration} !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: ${({ theme }) => theme.motion.reduced.duration} !important;
    }
  }
`

export default GlobalStyles
