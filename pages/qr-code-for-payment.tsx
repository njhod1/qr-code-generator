import QRFormPayment from '../components/QRFormPayment'

export default function QRCodeForPaymentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
        Payment QR Code Generator
      </h1>
      <QRFormPayment />
    </main>
  )
}