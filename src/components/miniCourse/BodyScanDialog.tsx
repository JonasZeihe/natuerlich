// src/components/miniCourse/BodyScanDialog.tsx
'use client'

import styled from 'styled-components'
import Button from '@/components/actions/Button'
import ModalOverlay from '@/components/lightbox/ModalOverlay'
import Stack from '@/components/primitives/Stack'
import Typography from '@/design/typography'

type BodyScanDialogContent = {
  title: string
  blocks: readonly string[]
}

type Props = {
  content: BodyScanDialogContent
  onClose: () => void
}

const BodyScanDialog = ({ content, onClose }: Props) => (
  <ModalOverlay onClose={onClose}>
    <Stack gap={4} aria-labelledby="body-scan-title">
      <Typography
        as="h2"
        id="body-scan-title"
        variant="h1"
        cadence="dense"
        measure="title"
        gutter={false}
      >
        {content.title}
      </Typography>

      <Flow>
        {content.blocks.map((block) => (
          <Block key={block}>{block}</Block>
        ))}
      </Flow>

      <Footer>
        <Button type="button" variant="ghost" onClick={onClose}>
          Schließen
        </Button>
      </Footer>
    </Stack>
  </ModalOverlay>
)

const Flow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: ${({ theme }) => theme.typography.measure.prose};
`

const Block = styled.p`
  margin: 0;
  white-space: pre-line;
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
`

export default BodyScanDialog
