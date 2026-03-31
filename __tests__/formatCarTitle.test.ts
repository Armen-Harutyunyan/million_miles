import { formatCarTitle } from '@/lib/formatCarTitle'

describe('formatCarTitle', () => {
  it('joins brand and model with normalized spacing', () => {
    expect(formatCarTitle('  Hyundai ', ' Avante  ')).toBe('Hyundai Avante')
  })

  it('returns the existing value when one side is empty', () => {
    expect(formatCarTitle('', 'Sonata')).toBe('Sonata')
  })
})
