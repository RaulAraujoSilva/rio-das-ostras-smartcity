import Section from '../components/Section'
import SimpleImageLightbox from '../components/SimpleImageLightbox'

const benchmarks = [
  { name: 'TRACKING AI', url: 'https://trackingai.org/home', img: './img/benchmarks/benchmark_trackingai_home.png' },
  { name: 'SWE-Bench', url: 'https://swebench.com', img: './img/benchmarks/benchmark_swebench.png' },
  { name: 'Arena AI (Chatbot Arena)', url: 'https://arena.ai/leaderboard', img: './img/benchmarks/benchmark_chatbot_arena.png' },
  { name: 'ARC-AGI', url: 'https://arcprize.org/leaderboard', img: './img/benchmarks/benchmark_arc_agi.png' },
  { name: 'FrontierMath', url: 'https://epoch.ai/frontiermath', img: './img/benchmarks/benchmark_frontiermath.png' },
  { name: "Humanity's Last Exam", url: 'https://lastexam.ai', img: './img/benchmarks/benchmark_humanitys_last_exam.png' },
  { name: 'Artificial Analysis', url: 'https://artificialanalysis.ai/', img: './img/benchmarks/benchmark_artificialanalysis_intelligence.png' },
  { name: 'IMO 2025', url: 'https://imo-official.org', img: './img/benchmarks/benchmark_imo_2025.png' },
]

const timeline = [
  { year: '2022', event: 'ChatGPT lançado', detail: 'GPT-3.5 inicia era dos chatbots' },
  { year: '2023', event: 'GPT-4 + Gemini', detail: 'Multimodalidade e raciocínio avançado' },
  { year: '2024', event: 'Agentes + Claude 3.5', detail: 'Coding assistants e agentes autônomos' },
  { year: '2025', event: 'GPT-5 + Gemini 3', detail: 'Deep Research, 1M+ tokens, ARC-AGI' },
  { year: '2026', event: 'Era dos Agentes', detail: 'GPT-5.3-Codex, Gemini 3.1, Claude Opus 4.6, Grok 4.20' },
]

export default function Evolution() {
  return (
    <Section id="evolution" title="A IA Evoluiu — E Continua Acelerando" subtitle="De chatbots simples a agentes autônomos que resolvem problemas reais">
      {/* Timeline */}
      <div className="flex overflow-x-auto gap-4 pb-4 mb-12 scrollbar-thin">
        {timeline.map((t, i) => (
          <div key={i} className="flex-shrink-0 w-52">
            <div className="relative pl-6 border-l-3 border-city-blue pb-8">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-city-blue border-2 border-white" />
              <span className="text-2xl font-extrabold text-city-navy">{t.year}</span>
              <p className="font-semibold text-city-dark mt-1">{t.event}</p>
              <p className="text-sm text-gray-500">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Carrossel dos LLMs */}
      <div className="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-city-navy mb-2">O Carrossel dos LLMs</h3>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Cada empresa anuncia <strong>"o modelo mais poderoso do mundo"</strong> — e semanas depois
          é ultrapassada. Os ciclos de lançamento estão se acelerando drasticamente:
          em 2023 duravam <strong>~6 meses</strong>, em 2024 caíram para <strong>~3 meses</strong>,
          e em 2025/26 novos modelos surgem a cada <strong>2–4 semanas</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <SimpleImageLightbox
              src="./img/llm_carousel_race.png"
              alt="Carrossel dos modelos LLM — cada empresa anuncia o modelo mais poderoso do mundo"
              className="rounded-xl shadow-lg max-w-full h-auto border border-gray-200"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-2xl shrink-0">🔄</span>
              <div>
                <p className="font-semibold text-city-navy">Ciclo contínuo de superação</p>
                <p className="text-sm text-gray-600">Gemini → Grok → DeepSeek → Qwen → OpenAI → Claude — e volta ao início</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-2xl shrink-0">⏱️</span>
              <div>
                <p className="font-semibold text-city-navy">Aceleração exponencial</p>
                <p className="text-sm text-gray-600">O tempo entre lançamentos diminui a cada ciclo — a "liderança" dura cada vez menos</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-2xl shrink-0">🌍</span>
              <div>
                <p className="font-semibold text-city-navy">Competição global</p>
                <p className="text-sm text-gray-600">Não são só EUA: DeepSeek, Qwen (Alibaba), Kimi (Moonshot) e Zhipu (China) também disputam o topo</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-2xl shrink-0">💡</span>
              <div>
                <p className="font-semibold text-city-navy">Impacto para gestores públicos</p>
                <p className="text-sm text-gray-600">O melhor modelo de hoje pode não ser o melhor amanhã — é preciso avaliar capacidades, não marcas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmarks Grid */}
      <h3 className="text-2xl font-bold text-city-navy mb-6">Benchmarks — Como Medimos a Inteligência</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benchmarks.map(b => (
          <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-city-blue hover:shadow-lg transition-all">
            <div className="h-36 overflow-hidden bg-gray-50">
              <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="font-semibold text-sm text-city-dark">{b.name}</span>
              <span className="text-city-blue text-xs font-semibold">Abrir →</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}
