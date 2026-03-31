import config from '@payload-config'
import { getPayload } from 'payload'
import { syncEncarCars } from '@/lib/encar-sync'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const isAuthorized = (request: Request): boolean => {
  const authorization = request.headers.get('authorization')

  if (authorization === `Bearer ${env.cronSecret}`) {
    return true
  }

  const { searchParams } = new URL(request.url)

  return searchParams.get('secret') === env.cronSecret
}

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })
  const summary = await syncEncarCars(payload)

  return Response.json(summary)
}
