import type { Payload } from 'payload'

import { type CarInput, carsCollectionSlug } from './cars.ts'
import { fetchEncarCarsPage, mapEncarResultToCarInput } from './encar.ts'
import { env } from './env.ts'

type SyncOptions = {
  pageSize?: number
  pages?: number
}

export type SyncSummary = {
  created: number
  fetched: number
  pages: number
  updated: number
}

const upsertCar = async (payload: Payload, data: CarInput) => {
  const existing = await payload.find({
    collection: carsCollectionSlug,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      sourceId: {
        equals: data.sourceId,
      },
    },
  })

  const existingCar = existing.docs[0]

  if (existingCar) {
    await payload.update({
      collection: carsCollectionSlug,
      id: existingCar.id,
      data,
      depth: 0,
      overrideAccess: true,
    })

    return 'updated' as const
  }

  await payload.create({
    collection: carsCollectionSlug,
    data,
    depth: 0,
    overrideAccess: true,
  })

  return 'created' as const
}

export const syncEncarCars = async (
  payload: Payload,
  options: SyncOptions = {},
): Promise<SyncSummary> => {
  const pages = options.pages ?? env.encarSyncPages
  const pageSize = options.pageSize ?? env.encarPageSize
  const syncedAt = new Date()

  let created = 0
  let fetched = 0
  let updated = 0

  for (let page = 1; page <= pages; page += 1) {
    const response = await fetchEncarCarsPage({
      page,
      pageSize,
      query: env.encarQuery,
    })

    fetched += response.SearchResults.length

    for (const result of response.SearchResults) {
      const mappedCar = mapEncarResultToCarInput(result, syncedAt)

      if (!mappedCar.imageUrl || !mappedCar.brand || !mappedCar.model || !mappedCar.year) {
        continue
      }

      const outcome = await upsertCar(payload, mappedCar)

      if (outcome === 'created') {
        created += 1
      } else {
        updated += 1
      }
    }
  }

  return {
    created,
    fetched,
    pages,
    updated,
  }
}
