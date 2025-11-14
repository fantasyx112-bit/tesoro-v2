export default function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#111',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '2.5rem' }}>📦 Sistema de Gestión de Almacén</h1>
      <p>Bienvenido al panel</p>
      <a href="/login" style={{ color: '#00bfff', marginTop: '1rem' }}>
        Iniciar sesión →
      </a>
    </div>
  );
}
