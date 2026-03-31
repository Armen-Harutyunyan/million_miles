import type { Config } from '@/payload-types'

export const carsCollectionSlug = 'cars' as const

export type Car = Config['collections']['cars']
export type CarInput = Omit<Car, 'createdAt' | 'id' | 'updatedAt'>
