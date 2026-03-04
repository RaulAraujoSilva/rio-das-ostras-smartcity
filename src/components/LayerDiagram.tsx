import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

interface Layer {
  id: string
  title: string
  icon: string
  color: string
  items: string[]
  description: string
}

const LAYERS: Layer[] = [
  {
    id: 'interface',
    title: 'Interface e Comando',
    icon: 'monitor',
    color: '#7C4DFF',
    items: ['Dashboards em tempo real', 'Alertas automáticos', 'App mobile para cidadão', 'Videowall de comando'],
    description: 'A camada de interface é onde operadores e gestores visualizam dados consolidados, recebem alertas e tomam decisões. Inclui salas de comando com videowall e aplicativos móveis para a população.',
  },
  {
    id: 'ia',
    title: 'Camada de IA',
    icon: 'cpu',
    color: '#1E90FF',
    items: ['Visão computacional', 'NLP e classificação de chamados', 'Modelos preditivos', 'LLMs para operadores'],
    description: 'A inteligência artificial analisa os dados processados para detectar anomalias em vídeo, classificar chamados do 156 automaticamente, prever alagamentos e recomendar ações aos operadores.',
  },
  {
    id: 'dados',
    title: 'Plataforma de Dados',
    icon: 'database',
    color: '#00D4FF',
    items: ['Ingestão (Kafka/MQTT)', 'Data Lake municipal', 'Processamento em tempo real', 'APIs abertas'],
    description: 'O cérebro técnico: recebe dados de todas as fontes, armazena em data lake, processa em tempo real com Apache Flink/Spark e disponibiliza via APIs para consumo por IA e dashboards.',
  },
  {
    id: 'conectividade',
    title: 'Conectividade 5G + IoT',
    icon: 'wifi',
    color: '#00C853',
    items: ['5G (alta velocidade, baixa latência)', 'LoRaWAN (sensores de longa distância)', 'Fibra óptica', 'WiFi público'],
    description: 'A rede 5G é o grande habilitador: permite transmissão de vídeo em tempo real, conexão massiva de sensores IoT e latência ultrabaixa para resposta imediata. Complementada por LoRaWAN para sensores de baixo consumo.',
  },
  {
    id: 'sensoriamento',
    title: 'Sensoriamento Urbano',
    icon: 'camera',
    color: '#FF6D00',
    items: ['Câmeras CFTV inteligentes', 'Sensores ambientais (ar, água, ruído)', 'GPS de frota municipal', 'Estações meteorológicas'],
    description: 'A base do sistema: sensores espalhados pela cidade coletam dados continuamente. Câmeras com IA detectam anomalias, sensores medem qualidade do ar e níveis de água, GPS rastreia frota pública.',
  },
]

export default function LayerDiagram() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {LAYERS.map((layer, index) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <button
            onClick={() => setExpanded(expanded === layer.id ? null : layer.id)}
            className="w-full text-left"
          >
            <div
              className="flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer"
              style={{
                borderColor: expanded === layer.id ? layer.color : '#e5e7eb',
                backgroundColor: expanded === layer.id ? `${layer.color}10` : 'white',
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${layer.color}20` }}>
                <Icon name={layer.icon} size={22} style={{ color: layer.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: layer.color }}>
                    Camada {LAYERS.length - index}
                  </span>
                  <h3 className="text-lg font-bold text-city-navy">{layer.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {layer.items.map(item => (
                    <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>
              </div>
              <motion.svg
                animate={{ rotate: expanded === layer.id ? 180 : 0 }}
                className="w-5 h-5 text-gray-400 shrink-0"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>

          <AnimatePresence>
            {expanded === layer.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 ml-14 border-l-3 rounded-b-xl" style={{ borderColor: layer.color }}>
                  <p className="text-sm text-gray-600 leading-relaxed">{layer.description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
