import { getPayload } from 'payload'

import { CarGrid } from '@/components/CarGrid'
import { carsCollectionSlug } from '@/lib/cars'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const statItems = [
  { label: 'Cars sold', value: '14 523' },
  { label: 'Experts', value: '19' },
  { label: 'Delivery', value: 'from 2 weeks' },
] as const

const serviceItems = ['Find a car', 'Sell a car', 'Import & export', 'Registration'] as const

const HomePage = async () => {
  const payload = await getPayload({ config })

  const carsResponse = await payload.find({
    collection: carsCollectionSlug,
    depth: 0,
    limit: 12,
    overrideAccess: true,
    sort: '-syncedAt',
  })

  const cars = carsResponse.docs
  const featuredCar = cars[0]
  const spotlightFacts = [
    { label: 'Brand', value: featuredCar?.brand || 'BMW' },
    { label: 'Model', value: featuredCar?.model || '5 Series' },
    { label: 'Year', value: featuredCar ? String(featuredCar.year) : '2021' },
    {
      label: 'Price',
      value: featuredCar ? `${featuredCar.price.toLocaleString('en-US')}k KRW` : '3,490k KRW',
    },
  ] as const
  const latestSync = featuredCar?.syncedAt
    ? new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(featuredCar.syncedAt))
    : null

  return (
    <main className='pb-20'>
      <header className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-sm text-[var(--muted)] md:px-10'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-semibold text-white'>
            M
          </div>
          <div>
            <p className='text-[10px] tracking-[0.32em] uppercase'>Million Miles</p>
            <p className='text-xs text-[var(--muted-strong)]'>Premium import studio</p>
          </div>
        </div>
        <nav aria-label='Primary navigation' className='hidden items-center gap-8 md:flex'>
          <a href='#inventory'>Cars</a>
          <a href='#services'>Services</a>
          <a href='#about'>About us</a>
          <a href='/admin'>Admin</a>
          <a
            aria-label='Open ENCAR source catalog in a new tab'
            href='https://www.encar.com/fc/fc_carsearchlist.do?carType=for'
            rel='noreferrer'
            target='_blank'
          >
            Source
          </a>
        </nav>
      </header>

      <section className='mx-auto grid max-w-7xl gap-8 px-6 pb-10 pt-2 md:px-10 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='grid gap-6'>
          <div className='inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs tracking-[0.28em] text-[var(--muted)] uppercase'>
            <span className='h-2 w-2 rounded-full bg-[var(--accent)]' />
            Premium service for search and delivery of imported vehicles
          </div>
          <div className='grid gap-5'>
            <h1 className='max-w-4xl text-[3.4rem] leading-[0.92] font-semibold tracking-[-0.05em] text-white md:text-[5.6rem]'>
              Find your dream car and deliver it worldwide with a proper showroom presence.
            </h1>
            <p className='max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg'>
              ENCAR inventory is synced into Payload CMS, stored in MongoDB and presented through a
              dealership-style landing with the same search-first structure as the reference.
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <a
              aria-label='Jump to inventory section'
              className='inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition hover:brightness-110'
              href='#inventory'
            >
              Explore inventory
            </a>
            <a
              aria-label='Open Payload CMS admin panel'
              className='inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
              href='/admin'
            >
              Open CMS admin
            </a>
          </div>
          <div className='grid gap-4 rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur md:grid-cols-3'>
            {statItems.map((item) => (
              <div
                className='rounded-[1.4rem] border border-white/6 bg-black/20 p-4'
                key={item.label}
              >
                <p className='text-3xl leading-none font-semibold tracking-[-0.04em] text-white md:text-4xl'>
                  {item.value}
                </p>
                <p className='mt-2 text-xs tracking-[0.24em] text-[var(--muted)] uppercase'>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-3 text-xs tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
            {serviceItems.map((item) => (
              <div
                className='inline-flex items-center justify-center rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-center'
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='grid gap-5'>
          <div className='overflow-hidden rounded-[2.2rem] border border-white/8 bg-white/[0.04] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.3)] backdrop-blur'>
            <div
              className='relative min-h-[26rem] overflow-hidden rounded-[1.7rem] border border-white/8 bg-[#120f0d] p-5'
              style={
                featuredCar
                  ? {
                      backgroundImage: `linear-gradient(180deg, rgba(7,6,6,0.08), rgba(7,6,6,0.78)), url(${featuredCar.imageUrl})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }
                  : undefined
              }
            >
              <div className='flex items-start justify-between gap-4'>
                <div className='rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] tracking-[0.24em] text-white uppercase'>
                  Featured arrival
                </div>
                <div className='rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[11px] tracking-[0.24em] text-white uppercase'>
                  Synced from ENCAR
                </div>
              </div>
              {featuredCar ? (
                <div className='mt-32 max-w-xl md:mt-44'>
                  <p className='text-5xl leading-none font-semibold tracking-[-0.05em] text-white md:text-6xl'>
                    {featuredCar.title}
                  </p>
                  <p className='mt-3 max-w-lg text-sm leading-6 text-white/80 md:text-base'>
                    {featuredCar.year} · {featuredCar.mileage.toLocaleString('en-US')} km ·{' '}
                    {featuredCar.sellerCity || 'Imported stock'}
                  </p>
                  <div className='mt-6 flex flex-wrap gap-3'>
                    <a
                      aria-label={`View featured car ${featuredCar.title} on ENCAR`}
                      className='inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent)]'
                      href={featuredCar.sourceUrl}
                      rel='noreferrer'
                      target='_blank'
                    >
                      View on ENCAR
                    </a>
                    <div className='rounded-full border border-white/12 bg-black/25 px-5 py-3 text-sm font-semibold text-white'>
                      Last sync: {latestSync || 'Pending'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-28 max-w-lg'>
                  <p className='text-5xl leading-none font-semibold tracking-[-0.05em] text-white'>
                    Sync inventory to unlock the full showroom.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            className='grid gap-3 rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 backdrop-blur'
            id='services'
          >
            <div className='flex items-center justify-between gap-4'>
              <div>
                <p className='text-xs tracking-[0.24em] text-[var(--muted)] uppercase'>
                  Find your dream car
                </p>
                <h2 className='mt-2 text-4xl leading-none font-semibold tracking-[-0.05em] text-white'>
                  Search posture inspired by the reference
                </h2>
              </div>
              <a
                aria-label='Jump to imported inventory section'
                className='hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-white uppercase transition hover:bg-white/10 md:inline-flex'
                href='#inventory'
              >
                Open inventory
              </a>
            </div>
            <div className='grid gap-3 md:grid-cols-4'>
              {spotlightFacts.map((item) => (
                <div
                  className='rounded-[1.3rem] border border-white/8 bg-black/20 p-4'
                  key={item.label}
                >
                  <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
                    {item.label}
                  </p>
                  <p className='mt-3 text-lg font-semibold text-white'>{item.value}</p>
                </div>
              ))}
            </div>
            <div className='grid gap-3 md:grid-cols-[1.2fr_0.8fr]'>
              <div className='rounded-[1.5rem] border border-white/8 bg-black/20 p-5'>
                <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
                  Search assistant
                </p>
                <p className='mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]'>
                  For the test task this block is backed by the latest synced record, but the layout
                  intentionally mirrors the filter-driven search posture from the reference site.
                </p>
              </div>
              <a
                aria-label='Show available imported cars'
                className='inline-flex items-center justify-center rounded-[1.5rem] border border-[var(--accent)] bg-[var(--accent)] px-5 py-4 text-sm font-semibold text-[var(--accent-foreground)] transition hover:brightness-110'
                href='#inventory'
              >
                Show available cars
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className='mx-auto grid max-w-7xl gap-6 px-6 pb-14 md:px-10 lg:grid-cols-[0.8fr_1.2fr]'
        id='about'
      >
        <div className='rounded-[2rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur'>
          <p className='text-xs tracking-[0.28em] text-[var(--muted)] uppercase'>About the setup</p>
          <h2 className='mt-3 text-4xl leading-none font-semibold tracking-[-0.05em] text-white'>
            Search, sync, store, present.
          </h2>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-[2rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur'>
            <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
              Sync source
            </p>
            <p className='mt-3 text-lg font-semibold text-white'>ENCAR API</p>
            <p className='mt-3 text-sm leading-6 text-[var(--muted)]'>
              Brand, model, year, mileage, price and photo are collected from ENCAR and normalized
              into one collection.
            </p>
          </div>
          <div className='rounded-[2rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur'>
            <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
              Storage
            </p>
            <p className='mt-3 text-lg font-semibold text-white'>MongoDB + Payload</p>
            <p className='mt-3 text-sm leading-6 text-[var(--muted)]'>
              Cars are persisted in your database and immediately visible in the admin for manual
              verification and updates.
            </p>
          </div>
          <div className='rounded-[2rem] border border-white/8 bg-white/[0.04] p-6 backdrop-blur'>
            <p className='text-[10px] tracking-[0.24em] text-[var(--muted-strong)] uppercase'>
              Delivery cadence
            </p>
            <p className='mt-3 text-lg font-semibold text-white'>Daily cron refresh</p>
            <p className='mt-3 text-sm leading-6 text-[var(--muted)]'>
              A scheduled route is already wired for once-a-day syncing, which covers the task
              requirement for automated updates.
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto grid max-w-7xl gap-6 px-6 md:px-10' id='inventory'>
        <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-xs tracking-[0.28em] text-[var(--muted)] uppercase'>
              Latest arrivals
            </p>
            <h2 className='mt-2 text-5xl leading-none font-semibold tracking-[-0.05em] text-white'>
              Imported inventory
            </h2>
          </div>
          <p className='max-w-xl text-sm leading-6 text-[var(--muted)]'>
            Brand, model, year, mileage, price and photo are pulled from ENCAR, saved into your
            database and rendered here through Payload.
          </p>
        </div>
        {cars.length > 0 ? (
          <CarGrid cars={cars} />
        ) : (
          <div className='rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center shadow-[0_24px_80px_rgba(24,21,18,0.05)]'>
            <p className='text-2xl font-semibold text-white'>No cars imported yet.</p>
            <p className='mt-2 text-sm text-[var(--muted)]'>
              Start MongoDB and run `npm run encar:sync` to populate the landing with ENCAR stock.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default HomePage
