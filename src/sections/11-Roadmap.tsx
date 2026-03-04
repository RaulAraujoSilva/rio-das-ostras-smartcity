import { useState } from 'react'
import Section from '../components/Section'
import TimelineStep from '../components/TimelineStep'
import ImageLightbox from '../components/ImageLightbox'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

const STEPS = [
  {
    step: 0,
    title: 'Diagnóstico e Integração de Dados',
    period: 'Meses 1-3',
    color: '#FF6D00',
    items: [
      'Mapear fontes existentes: câmeras CFTV, 156, defesa civil, trânsito',
      'Criar data lake municipal unificado (PostgreSQL + MinIO)',
      'Quick win: dashboard básico integrando 3+ fontes de dados',
      'Definir governança de dados e comitê multisetorial',
    ],
  },
  {
    step: 1,
    title: 'Conectividade 5G e Sensoriamento IoT',
    period: 'Meses 3-6',
    color: '#00C853',
    items: [
      'Aproveitar infraestrutura 5G para transmissão de vídeo em tempo real',
      'Pilotar sensores IoT: qualidade do ar, nível de rios, fluxo de tráfego',
      'Integrar com Waze/Google Maps para dados de mobilidade',
      'Rede LoRaWAN para sensores de longa distância e baixo consumo',
    ],
  },
  {
    step: 2,
    title: 'Primeiros Modelos de IA',
    period: 'Meses 6-9',
    color: '#1E90FF',
    items: [
      'Visão computacional em câmeras existentes (detecção de anomalias)',
      'Modelo preditivo de alagamento cruzando chuva + topografia + histórico',
      'Classificação automática de chamados do 156 com NLP',
      'Treinamento de equipe técnica local com universidades parceiras',
    ],
  },
  {
    step: 3,
    title: 'Centro de Operações Físico',
    period: 'Meses 9-12',
    color: '#7C4DFF',
    items: [
      'Sala de comando com videowall e estações operacionais',
      'Protocolos de resposta integrados entre secretarias',
      'Dashboards em tempo real (Grafana + Metabase + QGIS)',
      'Treinamento de operadores e simulações de emergência',
    ],
  },
  {
    step: 4,
    title: 'Gêmeo Digital e Escala',
    period: 'Ano 2+',
    color: '#00D4FF',
    items: [
      'Modelo 3D da cidade com dados em tempo real (Cesium/NVIDIA Omniverse)',
      'IA generativa para operadores — LLM treinado em dados municipais',
      'Agentes autônomos para tarefas rotineiras (despacho, alocação)',
      'Simulação de impacto de obras, eventos e cenários climáticos',
    ],
  },
]

export default function Roadmap() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <Section id="roadmap" title="Como Implementar" subtitle="5 passos práticos para um Centro de Monitoramento Inteligente">
      {/* Infográfico hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <button
          onClick={() => setLightbox({ src: './img/infographics/roadmap-timeline.png', alt: 'Timeline de Implementação' })}
          className="w-full max-w-4xl mx-auto block rounded-2xl overflow-hidden relative cursor-pointer group"
        >
          <img src="./img/infographics/roadmap-timeline.png" alt="Timeline de Implementação" className="w-full" loading="lazy" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Icon name="eye" size={14} className="text-white" />
              Ampliar
            </span>
          </div>
        </button>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {STEPS.map((s, i) => (
          <TimelineStep key={s.step} {...s} isLast={i === STEPS.length - 1} />
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
