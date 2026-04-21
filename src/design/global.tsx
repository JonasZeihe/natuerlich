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
    background: ${({ theme }) => theme.roles.surface.canvas};
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.body};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.roles.text.primary};
    background:
      radial-gradient(
        110% 44rem at 50% -8rem,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(95, 135, 134, 0.11)'
            : 'rgba(47, 78, 80, 0.055)'}
            0%,
        transparent 58%
      ),
      radial-gradient(
        72% 24rem at 10% 28%,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(142, 163, 179, 0.07)'
            : 'rgba(72, 91, 106, 0.04)'}
            0%,
        transparent 68%
      ),
      radial-gradient(
        78% 28rem at 92% 76%,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(209, 102, 44, 0.07)'
            : 'rgba(162, 74, 30, 0.035)'}
            0%,
        transparent 70%
      ),
      linear-gradient(
        180deg,
        ${({ theme }) => theme.roles.surface.canvas} 0%,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(20, 24, 29, 0.995)'
            : 'rgba(248, 244, 237, 0.995)'}
            18%,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(17, 21, 26, 1)'
            : 'rgba(242, 237, 228, 1)'}
            54%,
        ${({ theme }) =>
          theme.mode === 'dark'
            ? 'rgba(16, 19, 23, 1)'
            : 'rgba(242, 238, 231, 1)'}
            100%
      );
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${({ theme }) => theme.roles.text.link};
    text-decoration: underline;
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.06em;
    text-decoration-color: ${({ theme }) => theme.roles.text.link};
    transition:
      color 0.18s ease,
      opacity 0.18s ease,
      text-decoration-color 0.18s ease;
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
  }

  ::placeholder {
    color: ${({ theme }) => theme.roles.text.subtle};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.roles.focus.ring};
    outline-offset: 2px;
  }

  code, kbd, samp, pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
      background-attachment: scroll !important;
    }
  }
`

export default GlobalStyles
