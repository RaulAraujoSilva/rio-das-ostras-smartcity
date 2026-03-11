import Section from '../components/Section'
import { motion } from 'framer-motion'
import Icon from '../components/Icon'

const FORMATION = [
  { icon: 'cpu', label: 'Mestre — COPPE/UFRJ', detail: 'Engenharia de Sistemas e Computação' },
  { icon: 'file-text', label: 'MBA — FGV', detail: 'Gerenciamento de Projetos' },
  { icon: 'scale', label: 'Bacharel em Direito — UERJ', detail: 'Formação jurídica' },
  { icon: 'shield', label: 'TCE-RJ / AGENERSA', detail: 'Servidor de carreira há 25+ anos' },
]

const ACHIEVEMENTS = [
  'Implantação de processo eletrônico no Estado do RJ',
  'Auditoria contínua baseada em dados',
  'Gestão do conhecimento e metodologias BIM',
  'Modernização institucional e governança orientada a dados',
]

export default function Speaker() {
  return (
    <Section id="speaker" title="Palestrante">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Coluna 1: Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-48 h-48 rounded-full border-4 border-white shadow-xl ring-4 ring-city-blue/20 overflow-hidden">
            <img
              src="./img/raul-foto.jpg"
              alt="Raul Araújo da Silva"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold text-city-navy mt-4">Raul Araújo da Silva</h3>
          <p className="text-city-blue font-semibold text-sm mt-1">Palestrante</p>

          <div className="mt-4 bg-city-cyan/10 rounded-xl border border-city-cyan/20 p-4 text-center max-w-xs">
            <p className="text-xs text-gray-600 leading-relaxed">
              <Icon name="bot" size={14} className="inline text-city-blue mr-1 -mt-0.5" />
              Tem dúvidas durante a palestra? Envie para o <strong>assistente virtual</strong> em
            </p>
            <a
              href="mailto:raularaujo@crie.ufrj.br"
              className="text-city-blue font-semibold text-sm hover:underline mt-1 inline-block"
            >
              raularaujo@crie.ufrj.br
            </a>
            <p className="text-[10px] text-gray-400 mt-1">Respostas em tempo real por IA</p>
          </div>
        </motion.div>

        {/* Coluna 2-3: Bio + Formação */}
        <div className="lg:col-span-2 space-y-6">
          <p className="text-gray-600 leading-relaxed">
            Servidor de carreira do Tribunal de Contas do Estado do Rio de Janeiro há mais de 25 anos,
            atualmente cedido à AGENERSA. Professor da Escola de Contas e Gestão, IBMEC e Universidade
            Veiga de Almeida, com atuação em <strong>Inteligência Artificial aplicada ao setor público</strong>,
            gestão estratégica e transformação digital.
          </p>

          {/* Formação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FORMATION.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              >
                <Icon name={f.icon} size={20} className="text-city-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-city-navy">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Realizações */}
          <div className="bg-city-navy/5 rounded-xl p-5">
            <h4 className="font-bold text-sm text-city-navy mb-3">Principais realizações</h4>
            <ul className="space-y-2">
              {ACHIEVEMENTS.map(a => (
                <li key={a} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-city-cyan mt-1.5 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
