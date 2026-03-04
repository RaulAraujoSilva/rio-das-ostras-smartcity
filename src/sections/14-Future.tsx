import { useState } from 'react'
import Section from '../components/Section'
import Icon from '../components/Icon'
import ImageLightbox from '../components/ImageLightbox'
import { motion } from 'framer-motion'

interface FutureSource { label: string; url: string }

const TRENDS = [
  {
    icon: 'message-circle',
    title: 'IA Generativa Municipal',
    description: 'LLMs treinados em dados locais para auxiliar gestores. "Pergunte ao assistente da prefeitura" — consulta rápida de histórico, normas e recomendações.',
    color: '#7C4DFF',
  },
  {
    icon: 'bot',
    title: 'Agentes Autônomos',
    description: 'Despacho automático de equipes, ajuste semafórico sem intervenção humana, respostas automáticas a chamados rotineiros do 156.',
    color: '#1E90FF',
  },
  {
    icon: 'globe',
    title: 'Gêmeos Digitais como Padrão',
    description: 'Simular impacto de obras, eventos e mudanças climáticas antes de agir. NVIDIA Omniverse Blueprint já permite isso em escala urbana.',
    color: '#00D4FF',
    image: './img/sources/nvidia-omniverse.png',
    sources: [
      { label: 'NVIDIA — Smart City AI Blueprint (Europe)', url: 'https://blogs.nvidia.com/blog/smart-city-ai-blueprint-europe/' },
    ] as FutureSource[],
  },
  {
    icon: 'zap',
    title: 'IA Física (Physical AI)',
    description: 'Convergência de IA com o mundo físico: drones autônomos, robótica urbana, simulação do mundo real para treinamento de modelos (NVIDIA Cosmos).',
    color: '#00C853',
    image: './img/sources/nvidia-smartcity.png',
    sources: [
      { label: 'NVIDIA — AI Agents for Urban Operations', url: 'https://blogs.nvidia.com/blog/smart-city-ai-agents-urban-operations/' },
    ] as FutureSource[],
  },
]

export default function Future() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; url?: string; label?: string } | null>(null)

  return (
    <Section id="future" title="O Futuro já Começou" dark>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {TRENDS.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${t.color}20` }}>
              <Icon name={t.icon} size={26} style={{ color: t.color }} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: t.color }}>{t.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-3">{t.description}</p>

            {/* Screenshot integrada */}
            {t.image && (
              <button
                onClick={() => setLightbox({ src: t.image!, alt: t.title, url: t.sources?.[0]?.url, label: t.sources?.[0]?.label })}
                className="w-full h-36 rounded-lg overflow-hidden mb-3 relative cursor-pointer group/img"
              >
                <img
                  src={t.image}
                  alt={t.title}
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

            {/* Links das fontes */}
            {t.sources && t.sources.length > 0 && (
              <div className="space-y-1">
                {t.sources.map((s, j) => (
                  <a
                    key={j}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-city-cyan transition-colors"
                    style={{ color: `${t.color}CC` }}
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

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-city-purple/20 to-city-cyan/20 border border-white/10 rounded-2xl p-8 text-center max-w-3xl mx-auto"
      >
        <p className="text-2xl font-bold text-white mb-4">
          "96% dos prefeitos querem usar IA, mas apenas 2% já implementaram."
        </p>
        <p className="text-white/50 text-sm mb-3">
          Fonte:{' '}
          <a
            href="https://www.nlc.org/wp-content/uploads/2025/01/AI-in-Cities-Report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-city-cyan/70 hover:text-city-cyan underline"
          >
            National League of Cities / Bloomberg Philanthropies, 2024
          </a>
        </p>
        <p className="text-city-cyan text-lg font-semibold">
          A janela de oportunidade é agora.
        </p>
      </motion.div>

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
