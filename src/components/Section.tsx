import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export default function Section({ id, title, subtitle, children, className = '', dark = false }: SectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen py-16 px-6 md:px-12 lg:px-20 ${dark ? 'bg-city-dark text-white' : 'bg-white text-city-dark'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {title && (
          <div className="mb-12">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${dark ? 'text-white' : 'text-city-navy'}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`mt-3 text-lg md:text-xl ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
            )}
            <div className="mt-4 w-24 h-1 bg-city-cyan rounded-full" />
          </div>
        )}
        {children}
      </motion.div>
    </section>
  )
}
