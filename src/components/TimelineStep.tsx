import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface TimelineStepProps {
  step: number
  title: string
  period: string
  items: string[]
  color?: string
  isLast?: boolean
}

export default function TimelineStep({ step, title, period, items, color = '#1E90FF', isLast = false }: TimelineStepProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className="flex gap-4 md:gap-6">
      {/* Line + Circle */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: step * 0.15 }}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{ backgroundColor: color }}
        >
          {step + 1}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 0.6, delay: step * 0.15 + 0.3 }}
            className="w-0.5 flex-1 mt-2"
            style={{ backgroundColor: color, opacity: 0.3 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: step * 0.15 + 0.1 }}
        className="pb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-lg font-bold text-city-navy">{title}</h3>
          <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: color }}>
            {period}
          </span>
        </div>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
