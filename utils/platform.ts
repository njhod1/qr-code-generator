export type Platform = 'PayPal' | 'UPI' | 'Stripe' | 'Crypto' | 'SEPA' | 'Generic'

export const detectPlatform = (url: string): Platform => {
  const lower = url.toLowerCase()
  if (lower.includes('paypal')) return 'PayPal'
  if (lower.includes('upi://')) return 'UPI'
  if (lower.includes('stripe.com')) return 'Stripe'
  if (lower.startsWith('bitcoin:') || lower.startsWith('ethereum:')) return 'Crypto'
  if (lower.startsWith('sepa://')) return 'SEPA'
  return 'Generic'
}

export const platformIcon = (platform: Platform): string => {
  switch (platform) {
    case 'PayPal': return '💸'
    case 'UPI': return '🇮🇳'
    case 'Stripe': return '💳'
    case 'Crypto': return '🪙'
    case 'SEPA': return '🇪🇺'
    default: return '🌐'
  }
}

export const platformTemplates: Record<string, string> = {
  PayPal: 'https://paypal.me/yourname',
  UPI: 'upi://pay?pa=your@upiid&pn=Your Name',
  Stripe: 'https://buy.stripe.com/test_123456',
  Crypto: 'bitcoin:youraddress',
  SEPA: 'sepa://iban=DE89370400440532013000&name=Your Name&amount=25.00',
  Generic: '',
}