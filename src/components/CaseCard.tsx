import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon'
import ImageLightbox from './ImageLightbox'

interface Metric {
  value: string
  label: string
}

interface Source {
  label: string
  url: string
}

interface CaseCardProps {
  city: string
  country: string
  metrics: Metric[]
  highlight: string
  description: string
  color?: string
  image?: string
  sources?: Source[]
}

export default function CaseCard({ city, country, metrics, highlight, description, color = '#1E90FF', image, sources }: CaseCardProps) {
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md transition-all flex flex-col"
      >
        {/* Screenshot header */}
        {image && (
          <button
            onClick={() => setLightbox(true)}
            className="w-full h-44 overflow-hidden bg-gray-100 relative group cursor-pointer"
          >
            <img
              src={image}
              alt={`${city} — ${highlight}`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-semibold flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <Icon name="eye" size={16} className="text-white" />
                Ver em tela cheia
              </span>
            </div>
          </button>
        )}

        {/* Header */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
              <Icon name="map-pin" size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-city-navy">{city}</h3>
              <p className="text-sm text-gray-500">{country}</p>
            </div>
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {highlight}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-px bg-gray-100">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white px-4 py-3 text-center">
              <div className="text-lg font-extrabold" style={{ color }}>{m.value}</div>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="px-6 py-4 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Sources */}
        {sources && sources.length > 0 && (
          <div className="px-6 pb-4 pt-0 border-t border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-3 mb-1.5">Fontes</p>
            <div className="space-y-1">
              {sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-city-blue hover:text-city-cyan transition-colors leading-snug"
                >
                  <Icon name="external-link" size={11} className="shrink-0" />
                  <span className="line-clamp-1">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      {lightbox && image && (
        <ImageLightbox
          src={image}
          alt={`${city} — ${highlight}`}
          sourceUrl={sources?.[0]?.url}
          sourceLabel={sources?.[0]?.label}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  )
}
