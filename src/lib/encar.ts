const ENCAR_API_BASE_URL = 'https://api.encar.com'
const ENCAR_DETAIL_URL =
  'https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carsearch&listAdvType=normal'
const ENCAR_IMAGE_BASE_URL = 'https://ci.encar.com'

export const DEFAULT_ENCAR_QUERY = '(And.Hidden.N._.CarType.N.)'

export type EncarSearchResult = {
  Badge?: string
  BadgeDetail?: string
  DealerName?: string
  FuelType?: string
  Id: string
  Manufacturer?: string
  Mileage?: number
  Model?: string
  ModifiedDate?: string
  OfficeCityState?: string
  OfficeName?: string
  Photo?: string
  Photos?: Array<{
    location: string
    type: string
  }>
  Price?: number
  ServiceMark?: string[]
  Transmission?: string
  Year?: number
}

export type EncarSearchResponse = {
  Count: number
  SearchResults: EncarSearchResult[]
}

export type EncarCarInput = {
  badge: string
  brand: string
  dealerName: string
  fuelType: string
  imageUrl: string
  isFeatured: boolean
  isWarranty: boolean
  mileage: number
  model: string
  officeName: string
  price: number
  sellerCity: string
  sourceId: string
  sourceUrl: string
  syncSource: 'encar'
  syncedAt: string
  title: string
  transmission: string
  year: number
}

const normalizeString = (value: string | undefined): string => {
  return value?.trim() || ''
}

const parseYear = (value: number | undefined): number => {
  if (!value) {
    return 0
  }

  return Number.parseInt(String(value).slice(0, 4), 10)
}

export const buildEncarImageUrl = (result: EncarSearchResult): string => {
  const primaryPhoto = result.Photos?.[0]?.location

  if (primaryPhoto) {
    return `${ENCAR_IMAGE_BASE_URL}${primaryPhoto}`
  }

  const legacyPhoto = result.Photo ? `${result.Photo}001.jpg` : ''

  return legacyPhoto ? `${ENCAR_IMAGE_BASE_URL}${legacyPhoto}` : ''
}

export const buildEncarSourceUrl = (id: string): string => {
  return `${ENCAR_DETAIL_URL}&carid=${encodeURIComponent(id)}`
}

export const mapEncarResultToCarInput = (
  result: EncarSearchResult,
  syncedAt: Date,
): EncarCarInput => {
  const brand = normalizeString(result.Manufacturer)
  const model = normalizeString(result.Model)
  const badge = [normalizeString(result.Badge), normalizeString(result.BadgeDetail)]
    .filter(Boolean)
    .join(' ')
    .trim()

  return {
    badge,
    brand,
    dealerName: normalizeString(result.DealerName),
    fuelType: normalizeString(result.FuelType),
    imageUrl: buildEncarImageUrl(result),
    isFeatured: false,
    isWarranty: (result.ServiceMark || []).some((mark) => mark.startsWith('EncarDiagnosis')),
    mileage: Math.round(result.Mileage || 0),
    model,
    officeName: normalizeString(result.OfficeName),
    price: Math.round(result.Price || 0),
    sellerCity: normalizeString(result.OfficeCityState),
    sourceId: result.Id,
    sourceUrl: buildEncarSourceUrl(result.Id),
    syncSource: 'encar',
    syncedAt: syncedAt.toISOString(),
    title: [brand, model, badge].filter(Boolean).join(' ').trim(),
    transmission: normalizeString(result.Transmission),
    year: parseYear(result.Year),
  }
}

export const fetchEncarCarsPage = async (options: {
  page: number
  pageSize: number
  query?: string
}): Promise<EncarSearchResponse> => {
  const { page, pageSize, query = DEFAULT_ENCAR_QUERY } = options
  const offset = (page - 1) * pageSize
  const searchParams = new URLSearchParams({
    count: 'true',
    q: query,
    sr: `|ModifiedDate|${offset}|${pageSize}`,
  })

  const response = await fetch(
    `${ENCAR_API_BASE_URL}/search/car/list/premium?${searchParams.toString()}`,
    {
      headers: {
        accept: 'application/json',
      },
      next: {
        revalidate: 0,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`ENCAR request failed with status ${response.status}`)
  }

  return response.json() as Promise<EncarSearchResponse>
}
