import Section from '../components/Section'

const agentComponents = [
  { name: 'Canal de Comunicação', desc: 'Chat, Email, Slack, WhatsApp', color: '#0081BF', icon: '💬' },
  { name: 'Cérebro (LLM)', desc: 'GPT, Claude, Gemini, Grok', color: '#003886', icon: '🧠' },
  { name: 'Memória', desc: 'Textos, banco de dados SQL, vetores', color: '#008A4B', icon: '💾' },
  { name: 'Ferramentas', desc: 'HTML, Python, Excel, APIs externas', color: '#E86D00', icon: '🔧' },
]

export default function ChatVsAgents() {
  return (
    <Section id="chat-vs-agents" title="De Chat a Agentes" subtitle="A IA evoluiu de responder perguntas para resolver tarefas complexas">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna esquerda — METR Time Horizons */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-xl font-bold mb-4 text-city-blue">Horizonte de Tarefas (METR)</h3>
          <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="./img/metr_time_horizons.png"
              alt="Gráfico METR Time Horizons — crescimento exponencial do horizonte de tarefas de agentes de IA"
              className="w-full rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
            />
          </a>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>O tempo de tarefa que agentes completam <strong className="text-city-dark">dobra a cada ~4 meses</strong>.</p>
            <div className="flex items-center gap-3 py-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">GPT-4 (2023)</span>
              <span className="text-gray-400">~24 min</span>
              <span className="text-city-orange font-bold">→</span>
              <span className="px-2 py-1 bg-green-50 rounded text-xs font-mono">Claude Opus 4.6 (2026)</span>
              <span className="text-green-700 font-semibold">~14,5 horas</span>
            </div>
            <p className="text-xs text-gray-500">Tarefas: engenharia de software, ML, cybersegurança. Medido por tempo de conclusão por especialistas humanos.</p>
          </div>
          <a href="https://metr.org/time-horizons/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center mt-3 text-sm text-city-blue hover:text-city-orange transition-colors">
            metr.org/time-horizons <span className="ml-1">→</span>
          </a>
        </div>

        {/* Coluna direita — Anatomia de um Agente */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-xl font-bold mb-4 text-green-700">Anatomia de um Agente de IA</h3>
          <img
            src="./img/agente_anatomia.png"
            alt="Diagrama de um agente de IA com canal, cérebro, memória e ferramentas"
            className="w-full rounded-lg border border-gray-100 mb-4"
          />
          <div className="space-y-3">
            {agentComponents.map(comp => (
              <div key={comp.name} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                <span className="text-2xl">{comp.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm" style={{ color: comp.color }}>{comp.name}</span>
                  <span className="text-gray-500 text-xs ml-2">— {comp.desc}</span>
                </div>
                <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: comp.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
