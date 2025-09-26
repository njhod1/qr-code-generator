export default function QRFormCrypto() {
  const [formData, setFormData] = useState({
    currency: 'bitcoin',
    address: '',
    amount: '',
    qrColor: '#000000',
  })

  const formatCrypto = () => {
    const { currency, address, amount } = formData
    const base = `${currency}:${address}`
    return amount ? `${base}?amount=${amount}` : base
  }

  return (
    <form> {/* inputs for currency, address, amount */} 
      <QRPreview value={formatCrypto()} color={formData.qrColor} filename="crypto-qr.png" />
    </form>
  )
}