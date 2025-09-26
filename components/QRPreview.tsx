import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

type QRPreviewProps = {
  value: string
  color: string
  filename: string
  logoUrl?: string
}

export default function QRPreview({ value, color, filename, logoUrl }: QRPreviewProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrInstance = useRef<QRCodeStyling | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !qrRef.current) return

    const image = new Image()
    image.src = logoUrl || ''
    image.onload = () => {
      setError(false)
      renderQR(logoUrl)
    }
    image.onerror = () => {
      console.warn('Logo failed to load:', logoUrl)
      setError(true)
      renderQR(undefined) // fallback without logo
    }

    function renderQR(imageUrl?: string) {
      if (!qrInstance.current) {
        qrInstance.current = new QRCodeStyling({
          width: 300,
          height: 300,
          data: value,
          image: imageUrl,
          dotsOptions: { color },
          imageOptions: { crossOrigin: 'anonymous', margin: 4 },
        })
        qrInstance.current.append(qrRef.current!)
      } else {
        qrInstance.current.update({
          data: value,
          image: imageUrl,
          dotsOptions: { color },
        })
      }
      setLoading(false)
    }
  }, [value, color, logoUrl])

  const handleDownload = () => {
    qrInstance.current?.download({ name: filename, extension: 'png' })
  }

  return (
    <div className="text-center space-y-2">
      {loading && (
        <div className="animate-pulse text-gray-500">Loading QR code…</div>
      )}
      {error && (
        <div className="text-sm text-red-600">
          Logo failed to load. QR rendered without branding.
        </div>
      )}
      <div ref={qrRef} />
      {!loading && (
        <button
          onClick={handleDownload}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download QR
        </button>
      )}
    </div>
  )
}