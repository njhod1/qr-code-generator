import { useState, ChangeEvent } from 'react'
import QRPreview from './QRPreview'

export default function QRFormWiFi() {
  const [formData, setFormData] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    qrColor: '#000000',
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatWiFi = (): string => {
    return `WIFI:T:${formData.encryption};S:${formData.ssid};P:${formData.password};;`
  }

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Network Name (SSID)</label>
        <input
          name="ssid"
          value={formData.ssid}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          placeholder="Enter your password"
          className="w-full px-3 py-2 pr-12 border border-gray-300 rounded text-gray-900 placeholder-gray-700 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {showPassword ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.175-4.875M6.343 6.343a9.96 9.96 0 0111.314 0M9.88 9.88a3 3 0 104.24 4.24"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            )}
          </svg>
        </button>
      </div>


        {formData.password.length > 0 && formData.password.length < 8 && (
          <p className="text-red-600 text-sm mt-1">Password must be at least 8 characters</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Encryption</label>
        <select
          name="encryption"
          value={formData.encryption}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
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

      <QRPreview
        value={formatWiFi()}
        color={formData.qrColor}
        filename={`wifi-${formData.ssid || 'network'}`}
      />
    </form>
  )
}