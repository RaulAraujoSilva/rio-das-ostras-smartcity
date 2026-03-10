import { useState, useEffect } from 'react'
import Icon from './Icon'

const sections = [
  { id: 'hero', label: 'Início', icon: 'home' },
  { id: 'speaker', label: 'Palestrante', icon: 'user' },
  { id: 'evolution', label: 'Evolução IA', icon: 'trending-up' },
  { id: 'timeline-llms', label: 'Timeline LLMs', icon: 'zap' },
  { id: 'chat-vs-agents', label: 'Chat → Agentes', icon: 'bot' },
  { id: 'ai-new-model', label: 'Novo Modelo', icon: 'refresh-cw' },
  { id: 'context', label: 'O Problema', icon: 'alert-triangle' },
  { id: 'quiz', label: 'Quiz', icon: 'bar-chart' },
  { id: 'vision', label: 'Visão', icon: 'eye' },
  { id: 'architecture', label: 'Arquitetura', icon: 'layers' },
  { id: 'ai-layers', label: 'Camadas IA', icon: 'cpu' },
  { id: 'global-cases', label: 'Casos Globais', icon: 'globe' },
  { id: 'brazil-cases', label: 'Casos Brasil', icon: 'map-pin' },
  { id: 'poll', label: 'Poll', icon: 'check-square' },
  { id: 'roadmap', label: 'Roadmap', icon: 'route' },

  { id: 'challenges', label: 'Desafios', icon: 'shield' },
  // { id: 'future', label: 'Futuro', icon: 'arrow-up-right' },
  { id: 'wordcloud', label: 'Feedback', icon: 'message-circle' },
  { id: 'closing', label: 'Encerramento', icon: 'check-circle' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setCollapsed(true)
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-[60] lg:hidden bg-city-navy text-white p-2 rounded-lg shadow-lg"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d={collapsed ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
        </svg>
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full z-50 bg-city-navy/95 backdrop-blur-sm text-white
          transition-transform duration-300 w-56
          ${collapsed ? '-translate-x-full lg:translate-x-0 lg:w-16 lg:hover:w-56' : 'translate-x-0'}
          group overflow-hidden`}
      >
        <div className="p-3 border-b border-white/10 flex items-center gap-2 h-[52px]">
          <Icon name="layers" size={22} className="text-city-cyan shrink-0" />
          <span className="text-xs font-bold opacity-0 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap text-city-cyan">Smart City</span>
        </div>

        <div className="overflow-y-auto h-[calc(100%-52px)] py-2">
          {sections.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-all
                ${active === id ? 'bg-city-cyan/20 text-city-cyan border-r-3 border-city-cyan' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
            >
              <Icon name={icon} size={18} className="shrink-0" />
              <span className="whitespace-nowrap opacity-0 lg:group-hover:opacity-100 transition-opacity">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
