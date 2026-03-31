import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Cars } from './collections/Cars.ts'
import { Media } from './collections/Media.ts'
import { Users } from './collections/Users.ts'
import { env } from './lib/env.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Cars],
  editor: lexicalEditor(),
  secret: env.payloadSecret,
  serverURL: env.siteUrl,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: env.mongoUri,
  }),
  sharp,
})
