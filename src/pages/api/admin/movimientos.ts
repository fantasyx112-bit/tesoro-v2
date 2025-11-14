import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getUserFromSupabaseToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requester = await getUserFromSupabaseToken(req.headers.authorization)
  if (!requester || requester.role !== 'admin') return res.status(403).json({ error: 'Forbidden' })

  const { tipo } = req.query
  const where: any = {}
  if (tipo) where.tipo = String(tipo)

  const movs = await prisma.movimiento.findMany({ where, orderBy: { timestamp: 'desc' }, take: 200 })
  return res.json(movs)
}
