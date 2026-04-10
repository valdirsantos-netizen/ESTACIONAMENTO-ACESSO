export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>🚗 Sistema de Estacionamento</h1>
      <p>O site está online! Escolha uma opção:</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/portaria" style={{ margin: '10px', display: 'inline-block', padding: '15px 25px', background: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>Ir para Portaria</a>
        <a href="/admin" style={{ margin: '10px', display: 'inline-block', padding: '15px 25px', background: '#333', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>Painel Admin</a>
      </div>
    </div>
  )
}
