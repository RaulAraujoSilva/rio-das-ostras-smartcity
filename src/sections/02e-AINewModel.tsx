import { useState } from 'react'
import Section from '../components/Section'
import Icon from '../components/Icon'
import ImageLightbox from '../components/ImageLightbox'
import { motion } from 'framer-motion'

interface Source { label: string; url: string }

const CARDS = [
  {
    icon: 'cpu',
    title: 'IA substitui a Camada de Input',
    color: '#00D4FF',
    points: [
      'LLMs processam documentos, e-mails e chamados do 156, extraindo dados automaticamente',
      'Visão computacional interpreta câmeras e sensores sem operador humano',
      'IA alcança 99%+ de precisão vs 80% com OCR tradicional',
    ],
    sources: [
      { label: 'Oxford/JAMIA — IA para dados não-estruturados', url: 'https://academic.oup.com/jamiaopen/article/8/5/ooaf097/8248163' },
      { label: 'Prefeitura SP — Simplifica AI', url: 'https://prefeitura.sp.gov.br/w/prefeitura-desenvolve-ferramenta-de-intelig%C3%AAncia-artificial-para-simplificar-documentos-da-administra%C3%A7%C3%A3o-p%C3%BAblica' },
    ] as Source[],
  },
  {
    icon: 'bot',
    title: 'Agentes substituem o Tomador de Decisão',
    color: '#00C853',
    points: [
      'Agentes de IA analisam dados, tomam decisões e disparam ações sem intervenção humana',
      'Despacho automático de equipes, ajuste semafórico, respostas a chamados rotineiros',
      'Gartner: até 2028, 15% das decisões de trabalho serão feitas por agentes autônomos',
    ],
    sources: [
      { label: 'AWS — Rise of Autonomous Agents', url: 'https://aws.amazon.com/blogs/aws-insights/the-rise-of-autonomous-agents-what-enterprise-leaders-need-to-know-about-the-next-wave-of-ai/' },
      { label: 'IBM Think — AI Agents 2025', url: 'https://www.ibm.com/think/insights/ai-agents-2025-expectations-vs-reality' },
    ] as Source[],
  },
]

export default function AINewModel() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <Section id="ai-new-model" title="O que a IA traz de novo?" subtitle="De duas camadas humanas para automação fim-a-fim">
      {/* Infographic hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <button
          onClick={() => setLightbox({ src: './img/infographics/ai-new-model.png', alt: 'De Duas Camadas Humanas para Automação Fim-a-Fim' })}
          className="w-full max-w-4xl mx-auto block rounded-2xl overflow-hidden relative cursor-pointer group"
        >
          <img src="./img/infographics/ai-new-model.png" alt="De Duas Camadas Humanas para Automação Fim-a-Fim" className="w-full" loading="lazy" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Icon name="eye" size={14} className="text-white" />
              Ampliar
            </span>
          </div>
        </button>
      </motion.div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 max-w-4xl mx-auto"
      >
        <p className="text-gray-700 leading-relaxed">
          No modelo tradicional, para transformar <strong>dados não-estruturados</strong> (vídeos, documentos, chamados)
          em informação útil, precisávamos de <strong className="text-red-600">operadores humanos</strong> para interpretar e digitalizar.
          E para ir da informação à <strong>ação</strong>, precisávamos de <strong className="text-red-600">gestores humanos</strong> para
          analisar e decidir. Cada camada humana introduzia <em>atraso, custo e erro</em>.
        </p>
        <p className="text-gray-700 leading-relaxed mt-3">
          Com a IA, <strong className="text-city-blue">LLMs e visão computacional</strong> substituem a primeira camada,
          estruturando dados automaticamente. E <strong className="text-green-600">agentes de IA</strong> substituem a segunda,
          interpretando dados e acionando respostas <em>em segundos, não dias</em>.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-white rounded-xl border-2 p-6 shadow-sm flex flex-col"
            style={{ borderColor: `${card.color}30` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                <Icon name={card.icon} size={22} style={{ color: card.color }} />
              </div>
              <h3 className="font-bold text-city-navy text-lg">{card.title}</h3>
            </div>
            <ul className="space-y-2 flex-1">
              {card.points.map((p, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-1">
              {card.sources.map((s, j) => (
                <a
                  key={j}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-city-blue hover:text-city-cyan transition-colors"
                >
                  <Icon name="external-link" size={11} className="shrink-0" />
                  <span className="line-clamp-1">{s.label}</span>
                </a>
              ))}
            </div>
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
