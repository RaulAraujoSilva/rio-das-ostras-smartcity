import { useState, useEffect, useCallback } from 'react'
import Section from '../components/Section'
import QRAccess from '../components/QRAccess'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts'

const OPTIONS = [
  { key: 'A', text: 'Orçamento limitado' },
  { key: 'B', text: 'Falta de profissionais capacitados' },
  { key: 'C', text: 'Resistência cultural e política' },
  { key: 'D', text: 'Infraestrutura de conectividade' },
  { key: 'E', text: 'Preocupações com privacidade e LGPD' },
]

const BAR_COLORS = ['#FF6D00', '#1E90FF', '#7C4DFF', '#00C853', '#D32F2F']

const STORAGE_KEY = 'smartcity-poll-voted'

type Votes = Record<string, number> & { total: number }

const API_URL = '/api/poll-readiness'

export default function Poll() {
  const [votes, setVotes] = useState<Votes>({ A: 0, B: 0, C: 0, D: 0, E: 0, total: 0 })
  const [selected, setSelected] = useState<string | null>(null)
  const [voted, setVoted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchResults = useCallback(async () => {
    try {
      const res = await fetch(API_URL)
      if (res.ok) {
        const data = await res.json()
        setVotes(data)
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const prev = localStorage.getItem(STORAGE_KEY)
    if (prev) {
      setVoted(true)
      setSelected(prev)
    }
    fetchResults()
  }, [fetchResults])

  useEffect(() => {
    const interval = setInterval(fetchResults, 5000)
    return () => clearInterval(interval)
  }, [fetchResults])

  const handleVote = async () => {
    if (!selected || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selected }),
      })
      if (res.ok) {
        const data = await res.json()
        setVotes(data)
        setVoted(true)
        localStorage.setItem(STORAGE_KEY, selected)
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const chartData = OPTIONS.map(o => ({
    name: o.key,
    votes: votes[o.key] || 0,
  }))

  return (
    <Section id="poll" title="Qual a maior barreira?" subtitle="Na sua opinião, o que mais dificulta a implementação de IA na gestão do seu município?" dark>
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-6 items-stretch">
        {/* QR Code — coluna estreita */}
        <div className="hidden lg:block w-56">
          <QRAccess sectionId="poll" label="Escaneie e vote pelo celular!" />
        </div>

        {/* Opções — coluna central */}
        <div className="flex flex-col">
          <div className="space-y-2 flex-1">
            {OPTIONS.map((o, i) => (
              <button
                key={o.key}
                onClick={() => !voted && setSelected(o.key)}
                disabled={voted}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3
                  ${voted && selected === o.key
                    ? 'border-city-cyan bg-city-cyan/10 shadow-md'
                    : selected === o.key
                      ? 'border-city-blue bg-city-blue/10 shadow-md'
                      : voted
                        ? 'border-white/10 bg-white/5 opacity-60'
                        : 'border-white/10 bg-white/5 hover:border-city-blue hover:bg-white/10 cursor-pointer'
                  }`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 text-white"
                  style={{ backgroundColor: selected === o.key ? BAR_COLORS[i] : '#374151' }}
                >
                  {o.key}
                </span>
                <span className="text-sm text-white/90 leading-snug">{o.text}</span>
              </button>
            ))}
          </div>

          {!voted ? (
            <button
              onClick={handleVote}
              disabled={!selected || submitting}
              className={`mt-3 px-6 py-2.5 rounded-full font-bold text-white text-sm transition-all
                ${selected
                  ? 'bg-city-cyan hover:bg-city-blue shadow-lg cursor-pointer'
                  : 'bg-gray-600 cursor-not-allowed'
                }`}
            >
              {submitting ? 'Enviando...' : 'Votar'}
            </button>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-city-green font-semibold text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Voto registrado!
            </div>
          )}

          {/* QR mobile-only */}
          <div className="mt-4 lg:hidden">
            <QRAccess sectionId="poll" label="Escaneie e vote pelo celular!" />
          </div>
        </div>

        {/* Resultados — coluna direita */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white">Resultados ao Vivo</h3>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="w-2 h-2 rounded-full bg-city-green animate-pulse" />
              {votes.total} votos
            </span>
          </div>

          {votes.total === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white/40 text-sm">
              Aguardando primeiros votos...
            </div>
          ) : (
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 50, left: 10, bottom: 5 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={30} tick={{ fill: '#ffffff', fontWeight: 700, fontSize: 14 }} />
                  <Bar dataKey="votes" radius={[0, 8, 8, 0]} animationDuration={600}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i]} />
                    ))}
                    <LabelList
                      dataKey="votes"
                      position="right"
                      formatter={(v: unknown) => {
                        const n = Number(v) || 0
                        const pct = votes.total > 0 ? Math.round((n / votes.total) * 100) : 0
                        return `${n}  (${pct}%)`
                      }}
                      style={{ fill: '#ffffff', fontWeight: 600, fontSize: 13 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-2 flex flex-wrap gap-2">
            {OPTIONS.map((o, i) => (
              <div key={o.key} className="flex items-center gap-1.5 text-xs text-white/50">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: BAR_COLORS[i] }} />
                <span>{o.key}: {o.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
