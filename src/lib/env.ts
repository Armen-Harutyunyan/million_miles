const getEnvValue = (key: keyof NodeJS.ProcessEnv, fallback?: string): string => {
  const value = process.env[key]

  if (typeof value === 'string' && value.trim().length > 0) {
    return value
  }

  if (typeof fallback === 'string') {
    return fallback
  }

  throw new Error(`Missing required environment variable: ${key}`)
}

const getEnvNumber = (key: keyof NodeJS.ProcessEnv, fallback: number): number => {
  const value = process.env[key]

  if (!value) {
    return fallback
  }

  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Environment variable ${key} must be a valid number`)
  }

  return parsedValue
}

export const env = {
  cronSecret: getEnvValue('CRON_SECRET', 'local-cron-secret'),
  encarPageSize: getEnvNumber('ENCAR_PAGE_SIZE', 24),
  encarQuery: getEnvValue('ENCAR_QUERY', '(And.Hidden.N._.CarType.N.)'),
  encarSyncPages: getEnvNumber('ENCAR_SYNC_PAGES', 3),
  mongoUri: getEnvValue('MONGODB_URI', 'mongodb://127.0.0.1:27017/million_miles'),
  payloadSecret: getEnvValue('PAYLOAD_SECRET'),
  siteUrl: getEnvValue('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
} as const
