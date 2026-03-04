import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

interface ImageLightboxProps {
  src: string
  alt: string
  sourceUrl?: string
  sourceLabel?: string
  onClose: () => void
}

export default function ImageLightbox({ src, alt, sourceUrl, sourceLabel, onClose }: ImageLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-5xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />

          {/* Source link */}
          {sourceUrl && (
            <div className="mt-3 flex items-center justify-center gap-3">
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-city-cyan text-white font-semibold text-sm hover:bg-city-blue transition-colors shadow-lg"
              >
                <Icon name="external-link" size={16} />
                {sourceLabel || 'Abrir fonte original'}
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
