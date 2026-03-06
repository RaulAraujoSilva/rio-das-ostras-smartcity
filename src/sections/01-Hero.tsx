import { motion } from 'framer-motion'

const SITE_URL = 'https://rio-das-ostras-smartcity.vercel.app'
const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(SITE_URL)}&bgcolor=0A1628&color=00D4FF&margin=4`

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 40%, #1E90FF 100%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #00D4FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-city-cyan text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-city-cyan animate-pulse" />
            Seminário 5G e Smart City — Rio das Ostras | 11 de março de 2026
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
        >
          Centro de Monitoramento{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-city-cyan to-city-blue">
            Inteligente
          </span>{' '}
          Municipal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
        >
          IA + Dados em Tempo Real para Cidades Mais Seguras e Eficientes
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <p className="text-city-cyan text-sm font-semibold">Acesse a apresentação pelo celular</p>
          <img
            src={qrSrc}
            alt="QR Code para acessar a apresentação"
            className="w-36 h-36 rounded-xl border-2 border-city-cyan/30 shadow-lg"
            loading="eager"
          />
          <p className="text-white/50 font-mono text-xs">rio-das-ostras-smartcity.vercel.app</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-sm">Role para explorar</span>
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-6"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  )
}
