// src/app/layout.tsx
import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/design/StyledComponentsRegistry'
import Providers from '@/design/Providers'
import { fontClassName } from '@/design/fonts'
import Shell from '@/layouts/Shell'

export const metadata: Metadata = {
  title: 'Jonas Zeihe',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={fontClassName}>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Shell>{children}</Shell>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
