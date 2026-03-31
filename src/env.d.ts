declare namespace NodeJS {
  interface ProcessEnv {
    CRON_SECRET?: string
    ENCAR_PAGE_SIZE?: string
    ENCAR_QUERY?: string
    ENCAR_SYNC_PAGES?: string
    MONGODB_URI?: string
    NEXT_PUBLIC_SITE_URL?: string
    PAYLOAD_SECRET?: string
  }
}
