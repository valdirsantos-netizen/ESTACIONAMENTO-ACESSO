"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [presentes, setPresentes] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase
        .from('acessos')
        .select('entrada, veiculos(placa, funcionarios(nome))')
        .is('saida', null);
      setPresentes(data || []);
    }
    carregar();
    const timer = setInterval(carregar, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>📊 Painel Admin</h1>
      <h3 style={{ color: '#16a34a' }}>🟢 Funcionários no pátio agora:</h3>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {presentes.map((item, i) => (
          <div key={i} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.veiculos.funcionarios.nome}</div>
            <div style={{ color: '#666' }}>Placa: {item.veiculos.placa}</div>
            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '5px' }}>Entrada: {new Date(item.entrada).toLocaleTimeString()}</div>
          </div>
        ))}
        {presentes.length === 0 && <p style={{ color: '#94a3b8', textAlign: 'center' }}>O pátio está vazio.</p>}
      </div>
      <br /><a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Voltar ao Início</a>
    </div>
  );
}
