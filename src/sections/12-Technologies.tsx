import Section from '../components/Section'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

const CATEGORIES = [
  {
    title: 'Plataformas',
    icon: 'cloud',
    color: '#1E90FF',
    tools: ['NVIDIA Metropolis', 'Sentilo (open-source)', 'Azure IoT Hub', 'AWS IoT Core'],
  },
  {
    title: 'IA e Machine Learning',
    icon: 'cpu',
    color: '#7C4DFF',
    tools: ['NVIDIA DeepStream (vídeo)', 'Hugging Face (NLP/LLM)', 'TensorFlow', 'PyTorch'],
  },
  {
    title: 'Dados e Streaming',
    icon: 'database',
    color: '#00D4FF',
    tools: ['Apache Kafka', 'Apache Flink', 'PostgreSQL + TimescaleDB', 'MinIO (data lake)'],
  },
  {
    title: 'Visualização',
    icon: 'bar-chart',
    color: '#00C853',
    tools: ['Grafana', 'Metabase', 'QGIS (geoespacial)', 'Recharts/D3.js'],
  },
  {
    title: 'Gêmeo Digital',
    icon: 'globe',
    color: '#FF6D00',
    tools: ['NVIDIA Omniverse', 'Cesium (3D geoespacial)', 'Unity', 'OpenUSD'],
  },
  {
    title: 'Open Source',
    icon: 'unlock',
    color: '#D32F2F',
    tools: ['Sentilo (Barcelona)', 'Public Eye (Amsterdam)', 'OpenCV', 'Langchain'],
  },
]

export default function Technologies() {
  return (
    <Section id="technologies" title="Stack Tecnológico" subtitle="Ferramentas e plataformas recomendadas por categoria" dark>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }}>
                <Icon name={cat.icon} size={20} style={{ color: cat.color }} />
              </div>
              <h3 className="font-bold" style={{ color: cat.color }}>{cat.title}</h3>
            </div>
            <div className="space-y-2">
              {cat.tools.map(tool => (
                <div key={tool} className="flex items-center gap-2 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  {tool}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
