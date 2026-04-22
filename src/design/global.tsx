// src/design/global.tsx
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    min-width: 0;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    color-scheme: ${({ theme }) => theme.mode};
    text-rendering: optimizeLegibility;
    scroll-behavior: ${({ theme }) => theme.motion.scroll.behavior};
    background: ${({ theme }) => theme.roles.surface.canvas};
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.roles.text.primary};
    background: ${({ theme }) => theme.roles.surface.canvas};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.roles.text.link};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
    text-decoration-color: ${({ theme }) => theme.roles.text.link};
    transition: ${({ theme }) => theme.motion.css.link};
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.roles.text.linkHover};
    text-decoration-color: ${({ theme }) => theme.roles.text.linkHover};
  }

  ::selection {
    background: ${({ theme }) => theme.roles.focus.ring};
    color: ${({ theme }) => theme.roles.text.inverse};
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    max-width: 100%;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    background: transparent;
    border: none;
    border-radius: 0;
  }

  input, select, textarea {
    background: ${({ theme }) => theme.roles.surface.panel};
    border: 1px solid ${({ theme }) => theme.roles.border.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    color: ${({ theme }) => theme.roles.text.primary};
    box-shadow: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.roles.text.subtle};
    opacity: 1;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }

  code, kbd, samp, pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    *, *::before, *::after {
      animation-duration: ${({ theme }) => theme.motion.reduced.duration} !important;
      animation-iteration-count: 1 !important;
    }
  }
`

export default GlobalStyles
