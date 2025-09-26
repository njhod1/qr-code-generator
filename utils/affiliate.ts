export const getAffiliateURL = (platform: string, baseURL: string) => {
  const url = new URL(baseURL)
  url.searchParams.set('ref', 'nigel')
  url.searchParams.set('utm_source', platform.toLowerCase())
  return url.toString()
}