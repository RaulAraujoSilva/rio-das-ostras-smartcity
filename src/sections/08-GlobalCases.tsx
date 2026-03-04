import Section from '../components/Section'
import CaseCard from '../components/CaseCard'

const CASES = [
  {
    city: 'Singapura',
    country: 'Singapura',
    metrics: [
      { value: '110K+', label: 'postes inteligentes' },
      { value: '-15%', label: 'tempo deslocamento' },
      { value: '80%', label: 'cruzamentos com IA' },
      { value: '100+', label: 'soluções GenAI' },
    ],
    highlight: 'Gêmeo Digital Nacional',
    description: 'Primeiro país do mundo com gêmeo digital completo. Smart Nation 2.0 (2024) com IA no centro da estratégia. 110.000 postes inteligentes coletando dados urbanos.',
    color: '#D32F2F',
    image: './img/sources/singapore-smartnation.png',
    sources: [
      { label: 'Smart Nation Singapore', url: 'https://www.smartnation.gov.sg/' },
      { label: 'Smart Nation 2.0 Report (PDF)', url: 'https://file.go.gov.sg/smartnation2-report.pdf' },
    ],
  },
  {
    city: 'Hangzhou',
    country: 'China',
    metrics: [
      { value: '5o→57o', label: 'ranking congestionamento' },
      { value: '20+', label: 'cidades implantadas' },
      { value: 'v3.0', label: 'City Brain (2025)' },
      { value: '24/7', label: 'policial virtual IA' },
    ],
    highlight: 'City Brain — Alibaba',
    description: 'O City Brain 3.0 integra DeepSeek-R1 para gestão urbana auto-evolutiva. Agrega dados de câmeras, GPS, redes sociais e polícia de trânsito em tempo real.',
    color: '#FF6D00',
    image: './img/sources/hangzhou-citybrain.png',
    sources: [
      { label: 'Hangzhou City Brain 3.0 (gov.cn)', url: 'https://www.ehangzhou.gov.cn/2025-04/01/c_293162.htm' },
      { label: 'City Brain 3.0 launch (EN)', url: 'https://en.hangzhou.com.cn/News/content/2025-04/02/content_8965679.html' },
    ],
  },
  {
    city: 'Barcelona',
    country: 'Espanha',
    metrics: [
      { value: '1.800+', label: 'sensores' },
      { value: '1.3M', label: 'registros/dia' },
      { value: '-25%', label: 'consumo de água' },
      { value: 'Open', label: 'Sentilo (open-source)' },
    ],
    highlight: 'Plataforma Sentilo',
    description: 'Plataforma open-source que centraliza dados de sensores e atuadores. 20.000 medidores inteligentes para monitorar irrigação e níveis de água, economizando ~US$555.000/ano.',
    color: '#1E90FF',
    image: './img/sources/barcelona-sentilo.png',
    sources: [
      { label: 'Sentilo Platform (open-source)', url: 'https://www.sentilo.io/' },
      { label: 'Barcelona Sensors Network', url: 'https://ajuntament.barcelona.cat/digital/en/technology-service-citizens/technology-sustainable-city/sentilo-barcelona-sensors-network' },
      { label: 'Harvard DataSmart — Barcelona IoT', url: 'https://datasmart.hks.harvard.edu/news/article/how-smart-city-barcelona-brought-the-internet-of-things-to-life-789' },
    ],
  },
  {
    city: 'Seoul',
    country: 'Coreia do Sul',
    metrics: [
      { value: '50.000', label: 'sensores IoT' },
      { value: '-29%', label: 'tempo deslocamento' },
      { value: '4o', label: 'Plano Smart City' },
      { value: '2024', label: '1o plano municipal IA' },
    ],
    highlight: 'AI Smart Intersection',
    description: 'Primeiro plano de administração municipal com IA na Coreia do Sul (2024). 4o Plano Smart City (2024-2028) com 50.000 sensores IoT e monitoramento ambiental integrado.',
    color: '#00C853',
    image: './img/sources/seoul-smartcity.png',
    sources: [
      { label: 'Seoul Smart City Policy', url: 'https://english.seoul.go.kr/seoul-the-worlds-best-e-government-to-a-smart-city/' },
    ],
  },
  {
    city: 'Kaohsiung',
    country: 'Taiwan',
    metrics: [
      { value: '-80%', label: 'tempo resposta' },
      { value: '30K+', label: 'câmeras integradas' },
      { value: 'NVIDIA', label: 'Linker Vision' },
      { value: '12', label: 'departamentos integrados' },
    ],
    highlight: 'Resposta a Incidentes',
    description: 'Redução de 80% no tempo de resposta a incidentes com integração total de emergência. IA analisa vídeo de 30.000+ câmeras em tempo real e distribui alertas para 12 departamentos.',
    color: '#7C4DFF',
    image: './img/sources/nvidia-smartcity.png',
    sources: [
      { label: 'NVIDIA — Linker Vision Case Study', url: 'https://www.nvidia.com/en-us/customer-stories/linker-vision-ai-smart-city-solutions/' },
      { label: 'Linker Vision — Computex 2025 (PR Newswire)', url: 'https://www.prnewswire.com/news-releases/linker-vision-showcases-city-scale-digital-twin-and-ai-innovation-at-computex-2025-302457615.html' },
    ],
  },
]

export default function GlobalCases() {
  return (
    <Section id="global-cases" title="Casos Globais" subtitle="Cidades que já transformaram sua gestão com IA — e os números comprovam">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CASES.map(c => (
          <CaseCard key={c.city} {...c} />
        ))}
      </div>
    </Section>
  )
}
