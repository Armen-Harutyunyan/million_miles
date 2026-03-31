import type { CollectionConfig } from 'payload'

import { formatCarTitle } from '../lib/formatCarTitle.ts'

type PartialCarData = {
  badge?: string | null
  brand?: string | null
  model?: string | null
}

const buildTitle = ({ badge, brand, model }: PartialCarData): string => {
  const baseTitle = formatCarTitle(brand || '', model || '')
  const normalizedBadge = badge?.trim()

  return normalizedBadge ? `${baseTitle} ${normalizedBadge}`.trim() : baseTitle
}

export const Cars: CollectionConfig = {
  slug: 'cars',
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'year', 'mileage', 'price', 'syncSource', 'syncedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Generated from brand, model and trim.',
        readOnly: true,
      },
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'brand',
          type: 'text',
          required: true,
        },
        {
          name: 'model',
          type: 'text',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'mileage',
          type: 'number',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fuelType',
          type: 'text',
        },
        {
          name: 'transmission',
          type: 'text',
        },
        {
          name: 'sellerCity',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'officeName',
          type: 'text',
        },
        {
          name: 'dealerName',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imageUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'sourceUrl',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sourceId',
          type: 'text',
          index: true,
          required: true,
          unique: true,
        },
        {
          name: 'syncSource',
          type: 'select',
          defaultValue: 'encar',
          options: [
            {
              label: 'ENCAR',
              value: 'encar',
            },
          ],
          required: true,
        },
        {
          name: 'syncedAt',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'isWarranty',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) {
          return data
        }

        const carData = data as PartialCarData

        return {
          ...data,
          title: buildTitle({
            badge: carData.badge || null,
            brand: carData.brand || null,
            model: carData.model || null,
          }),
        }
      },
    ],
  },
}
