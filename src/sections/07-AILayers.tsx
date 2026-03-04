import { useState } from 'react'
import Section from '../components/Section'
import Icon from '../components/Icon'
import ImageLightbox from '../components/ImageLightbox'
import { motion } from 'framer-motion'

interface AISource { label: string; url: string }

const AI_CAPABILITIES = [
  {
    icon: 'eye',
    title: 'Visão Computacional',
    description: 'Detecção automática de alagamentos, incêndios, acidentes e aglomerações em câmeras CFTV existentes.',
    example: 'COR-Rio: sistema IRIS detecta 3.000 situações em túneis e vias em tempo real (2025).',
    color: '#FF6D00',
    image: './img/sources/rio-cor.png',
    sources: [
      { label: 'COR-Rio inicia IA em câmeras (2025)', url: 'https://cor.rio/cor-rio-inicia-a-utilizacao-de-inteligencia-artifical-ia-em-cameras-da-cidade-para-aprimorar-a-operacao/' },
    ] as AISource[],
  },
  {
    icon: 'trending-up',
    title: 'Análise Preditiva',
    description: 'Previsão de alagamentos cruzando dados de chuva, topografia e histórico. Antecipação de demanda de emergência.',
    example: 'Barcelona: 1.800+ sensores Sentilo, 1.3M registros/dia, -25% consumo de água.',
    color: '#1E90FF',
    image: './img/sources/barcelona-sentilo.png',
    sources: [
      { label: 'Sentilo — Barcelona Sensors Network', url: 'https://ajuntament.barcelona.cat/digital/en/technology-service-citizens/technology-sustainable-city/sentilo-barcelona-sensors-network' },
      { label: 'Harvard DataSmart — Barcelona IoT', url: 'https://datasmart.hks.harvard.edu/news/article/how-smart-city-barcelona-brought-the-internet-of-things-to-life-789' },
    ] as AISource[],
  },
  {
    icon: 'message-square',
    title: 'NLP e LLMs',
    description: 'Classificação automática de chamados 156. Chatbot para o cidadão. Sumarização de ocorrências para gestores.',
    example: 'Hangzhou City Brain 3.0: integra DeepSeek-R1 para policial virtual 24/7 e saúde mental (1.8M usuários).',
    color: '#7C4DFF',
    image: './img/sources/hangzhou-citybrain.png',
    sources: [
      { label: 'City Brain 3.0 + DeepSeek-R1 (EN)', url: 'https://en.hangzhou.com.cn/News/content/2025-04/02/content_8965679.html' },
    ] as AISource[],
  },
  {
    icon: 'route',
    title: 'Otimização',
    description: 'Roteamento inteligente de viaturas. Sincronização semafórica adaptativa. Alocação dinâmica de equipes.',
    example: 'Singapura: 110K+ postes inteligentes, Smart Nation 2.0 com IA no centro da estratégia.',
    color: '#00C853',
    image: './img/sources/singapore-smartnation.png',
    sources: [
      { label: 'Smart Nation Singapore', url: 'https://www.smartnation.gov.sg/' },
      { label: 'Smart Nation 2.0 Report (PDF)', url: 'https://file.go.gov.sg/smartnation2-report.pdf' },
    ] as AISource[],
  },
]

export default function AILayers() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; url?: string; label?: string } | null>(null)

  return (
    <Section id="ai-layers" title="IA em Ação: 4 Capacidades" subtitle="Como a inteligência artificial transforma dados brutos em decisões inteligentes" dark>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AI_CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cap.color}20` }}>
                <Icon name={cap.icon} size={22} style={{ color: cap.color }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: cap.color }}>{cap.title}</h3>
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-3">{cap.description}</p>

            {/* Screenshot integrada ao card */}
            {cap.image && (
              <button
                onClick={() => setLightbox({ src: cap.image, alt: cap.title, url: cap.sources[0]?.url, label: cap.sources[0]?.label })}
                className="w-full h-36 rounded-lg overflow-hidden mb-3 relative cursor-pointer group/img"
              >
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover/img:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Icon name="eye" size={14} className="text-white" />
                    Ampliar
                  </span>
                </div>
              </button>
            )}

            <div className="bg-white/5 rounded-lg p-3 border-l-3" style={{ borderColor: cap.color }}>
              <p className="text-xs text-white/60 italic">{cap.example}</p>
            </div>

            {/* Links das fontes */}
            {cap.sources.length > 0 && (
              <div className="mt-3 space-y-1">
                {cap.sources.map((s, j) => (
                  <a
                    key={j}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-city-cyan transition-colors"
                    style={{ color: `${cap.color}CC` }}
                  >
                    <Icon name="external-link" size={11} className="shrink-0" />
                    <span className="line-clamp-1">{s.label}</span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          sourceUrl={lightbox.url}
          sourceLabel={lightbox.label}
          onClose={() => setLightbox(null)}
        />
      )}
    </Section>
  )
}
