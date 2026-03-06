interface QRAccessProps {
  sectionId: string
  label?: string
  dark?: boolean
}

const BASE_URL = 'https://rio-das-ostras-smartcity.vercel.app'

export default function QRAccess({ sectionId, label = 'Acesse pelo celular e participe!', dark = true }: QRAccessProps) {
  const url = `${BASE_URL}/#${sectionId}`
  const qrBg = dark ? '0A1628' : 'FFFFFF'
  const qrFg = dark ? '00D4FF' : '0A1628'
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=${qrBg}&color=${qrFg}&margin=8`

  return (
    <div className={`flex flex-col items-center gap-4 p-6 rounded-2xl backdrop-blur-sm ${
      dark
        ? 'bg-white/5 border border-white/10'
        : 'bg-city-navy/5 border border-city-navy/10'
    }`}>
      <p className={`font-bold text-lg text-center ${dark ? 'text-city-cyan' : 'text-city-navy'}`}>{label}</p>
      <img
        src={qrSrc}
        alt={`QR Code para ${url}`}
        className={`w-56 h-56 rounded-xl border-2 shadow-lg ${dark ? 'border-city-cyan/30' : 'border-city-navy/20'}`}
        loading="eager"
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-center font-mono text-sm px-4 py-2 rounded-lg border transition-colors break-all ${
          dark
            ? 'text-white/80 bg-white/10 border-white/10 hover:bg-white/20'
            : 'text-city-navy/80 bg-city-navy/5 border-city-navy/10 hover:bg-city-navy/10'
        }`}
      >
        {url}
      </a>
      <p className={`text-xs text-center ${dark ? 'text-white/40' : 'text-gray-400'}`}>Aponte a câmera do celular para o QR Code</p>
    </div>
  )
}
