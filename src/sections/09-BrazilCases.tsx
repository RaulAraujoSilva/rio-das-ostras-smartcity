import Section from '../components/Section'
import CaseCard from '../components/CaseCard'
import { motion } from 'framer-motion'

const CASES = [
  {
    city: 'Rio de Janeiro',
    country: 'Brasil',
    metrics: [
      { value: 'COR-Rio', label: 'centro de operações' },
      { value: '2025', label: 'IA em câmeras' },
      { value: 'IRIS', label: '3.000 situações detectadas' },
      { value: 'Referência', label: 'mundial' },
    ],
    highlight: 'Visão Computacional',
    description: 'O Centro de Operações Rio (COR) implantou o sistema IRIS com IA em câmeras da cidade para detecção de anomalias em túneis (Santa Bárbara, Zuzu Angel, Rebouças) e vias. Referência mundial em operação integrada.',
    color: '#00C853',
    image: './img/sources/rio-cor.png',
    sources: [
      { label: 'COR-Rio (site oficial)', url: 'https://cor.rio/' },
      { label: 'COR-Rio inicia IA em câmeras (2025)', url: 'https://cor.rio/cor-rio-inicia-a-utilizacao-de-inteligencia-artifical-ia-em-cameras-da-cidade-para-aprimorar-a-operacao/' },
    ],
  },
  {
    city: 'Curitiba',
    country: 'Brasil',
    metrics: [
      { value: '100%', label: 'cobertura 5G' },
      { value: '1a', label: 'Secretaria de IA' },
      { value: '2023', label: 'Smart City Award' },
      { value: 'SEDEIA', label: 'secretaria criada 2024' },
    ],
    highlight: 'Pioneira em IA Municipal',
    description: 'Eleita "Cidade Mais Inteligente do Mundo 2023" no World Smart City Awards em Barcelona. Primeira cidade brasileira a criar Secretaria de Inteligência Artificial (SEDEIA, março 2024).',
    color: '#1E90FF',
    image: './img/sources/curitiba-ia.png',
    sources: [
      { label: 'Curitiba cria 1a Secretaria de IA do Brasil', url: 'https://www.curitiba.pr.gov.br/noticias/curitiba-ganha-a-1-secretaria-de-inteligencia-artificial-do-brasil-na-abertura-do-smart-city-expo/72723' },
      { label: 'Prêmio Smart City Award 2023', url: 'https://www.inova.pr.gov.br/Noticia/Entre-mais-inteligentes-do-mundo-Curitiba-e-Assai-recebem-trofeu-em-Barcelona' },
    ],
  },
  {
    city: 'São José dos Campos',
    country: 'Brasil',
    metrics: [
      { value: '2025', label: 'piloto iniciado' },
      { value: 'IA', label: 'visão computacional' },
      { value: 'Sandbox', label: 'regulatório municipal' },
      { value: 'Real-time', label: 'segurança pública' },
    ],
    highlight: 'Segurança com IA',
    description: 'Piloto de visão computacional para segurança urbana em sandbox regulatório municipal (criado em abril 2023). Detecção de comportamento suspeito e botão de pânico com comunicação em tempo real com a polícia.',
    color: '#7C4DFF',
    image: './img/sources/sjc-sandbox.png',
    sources: [
      { label: 'Sandbox regulatório — Prefeitura SJC', url: 'https://www.sjc.sp.gov.br/noticias/2024/dezembro/10/sandbox-seleciona-projetos-inovadores-em-sao-jose/' },
      { label: 'IA na segurança pública de SJC', url: 'https://informa.life/sao-jose-dos-campos-testa-sistema-de-ia-na-seguranca-publica/' },
    ],
  },
  {
    city: 'São Paulo',
    country: 'Brasil',
    metrics: [
      { value: 'CET-SP', label: 'centro de gerenciamento' },
      { value: '2.586', label: 'cruzamentos até 2026' },
      { value: 'Real-time', label: 'tráfego' },
      { value: '12M+', label: 'população atendida' },
    ],
    highlight: 'Mobilidade Inteligente',
    description: 'Centro de Gerenciamento de Tráfego (CET-SP) com semáforos inteligentes: câmeras contam veículos e a IA ajusta os tempos em tempo real. Plano para 2.586 cruzamentos até o fim de 2026.',
    color: '#FF6D00',
    image: './img/sources/saopaulo-cet.png',
    sources: [
      { label: 'CET-SP — Revitalização Semafórica', url: 'https://www.cetsp.com.br/consultas/seguranca-e-mobilidade/revitalizacao-semaforica.aspx' },
      { label: 'Semáforos inteligentes em SP (Exame)', url: 'https://exame.com/brasil/sp-instala-primeiros-semaforos-inteligentes-entenda-como-dispositivos-vao-impactar-o-transito/' },
    ],
  },
]

export default function BrazilCases() {
  return (
    <Section id="brazil-cases" title="Casos Brasileiros" subtitle="O Brasil já começou — e tem experiências para aprender">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {CASES.map(c => (
          <CaseCard key={c.city} {...c} />
        ))}
      </div>

      {/* Rio das Ostras callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-city-blue to-city-cyan rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-3">E Rio das Ostras?</h3>
        <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
          Com a chegada do 5G, Rio das Ostras tem a <strong>oportunidade única</strong> de
          implementar um centro de monitoramento inteligente <strong>desde o início</strong>,
          sem legado tecnológico. Uma vantagem competitiva que grandes cidades não tiveram.
        </p>
      </motion.div>
    </Section>
  )
}
