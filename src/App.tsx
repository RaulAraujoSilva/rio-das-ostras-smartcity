import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/01-Hero'
import Speaker from './sections/02-Speaker'
import Evolution from './sections/02b-Evolution'
import ChatVsAgents from './sections/02c-ChatVsAgents'
import TimelineLLMs from './sections/02d-TimelineLLMs'
import Context from './sections/03-Context'
import Quiz from './sections/04-Quiz'
import Vision from './sections/05-Vision'
import Architecture from './sections/06-Architecture'
import AILayers from './sections/07-AILayers'
import GlobalCases from './sections/08-GlobalCases'
import BrazilCases from './sections/09-BrazilCases'
import Poll from './sections/10-Poll'
import Roadmap from './sections/11-Roadmap'

import Challenges from './sections/13-Challenges'
import Future from './sections/14-Future'
import WordCloudSection from './sections/15-WordCloud'
import Closing from './sections/16-Closing'

function App() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const tryScroll = () => {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          requestAnimationFrame(tryScroll)
        }
      }
      // Wait for sections to render
      setTimeout(tryScroll, 300)
    }
  }, [])

  return (
    <div className="relative">
      <Navbar />
      <main className="lg:ml-16">
        {/* Abertura */}
        <Hero />
        <Speaker />

        {/* A IA Hoje */}
        <Evolution />
        <ChatVsAgents />
        <TimelineLLMs />

        {/* O Problema */}
        <Context />
        <Quiz />

        {/* A Solucao */}
        <Vision />
        <Architecture />
        <AILayers />

        {/* Evidencias */}
        <GlobalCases />
        <BrazilCases />

        {/* Acao */}
        <Poll />
        <Roadmap />

        {/* Reflexao */}
        <Challenges />
        <Future />
        <WordCloudSection />
        <Closing />
      </main>
    </div>
  )
}

export default App
