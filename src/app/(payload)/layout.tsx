import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'

import { importMap } from './admin/importMap'
import './custom.scss'

type PayloadLayoutProps = {
  children: ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const PayloadLayout = ({ children }: PayloadLayoutProps) => {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default PayloadLayout
