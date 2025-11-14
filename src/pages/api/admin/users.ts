import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getUserFromSupabaseToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requester = await getUserFromSupabaseToken(req.headers.authorization)
  if (!requester || requester.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(users)
  }

  if (req.method === 'PATCH') {
    const { id, role } = req.body
    if (!id || !role) return res.status(400).json({ error: 'Missing id or role' })
    const updated = await prisma.user.update({ where: { id: Number(id) }, data: { role } })
    return res.json(updated)
  }

  return res.status(405).end()
}
