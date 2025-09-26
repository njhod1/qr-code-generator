import { useState, ChangeEvent } from 'react'
import QRPreview from './QRPreview'

interface QRFormProps {
  useCase: string
}

export default function QRForm({ useCase }: QRFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    jobTitle: '',
    website: '',
    address: '',
    qrColor: '#000000',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatVCard = (): string => {
    return `
BEGIN:VCARD
VERSION:3.0
FN:${formData.fullName}
TEL:${formData.phone}
EMAIL:${formData.email}
ORG:${formData.company}
TITLE:${formData.jobTitle}
URL:${formData.website}
ADR:${formData.address}
END:VCARD
    `.trim()
  }

  return (
    <form className="qr-form">
      <label>Full Name</label>
      <input name="fullName" value={formData.fullName} onChange={handleChange} required />

      <label>Phone Number</label>
      <input name="phone" value={formData.phone} onChange={handleChange} />

      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />

      <label>Company</label>
      <input name="company" value={formData.company} onChange={handleChange} />

      <label>Job Title</label>
      <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} />

      <label>Website</label>
      <input name="website" value={formData.website} onChange={handleChange} />

      <label>Address</label>
      <input name="address" value={formData.address} onChange={handleChange} />

      <label>QR Color</label>
      <input type="color" name="qrColor" value={formData.qrColor} onChange={handleChange} />

      <QRPreview value={formatVCard()} color={formData.qrColor} />
    </form>
  )
}