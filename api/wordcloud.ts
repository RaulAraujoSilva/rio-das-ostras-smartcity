import type { VercelRequest, VercelResponse } from '@vercel/node'

const LIST_KEY = 'smartcity:wordcloud'

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
      return res.json({ comments: [], total: 0 })
    }
    return res.status(500).json({ error: 'Redis not configured' })
  }

  if (req.method === 'GET') {
    const data = await redis(['LRANGE', LIST_KEY, '0', '-1'], url, token)
    const comments: string[] = data.result && Array.isArray(data.result) ? data.result : []
    return res.json({ comments, total: comments.length })
  }

  if (req.method === 'POST') {
    const { text } = req.body || {}
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text is required' })
    }
    const clean = text.trim().slice(0, 200)
    await redis(['RPUSH', LIST_KEY, clean], url, token)
    const data = await redis(['LRANGE', LIST_KEY, '0', '-1'], url, token)
    const comments: string[] = data.result && Array.isArray(data.result) ? data.result : []
    return res.json({ comments, total: comments.length })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
