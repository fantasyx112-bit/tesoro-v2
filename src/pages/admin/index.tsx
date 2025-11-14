import { useEffect, useState } from 'react'

type User = { id: number; name: string | null; email: string | null; role: string }

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    setLoading(true)
    const res = await fetch('/api/admin/users', { headers: { Authorization: 'Bearer ' + (localStorage.getItem('supabase.accessToken') || '') } })
    const data = await res.json()
    setUsers(data)
    setLoading(false)
  }

  async function changeRole(id: number, role: string) {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('supabase.accessToken') || '') },
      body: JSON.stringify({ id, role }),
    })
    fetchUsers()
  }

  return (
    <div style={{ background: '#0b1220', color: '#e6eef8', minHeight: '100vh', padding: 24 }}>
      <h1>Panel Admin — Usuarios</h1>
      <p>Listado de usuarios registrados y cambio de rol.</p>
      {loading ? <p>Cargando...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #233' }}>
              <th>Email</th><th>Nombre</th><th>Rol</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #233' }}>
                <td style={{ padding: 8 }}>{u.email}</td>
                <td style={{ padding: 8 }}>{u.name}</td>
                <td style={{ padding: 8 }}>{u.role}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => changeRole(u.id, 'user')} style={{ marginRight: 8 }}>User</button>
                  <button onClick={() => changeRole(u.id, 'encargado')} style={{ marginRight: 8 }}>Encargado</button>
                  <button onClick={() => changeRole(u.id, 'admin')} style={{ marginRight: 8 }}>Admin</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
