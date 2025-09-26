export default function QRFormSEPA() {
  const [formData, setFormData] = useState({
    iban: '',
    bic: '',
    name: '',
    amount: '',
    purpose: '',
    qrColor: '#000000',
  })

  const formatSEPA = () => {
    const { iban, bic, name, amount, purpose } = formData
    const params = new URLSearchParams({
      iban,
      bic,
      name,
      amount,
      purpose,
    })
    return `sepa://pay?${params.toString()}`
  }

  return (
    <form> {/* inputs for each field */} 
      <QRPreview value={formatSEPA()} color={formData.qrColor} filename="sepa-qr.png" />
    </form>
  )
}