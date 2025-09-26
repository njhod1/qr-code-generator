import QRForm from '../components/QRForm'

export default function VCardPage() {
  return (
    <main>
      <h1>Create a QR Code for Your Digital Business Card</h1>
      <p>Share your contact details instantly — perfect for networking, events, and professional profiles.</p>
      <QRForm useCase="vcard" />
    </main>
  )
}