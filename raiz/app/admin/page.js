export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>🚗 Sistema de Estacionamento</h1>
      <div style={{ marginTop: '20px' }}>
        <a href="/portaria" style={{ margin: '10px', display: 'inline-block', padding: '15px 30px', background: '#0070f3', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>PORTARIA (Scanner)</a>
        <br />
        <a href="/admin" style={{ margin: '10px', display: 'inline-block', padding: '15px 30px', background: '#333', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>ADMINISTRAÇÃO</a>
      </div>
    </div>
  )
}
