import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

/**
 * Intenta obtener el usuario local (Prisma) a partir de un token de Supabase enviado
 * en Authorization: Bearer <token>. Retorna el usuario o null.
 * Nota: en producción validar token con la public key o usando SUPABASE_SERVICE_ROLE_KEY.
 */
export async function getUserFromSupabaseToken(authHeader?: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  const token = authHeader.replace('Bearer ', '')
  try {
    const decoded: any = jwt.decode(token)
    if (!decoded) return null
    const email = decoded.payload?.email ?? decoded.email
    if (!email) return null
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (err) {
    console.error('auth decode error', err)
    return null
  }
}
