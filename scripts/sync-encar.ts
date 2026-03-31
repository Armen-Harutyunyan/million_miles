import { getPayload } from 'payload'

import { syncEncarCars } from '../src/lib/encar-sync.ts'
import config from '../src/payload.config.ts'

const payload = await getPayload({ config })
const summary = await syncEncarCars(payload)

process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`)
process.exit(0)
