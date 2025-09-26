import { useState, ChangeEvent } from 'react'
import QRPreview from './QRPreview'
import {
  detectPlatform,
  platformIcon,
  platformTemplates,
  type Platform,
} from '../utils/platform'

export default function QRFormPayment() {
  const [formData, setFormData] = useState({
    url: '',
    amount: '',
    qrColor: '#000000',
  })

  const [platform, setPlatform] = useState<Platform>('Generic')
  const [error, setError] = useState('')

  // ✅ Logo logic with fallback
  const getLogoUrl = (platform: Platform): string | undefined => {
    const known = ['paypal', 'upi', 'stripe', 'crypto', 'sepa']
    return known.includes(platform.toLowerCase()) ? `/logos/${platform.toLowerCase()}.png` : undefined
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let updatedValue = value

    // Smart autofill
    if (name === 'url') {
      const lower = value.toLowerCase()
      if (lower === 'payp') updatedValue = platformTemplates.PayPal
      if (lower === 'upi') updatedValue = platformTemplates.UPI
      if (lower === 'stripe') updatedValue = platformTemplates.Stripe
      if (lower === 'crypto') updatedValue = platformTemplates.Crypto
      if (lower === 'sepa') updatedValue = platformTemplates.SEPA
    }

    const updated = { ...formData, [name]: updatedValue }
    setFormData(updated)
    const detected = detectPlatform(updated.url)
    setPlatform(detected)
    setError(validateURL(updated.url, detected))
  }

  const handlePlatformSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Platform
    setPlatform(selected)
    const template = platformTemplates[selected]
    setFormData((prev) => ({ ...prev, url: template }))
    setError(validateURL(template, selected))
  }

  const validateURL = (url: string, platform: Platform): string => {
    if (!url) return ''
    try {
      if (platform === 'PayPal' && !url.includes('paypal.me')) {
        return 'Invalid PayPal.Me link'
      }
      if (platform === 'UPI') {
        if (!url.startsWith('upi://pay')) return 'UPI link must start with upi://pay'
        if (!url.includes('pa=')) return 'UPI link must include payee (pa=)'
      }
      if (platform === 'Stripe' && !url.includes('stripe.com')) {
        return 'Invalid Stripe link'
      }
      if (platform === 'Crypto' && !url.startsWith('bitcoin:') && !url.startsWith('ethereum:')) {
        return 'Crypto link must start with bitcoin: or ethereum:'
      }
      if (platform === 'SEPA' && !url.startsWith('sepa://')) {
        return 'SEPA link must start with sepa://'
      }
      if (platform === 'Generic') {
        new URL(url)
      }
      return ''
    } catch {
      return 'Invalid URL format'
    }
  }

  const formatURL = (): string => {
    const { url, amount } = formData

    if (platform === 'PayPal') {
      try {
        const base = new URL(url)
        return amount ? `${base.href.replace(/\/$/, '')}/${amount}` : base.href
      } catch {
        return url
      }
    }

    if (platform === 'UPI') {
      try {
        const upi = new URL(url)
        if (amount) upi.searchParams.set('am', amount)
        return upi.toString()
      } catch {
        return url
      }
    }

    return url
  }

  const getFilename = (): string => {
    try {
      const domain = new URL(formData.url).hostname.replace(/\./g, '-')
      return `payment-${domain || 'qr'}.png`
    } catch {
      return 'payment-qr.png'
    }
  }

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Platform (optional)</label>
        <select
          onChange={handlePlatformSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="Generic">🌐 Generic / Custom</option>
          <option value="PayPal">💸 PayPal</option>
          <option value="UPI">🇮🇳 UPI</option>
          <option value="Stripe">💳 Stripe</option>
          <option value="Crypto">🪙 Crypto</option>
          <option value="SEPA">🇪🇺 SEPA</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Payment URL</label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          placeholder="Paste or type your payment link"
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-500"
        />
        {platform && (
          <p className="text-sm text-gray-600 mt-1">
            Detected: {platformIcon(platform)} {platform}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount (optional)</label>
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="25.00"
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">QR Color</label>
        <input
          type="color"
          name="qrColor"
          value={formData.qrColor}
          onChange={handleChange}
          className="w-16 h-10 border rounded"
        />
      </div>

      {!error && (
        <QRPreview
          value={formatURL()}
          color={formData.qrColor}
          filename={getFilename()}
          logoUrl={getLogoUrl(platform)}
        />
      )}
    </form>
  )
}