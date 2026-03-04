import { motion } from 'framer-motion'
import Icon from './Icon'

interface SourceCardProps {
  title: string
  url: string
  image?: string
  type: 'paper' | 'news' | 'gov' | 'platform'
  description?: string
}

const TYPE_CONFIG = {
  paper: { label: 'Paper', color: '#7C4DFF' },
  news: { label: 'Notícia', color: '#FF6D00' },
  gov: { label: 'Governo', color: '#1E90FF' },
  platform: { label: 'Plataforma', color: '#00C853' },
}

export default function SourceCard({ title, url, image, type, description }: SourceCardProps) {
  const { label, color } = TYPE_CONFIG[type]

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      {image && (
        <div className="h-36 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {label}
          </span>
          <h4 className="text-sm font-bold text-city-navy line-clamp-1">{title}</h4>
        </div>
        {description && (
          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center gap-1 text-city-blue text-xs font-semibold group-hover:text-city-cyan transition-colors">
          <span>Abrir fonte</span>
          <Icon name="external-link" size={12} />
        </div>
      </div>
    </motion.a>
  )
}
