import { useState, useEffect, useCallback, useMemo } from 'react'
import Section from '../components/Section'
import QRAccess from '../components/QRAccess'

const STORAGE_KEY = 'smartcity-wordcloud-sent'
const API_URL = '/api/wordcloud'

const STOPWORDS = new Set([
  'a', 'o', 'e', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'uns', 'umas', 'para', 'com', 'por', 'que', 'se', 'ao', 'os', 'as',
  'mais', 'muito', 'como', 'mas', 'ou', 'ser', 'ter', 'foi', 'eu', 'ele', 'ela',
  'isso', 'este', 'esta', 'esse', 'essa', 'aqui', 'ali', 'la', 'ja', 'bem', 'nao',
  'me', 'meu', 'minha', 'seu', 'sua', 'nos', 'vou', 'vai', 'tem', 'sao', 'era',
  'sobre', 'entre', 'ate', 'tambem', 'pode', 'quando', 'onde', 'qual', 'quem',
  'pelo', 'pela', 'pelos', 'pelas', 'num', 'numa', 'todo', 'toda', 'todos', 'todas',
])

const CLOUD_COLORS = ['#1E90FF', '#00D4FF', '#00C853', '#7C4DFF', '#FF6D00', '#D32F2F', '#1E90FF']

function buildWordFrequency(comments: string[]): { text: string; count: number }[] {
  const freq: Record<string, number> = {}
  for (const comment of comments) {
    const words = comment
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOPWORDS.has(w))
    for (const w of words) {
      freq[w] = (freq[w] || 0) + 1
    }
  }
  return Object.entries(freq)
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 60)
}

function wordSize(count: number, maxCount: number): number {
  const minSize = 14
  const maxSize = 48
  if (maxCount <= 1) return minSize + 8
  return minSize + ((count - 1) / (maxCount - 1)) * (maxSize - minSize)
}

export default function WordCloudSection() {
  const [comments, setComments] = useState<string[]>([])
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(API_URL)
      if (res.ok) {
        const data = await res.json()
        setComments(data.comments || [])
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const prev = localStorage.getItem(STORAGE_KEY)
    if (prev) setSent(true)
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    const interval = setInterval(fetchComments, 5000)
    return () => clearInterval(interval)
  }, [fetchComments])

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        setComments(data.comments || [])
        setSent(true)
        localStorage.setItem(STORAGE_KEY, '1')
        setText('')
      }
    } catch { /* ignore */ }
    setSubmitting(false)
  }

  const words = useMemo(() => buildWordFrequency(comments), [comments])
  const maxCount = words.length > 0 ? words[0].count : 1

  return (
    <Section id="wordcloud" title="O que você leva desta palestra?" subtitle="Em uma frase: o que implementaria no seu município?">
      <div className="mb-10">
        <QRAccess sectionId="wordcloud" label="Contribua pelo celular! Escaneie o QR Code:" dark={false} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          {!sent ? (
            <>
              <textarea
                value={text}
                onChange={e => setText(e.target.value.slice(0, 200))}
                placeholder="Ex: Vou propor a integração das câmeras com o centro de defesa civil..."
                className="w-full h-32 p-4 rounded-xl border-2 border-gray-200 bg-white text-city-dark text-sm leading-relaxed resize-none focus:border-city-blue focus:outline-none transition-colors"
                maxLength={200}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">{text.length}/200 caracteres</span>
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim() || submitting}
                  className={`px-8 py-3 rounded-full font-bold text-white transition-all
                    ${text.trim()
                      ? 'bg-city-navy hover:bg-city-blue shadow-lg cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-city-light rounded-xl p-6">
              <div className="flex items-center gap-2 text-city-green font-semibold mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Comentário enviado! Obrigado.
              </div>
              <p className="text-sm text-gray-500">
                Sua contribuição já aparece na nuvem de palavras ao lado.
              </p>
            </div>
          )}

          {comments.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-bold text-city-navy mb-3">
                Últimos comentários ({comments.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[...comments].reverse().slice(0, 8).map((c, i) => (
                  <div key={i} className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-100">
                    "{c}"
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 min-h-[360px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-city-navy">Nuvem de Palavras</h3>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-city-green animate-pulse" />
              {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
            </span>
          </div>

          {words.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
              Aguardando primeiros comentários...
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4">
              {words.map((w, i) => (
                <span
                  key={w.text}
                  className="inline-block transition-all duration-500 hover:scale-110 cursor-default"
                  style={{
                    fontSize: `${wordSize(w.count, maxCount)}px`,
                    color: CLOUD_COLORS[i % CLOUD_COLORS.length],
                    fontWeight: w.count > maxCount * 0.5 ? 700 : 500,
                    opacity: 0.7 + (w.count / maxCount) * 0.3,
                    lineHeight: 1.3,
                  }}
                  title={`"${w.text}" — ${w.count}x`}
                >
                  {w.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
