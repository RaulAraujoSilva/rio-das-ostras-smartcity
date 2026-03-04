import { useState } from 'react'
import Section from '../components/Section'
import LayerDiagram from '../components/LayerDiagram'
import ImageLightbox from '../components/ImageLightbox'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

export default function Architecture() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <Section id="architecture" title="Arquitetura do Centro Inteligente" subtitle="5 camadas, do sensor ao dashboard. Clique em cada camada para explorar.">
      {/* Infográfico hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <button
          onClick={() => setLightbox({ src: './img/infographics/architecture-layers.png', alt: 'Arquitetura do Centro Inteligente' })}
          className="w-full max-w-4xl mx-auto block rounded-2xl overflow-hidden relative cursor-pointer group"
        >
          <img src="./img/infographics/architecture-layers.png" alt="Arquitetura do Centro Inteligente" className="w-full" loading="lazy" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Icon name="eye" size={14} className="text-white" />
              Ampliar
            </span>
          </div>
        </button>
      </motion.div>

      <LayerDiagram />

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </Section>
  )
}
