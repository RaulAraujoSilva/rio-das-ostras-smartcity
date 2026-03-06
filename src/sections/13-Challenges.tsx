import Section from '../components/Section'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

interface ChallengeSource { label: string; url: string }

const CHALLENGES = [
  {
    icon: 'lock',
    title: 'Privacidade vs. Vigilância',
    description: 'LGPD exige anonimização de vídeo e consentimento. O desafio é monitorar sem vigiar.',
    reference: 'Referência: Public Eye de Amsterdam — contagem anônima de pessoas com IA open-source.',
    sources: [
      { label: 'Public Eye — GitHub (Amsterdam)', url: 'https://github.com/Amsterdam/public-eye' },
      { label: 'ITU — Amsterdam crowd monitoring', url: 'https://www.itu.int/hub/2021/10/why-the-city-of-amsterdam-developed-its-own-crowd-monitoring-technology/' },
    ] as ChallengeSource[],
    color: '#D32F2F',
  },
  {
    icon: 'scale',
    title: 'Viés Algorítmico',
    description: 'Modelos treinados em dados enviesados podem reforçar desigualdades sociais e geográficas. Auditoria contínua e testes de fairness são essenciais.',
    sources: [
      { label: 'Harvard — Algorithmic Fairness in Cities', url: 'https://datasmart.hks.harvard.edu/news/article/algorithmic-fairness-tackling-bias-city-algorithms' },
      { label: 'CIDOB — AI Ethics in City Governance', url: 'https://www.cidob.org/en/publications/ai-ethics-policy-and-action-city-governance-algorithmic-decision-systems' },
    ] as ChallengeSource[],
    color: '#FF6D00',
  },
  {
    icon: 'file-text',
    title: 'Governança de Dados',
    description: 'Quem é responsável pelos dados? Comitê multisetorial, política de dados abertos, transparência algorítmica.',
    reference: 'Helsinki e Amsterdam possuem registros públicos de algoritmos desde 2020.',
    sources: [
      { label: 'Helsinki AI Register', url: 'https://ai.hel.fi/en/ai-register/' },
      { label: 'VentureBeat — Algorithm registries', url: 'https://venturebeat.com/ai/amsterdam-and-helsinki-launch-algorithm-registries-to-bring-transparency-to-public-deployments-of-ai/' },
    ] as ChallengeSource[],
    color: '#7C4DFF',
  },
  {
    icon: 'link',
    title: 'Interoperabilidade',
    description: 'Evitar dependência de fornecedor único (vendor lock-in). Priorizar padrões abertos, APIs documentadas e soluções open-source.',
    sources: [
      { label: 'FIWARE + OASC — Open Standards for Cities', url: 'https://www.fiware.org/news/fiware-foundation-and-oasc-strengthen-ties-to-drive-open-standards-and-innovation-in-cities-and-regions/' },
    ] as ChallengeSource[],
    color: '#1E90FF',
  },
  {
    icon: 'book-open',
    title: 'Capacitação',
    description: 'Formar equipe técnica local. Parcerias com universidades para transferência de conhecimento. Não basta comprar tecnologia — é preciso saber operá-la.',
    sources: [
      { label: 'UN-Habitat — Capacity Building for Smart Cities', url: 'https://unhabitat.org/programme/legacy/people-centered-smart-cities/building-capacity-for-people-centered-smart-cities-a' },
      { label: 'UNITAC — Treinamento para cidades brasileiras', url: 'https://unitac.un.org/en/2025-trainings-to-city-leaders' },
    ] as ChallengeSource[],
    color: '#00C853',
  },
]

export default function Challenges() {
  return (
    <Section id="challenges" title="Desafios e Governança" subtitle="Tecnologia sem governança é risco, não solução">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CHALLENGES.map((ch, i) => (
          <motion.div
            key={ch.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border-2 p-5 shadow-sm flex flex-col"
            style={{ borderColor: `${ch.color}30` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ch.color}15` }}>
                <Icon name={ch.icon} size={20} style={{ color: ch.color }} />
              </div>
              <h3 className="font-bold text-city-navy">{ch.title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{ch.description}</p>
            {ch.reference && (
              <p className="text-xs text-gray-500 italic mt-2">{ch.reference}</p>
            )}
            {ch.sources.length > 0 && (
              <div className="mt-auto pt-3 space-y-1">
                {ch.sources.map((s, j) => (
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
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
