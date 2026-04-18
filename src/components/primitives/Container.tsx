// src/components/primitives/Container.tsx
'use client'

import styled from 'styled-components'

export type ContainerMax =
  | 'narrow'
  | 'content'
  | 'page'
  | 'default'
  | 'wide'
  | 'full'

const Container = styled.div<{ max?: ContainerMax }>`
  width: 100%;
  max-width: ${({ theme, max = 'content' }) =>
    max === 'full' ? 'none' : theme.layout.containers[max]};
  margin-inline: auto;
  padding-inline: clamp(0.75rem, 3vw, 1.5rem);
`

export default Container
