export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🚗 Controle de Acesso - Estacionamento</h1>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <a href="/portaria" style={{ padding: '15px 25px', background: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          🖥️ ÁREA DA PORTARIA
        </a>
        <a href="/admin" style={{ padding: '15px 25px', background: '#333', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          📊 PAINEL ADMINISTRADOR
        </a>
      </div>
    </div>
  )
}
