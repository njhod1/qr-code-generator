export const getSEOMetadata = (platform: string) => ({
  title: `Pay with ${platform} | QR by Nigel`,
  description: `Scan to pay via ${platform}. Fast, secure, and global.`,
  ogImage: `/og/${platform.toLowerCase()}.png`,
})