import { buildEncarImageUrl, mapEncarResultToCarInput } from '@/lib/encar'

describe('ENCAR mapping', () => {
  it('builds an image URL from the first photo location', () => {
    expect(
      buildEncarImageUrl({
        Id: '1',
        Photos: [{ location: '/carpicture09/pic4049/40492607_001.jpg', type: '001' }],
      }),
    ).toBe('https://ci.encar.com/carpicture09/pic4049/40492607_001.jpg')
  })

  it('maps ENCAR payload to local car input', () => {
    const syncedAt = new Date('2026-03-31T10:00:00.000Z')
    const mapped = mapEncarResultToCarInput(
      {
        Badge: 'xDrive 20i',
        BadgeDetail: 'M Sport',
        FuelType: '가솔린',
        Id: '40879802',
        Manufacturer: 'BMW',
        Mileage: 24525,
        Model: 'X3 (G01)',
        Photos: [{ location: '/carpicture07/pic4087/40879802_001.jpg', type: '001' }],
        Price: 6100,
        Transmission: '오토',
        Year: 202307,
      },
      syncedAt,
    )

    expect(mapped).toMatchObject({
      badge: 'xDrive 20i M Sport',
      brand: 'BMW',
      imageUrl: 'https://ci.encar.com/carpicture07/pic4087/40879802_001.jpg',
      model: 'X3 (G01)',
      price: 6100,
      sourceId: '40879802',
      sourceUrl:
        'https://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carsearch&listAdvType=normal&carid=40879802',
      title: 'BMW X3 (G01) xDrive 20i M Sport',
      year: 2023,
    })
  })
})
