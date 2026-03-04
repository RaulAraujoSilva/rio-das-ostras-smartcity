import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function StatCounter({ value, suffix = '', prefix = '', label, duration = 1500 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.round(current * 10) / 10)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value, duration])

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-extrabold text-city-navy">
        <span className="text-city-blue">{prefix}</span>
        {typeof value === 'number' && value % 1 === 0 ? Math.round(count) : count.toFixed(1)}
        <span className="text-city-cyan">{suffix}</span>
      </div>
      <p className="mt-2 text-gray-600 font-medium">{label}</p>
    </div>
  )
}
