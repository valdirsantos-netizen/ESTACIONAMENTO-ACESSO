"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase.from('acessos').select('entrada, veiculos(placa, funcionarios(nome))').is('saida', null);
      setLogs(data || []);
    };
    carregar();
    const timer = setInterval(carregar, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>📋 Veículos no Pátio Agora</h1>
      {logs.map((log, i) => (
        <div key={i} style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <strong>{log.veiculos.funcionarios.nome}</strong> - {log.veiculos.placa}
          <div style={{ fontSize: '0.8rem', color: 'gray' }}>Entrada: {new Date(log.entrada).toLocaleString()}</div>
        </div>
      ))}
      {logs.length === 0 && <p>Nenhum veículo no momento.</p>}
      <br/><a href="/">⬅ Voltar</a>
    </div>
  );
}
