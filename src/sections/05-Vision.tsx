import { useState } from 'react'
import Section from '../components/Section'
import Icon from '../components/Icon'
import ImageLightbox from '../components/ImageLightbox'
import { motion } from 'framer-motion'

const PILLARS = [
  {
    icon: 'link',
    title: 'Integração',
    description: 'Fusão de câmeras, sensores IoT, chamados 156, dados climáticos e mobilidade em uma única plataforma.',
    color: '#00D4FF',
  },
  {
    icon: 'cpu',
    title: 'Inteligência',
    description: 'IA para detecção de anomalias, previsão de eventos, classificação de chamados e recomendação de ações.',
    color: '#7C4DFF',
  },
  {
    icon: 'zap',
    title: 'Ação',
    description: 'Alertas automáticos, despacho otimizado de equipes, comunicação direta com o cidadão em tempo real.',
    color: '#00C853',
  },
]

const AREAS = ['Trânsito', 'Saúde', 'Defesa Civil', 'Meio Ambiente']

export default function Vision() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <Section id="vision" title="A Visão: De Reativo para Preditivo" dark>
      {/* Infográfico hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <button
          onClick={() => setLightbox({ src: './img/infographics/vision-reactive-predictive.png', alt: 'De Reativo para Preditivo' })}
          className="w-full max-w-4xl mx-auto block rounded-2xl overflow-hidden relative cursor-pointer group"
        >
          <img src="./img/infographics/vision-reactive-predictive.png" alt="De Reativo para Preditivo" className="w-full" loading="lazy" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Icon name="eye" size={14} className="text-white" />
              Ampliar
            </span>
          </div>
        </button>
      </motion.div>

      {/* Before/After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-red-400 mb-4">Antes: Gestão Reativa</h3>
          <div className="grid grid-cols-2 gap-3">
            {AREAS.map(item => (
              <div key={item} className="bg-red-900/30 border border-red-500/20 rounded-lg p-3 text-center text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
          <p className="text-red-300/60 text-xs text-center mt-3">Cada área isolada, sem comunicação</p>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-city-cyan/10 border border-city-cyan/30 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-city-cyan mb-4">Depois: Monitoramento Inteligente</h3>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {AREAS.map(item => (
                <div key={item} className="bg-city-cyan/10 border border-city-cyan/30 rounded-lg p-3 text-center text-sm text-white/90">
                  {item}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-city-cyan/30 backdrop-blur-sm flex items-center justify-center border-2 border-city-cyan">
                <Icon name="cpu" size={28} className="text-city-cyan" />
              </div>
            </div>
          </div>
          <p className="text-city-cyan/60 text-xs text-center mt-3">Tudo integrado via centro inteligente com IA</p>
        </motion.div>
      </div>

      {/* Definition */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/5 border-l-4 border-city-cyan rounded-r-xl p-6 mb-12 max-w-4xl mx-auto"
      >
        <p className="text-lg text-white/90 italic leading-relaxed">
          "Um Centro de Monitoramento Inteligente integra dados de múltiplas fontes urbanas
          em tempo real, usando IA para antecipar ocorrências, priorizar recursos e apoiar
          decisões operacionais."
        </p>
      </motion.blockquote>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${p.color}20` }}>
              <Icon name={p.icon} size={28} style={{ color: p.color }} />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: p.color }}>{p.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </Section>
  )
}
