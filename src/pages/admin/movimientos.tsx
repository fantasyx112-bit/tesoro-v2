import { useEffect, useState } from 'react'

export default function Movimientos() {
  const [movs, setMovs] = useState<any[]>([])
  const [filter, setFilter] = useState('')
  useEffect(() => { fetchMovs() }, [])

  async function fetchMovs() {
    const res = await fetch('/api/admin/movimientos' + (filter ? '?tipo=' + filter : ''), { headers: { Authorization: 'Bearer ' + (localStorage.getItem('supabase.accessToken') || '') } })
    const data = await res.json()
    setMovs(data)
  }

  return (
    <div style={{ background: '#0b1220', color: '#e6eef8', minHeight: '100vh', padding: 24 }}>
      <h1>Movimientos</h1>
      <p>Filtra por tipo (ej: peticion_creada, peticion_aprobada, restock_completado).</p>
      <div style={{ marginTop: 12 }}>
        <input placeholder="tipo" value={filter} onChange={(e)=>setFilter(e.target.value)} />
        <button onClick={fetchMovs} style={{ marginLeft: 8 }}>Filtrar</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #233' }}>
            <th>Tipo</th><th>Referencia</th><th>Usuario</th><th>Fecha</th><th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {movs.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #233' }}>
              <td style={{ padding: 8 }}>{m.tipo}</td>
              <td style={{ padding: 8 }}>{m.referenciaId}</td>
              <td style={{ padding: 8 }}>{m.userId}</td>
              <td style={{ padding: 8 }}>{new Date(m.timestamp).toLocaleString()}</td>
              <td style={{ padding: 8 }}><pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(m.detalles)}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
