export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a202c' }}>🚗 Controle de Estacionamento</h1>
      <p style={{ color: '#4a5568' }}>Selecione o módulo de acesso:</p>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
        <a href="/portaria" style={{ width: '250px', padding: '15px', background: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Acessar Portaria (Scanner)
        </a>
        <a href="/admin" style={{ width: '250px', padding: '15px', background: '#1e293b', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Painel Administrador
        </a>
      </div>
    </div>
  )
}
