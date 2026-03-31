import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  description: 'Million Miles admin and storefront starter powered by Payload CMS.',
  title: 'Million Miles',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable}`} lang='en'>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
