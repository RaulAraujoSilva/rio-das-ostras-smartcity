import type { VercelRequest, VercelResponse } from '@vercel/node'

const VALID_ANSWERS = ['A', 'B', 'C', 'D', 'E']
const HASH_KEY = 'smartcity:quiz'

async function redis(command: string[], url: string, token: string) {
  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })
  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (!url || !token) {
    if (req.method === 'GET') {
      return res.json({ A: 0, B: 0, C: 0, D: 0, E: 0, total: 0 })
    }
    return res.status(500).json({ error: 'Redis not configured' })
  }

  if (req.method === 'GET') {
    const data = await redis(['HGETALL', HASH_KEY], url, token)
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
    if (data.result && Array.isArray(data.result)) {
      for (let i = 0; i < data.result.length; i += 2) {
        const key = data.result[i]
        const val = parseInt(data.result[i + 1], 10)
        if (VALID_ANSWERS.includes(key)) counts[key] = val
      }
    }
    const total = Object.values(counts).reduce((s, v) => s + v, 0)
    return res.json({ ...counts, total })
  }

  if (req.method === 'POST') {
    const { answer } = req.body || {}
    if (!answer || !VALID_ANSWERS.includes(answer)) {
      return res.status(400).json({ error: 'Invalid answer. Must be A, B, C, D, or E.' })
    }
    await redis(['HINCRBY', HASH_KEY, answer, '1'], url, token)
    const data = await redis(['HGETALL', HASH_KEY], url, token)
    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 }
    if (data.result && Array.isArray(data.result)) {
      for (let i = 0; i < data.result.length; i += 2) {
        const key = data.result[i]
        const val = parseInt(data.result[i + 1], 10)
        if (VALID_ANSWERS.includes(key)) counts[key] = val
      }
    }
    const total = Object.values(counts).reduce((s, v) => s + v, 0)
    return res.json({ ...counts, total })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
