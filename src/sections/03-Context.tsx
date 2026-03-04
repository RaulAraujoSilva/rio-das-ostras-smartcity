import Section from '../components/Section'
import StatCounter from '../components/StatCounter'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

const PROBLEMS = [
  {
    icon: 'database',
    title: 'Silos de Dados',
    description: 'Defesa civil não fala com trânsito, que não fala com saúde. Cada secretaria opera isolada com seus próprios sistemas.',
    color: '#D32F2F',
  },
  {
    icon: 'clock',
    title: 'Resposta Lenta',
    description: 'Horas entre a ocorrência e a ação coordenada. Cidadão liga para o 156, informação percorre cadeia burocrática manual.',
    color: '#FF6D00',
  },
  {
    icon: 'eye-off',
    title: 'Decisões no Escuro',
    description: 'Gestores sem visão consolidada em tempo real. Decisões baseadas em intuição, não em dados integrados.',
    color: '#7C4DFF',
  },
  {
    icon: 'trending-down',
    title: 'Desperdício de Recursos',
    description: 'Equipes mobilizadas sem priorização por dados. Viaturas enviadas sem otimização de rota ou gravidade.',
    color: '#1E90FF',
  },
]

export default function Context() {
  return (
    <Section id="context" title="O Problema" subtitle="A maioria dos municípios brasileiros ainda opera de forma reativa">
      {/* Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}15` }}>
                <Icon name={p.icon} size={22} style={{ color: p.color }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-city-navy">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{p.description}</p>
              </div>
            </div>
            <div className="mt-3 w-full h-1 rounded-full bg-gray-100">
              <div className="h-full rounded-full" style={{ backgroundColor: p.color, width: '100%' }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Stats */}
      <div className="bg-city-light rounded-2xl p-8">
        <h3 className="text-xl font-bold text-city-navy text-center mb-6">
          Mas o mundo já está mudando...
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCounter value={50.6} suffix=" bi" prefix="US$" label="Mercado global de IA em Smart Cities (2025)" />
          <StatCounter value={460} suffix=" bi" prefix="US$" label="Projeção para 2034" />
          <StatCounter value={96} suffix="%" label="dos prefeitos interessados em IA" />
          <StatCounter value={2} suffix="%" label="já implementaram" />
        </div>
        <div className="text-center text-sm text-gray-500 mt-4 space-x-1">
          <span>Fontes:</span>
          <a href="https://www.precedenceresearch.com/ai-in-smart-cities-market" target="_blank" rel="noopener noreferrer" className="text-city-blue hover:text-city-cyan underline">Precedence Research, 2025</a>
          <span>|</span>
          <a href="https://www.nlc.org/wp-content/uploads/2025/01/AI-in-Cities-Report.pdf" target="_blank" rel="noopener noreferrer" className="text-city-blue hover:text-city-cyan underline">National League of Cities / Bloomberg, 2024</a>
        </div>
      </div>
    </Section>
  )
}
