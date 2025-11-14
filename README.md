    # Almacén - Admin Panel (Next.js + Prisma + Supabase Auth)

Incluye un panel en /admin con funciones:
- Listar usuarios
- Cambiar roles (user / encargado / admin)
- Ver movimientos y filtrar por tipo

Seguridad:
- Las rutas API bajo /api/admin validan rol admin leyendo el token de Supabase enviado en Authorization: Bearer <token>
- En producción valida correctamente con la clave de servicio de Supabase

Ejecuta:
- npm install
- npx prisma generate
- npx prisma db push
- npm run dev
