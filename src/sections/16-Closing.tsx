import { motion } from 'framer-motion'
import Icon from '../components/Icon'

const SITE_URL = 'https://rio-das-ostras-smartcity.vercel.app'
const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(SITE_URL)}&bgcolor=0A1628&color=00D4FF&margin=4`

export default function Closing() {
  return (
    <section
      id="closing"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1E90FF 0%, #1E3A5F 40%, #0A1628 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #00D4FF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Icon name="layers" size={32} className="text-city-cyan" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Obrigado!
          </h2>
          <p className="text-xl text-white/80 italic mb-8 max-w-2xl mx-auto">
            "A melhor maneira de prever o futuro é construí-lo."
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden shrink-0">
                <img
                  src="./img/raul-foto.jpg"
                  alt="Raul Araújo da Silva"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Raul Araújo da Silva</h3>
                <p className="text-city-cyan text-sm">Mestre COPPE/UFRJ | TCE-RJ | AGENERSA</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-white/70 mb-4">
              <p>Seminário 5G e Smart City</p>
              <p>Rio das Ostras — 11 de março de 2026</p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <a href="mailto:raularaujo@crie.ufrj.br" className="flex items-center gap-2 text-sm text-white/80 hover:text-city-cyan transition-colors">
                <Icon name="message-circle" size={16} className="shrink-0" />
                raularaujo@crie.ufrj.br
              </a>
              <a href="tel:+5521996666456" className="flex items-center gap-2 text-sm text-white/80 hover:text-city-cyan transition-colors">
                <Icon name="zap" size={16} className="shrink-0" />
                (21) 99666-6456
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center gap-3">
              <p className="text-xs text-white/50">
                Apresentação interativa disponível em:
              </p>
              <img
                src={qrSrc}
                alt="QR Code para acessar a apresentação"
                className="w-32 h-32 rounded-xl border-2 border-city-cyan/30 shadow-lg"
                loading="eager"
              />
              <p className="text-city-cyan font-mono text-sm">
                rio-das-ostras-smartcity.vercel.app
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
