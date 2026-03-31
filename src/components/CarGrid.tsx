import Image from 'next/image'

import type { Car } from '@/lib/cars'

const formatMileage = (value: number): string => {
  return `${value.toLocaleString('en-US')} km`
}

const formatPrice = (value: number): string => {
  return `${value.toLocaleString('en-US')}k KRW`
}

type CarGridProps = {
  cars: Car[]
}

export const CarGrid = ({ cars }: CarGridProps) => {
  return (
    <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
      {cars.map((car, index) => (
        <article
          aria-labelledby={`car-title-${car.id}`}
          className='group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-white/8 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur'
          key={car.id}
        >
          <div className='relative aspect-[16/10] overflow-hidden bg-[#181311]'>
            <Image
              alt={car.title}
              className='h-full w-full object-cover transition duration-700 group-hover:scale-105'
              height={640}
              loading={index === 0 ? 'eager' : 'lazy'}
              src={car.imageUrl}
              width={1024}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />
            <div className='absolute inset-x-0 top-0 flex items-center justify-between p-4'>
              <span className='rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-white uppercase'>
                Imported stock
              </span>
              {car.isWarranty ? (
                <span className='rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-foreground)] uppercase'>
                  Verified
                </span>
              ) : null}
            </div>
            <div className='absolute inset-x-0 bottom-0 p-5'>
              <p className='max-w-[12rem] text-3xl leading-none font-semibold tracking-[-0.05em] text-white'>
                {formatPrice(car.price)}
              </p>
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-5 p-5'>
            <div>
              <h3
                className='text-2xl leading-none font-semibold tracking-[-0.04em] text-white'
                id={`car-title-${car.id}`}
              >
                {car.title}
              </h3>
              <p className='mt-2 text-sm text-[var(--muted)]'>
                {car.fuelType || 'Unknown fuel'}
                {car.transmission ? ` · ${car.transmission}` : ''}
                {car.sellerCity ? ` · ${car.sellerCity}` : ''}
              </p>
            </div>
            <div className='grid grid-cols-3 gap-3 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 text-sm'>
              <div>
                <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
                  Year
                </p>
                <p className='mt-1 font-medium text-white'>{car.year}</p>
              </div>
              <div>
                <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
                  Mileage
                </p>
                <p className='mt-1 font-medium text-white'>{formatMileage(car.mileage)}</p>
              </div>
              <div>
                <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
                  Dealer
                </p>
                <p className='mt-1 font-medium text-white'>{car.officeName || 'Dealer'}</p>
              </div>
            </div>
            <a
              aria-label={`View ${car.title} on ENCAR`}
              className='mt-auto inline-flex items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:brightness-110'
              href={car.sourceUrl}
              rel='noreferrer'
              target='_blank'
            >
              View details
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
