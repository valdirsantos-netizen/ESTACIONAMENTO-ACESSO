"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [presentes, setPresentes] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase
        .from('acessos')
        .select('entrada, veiculos(placa, funcionarios(nome))')
        .is('saida', null);
      setPresentes(data || []);
    };
    carregar();
    const interval = setInterval(carregar, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#333' }}>Painel Administrativo</h1>
      <h3>Veículos no pátio agora:</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {presentes.map((item, i) => (
          <div key={i} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', background: '#fff' }}>
            <strong>{item.veiculos.funcionarios.nome}</strong> - {item.veiculos.placa} <br/>
            <small>Entrada: {new Date(item.entrada).toLocaleTimeString()}</small>
          </div>
        ))}
        {presentes.length === 0 && <p>Nenhum funcionário no pátio no momento.</p>}
      </div>
    </div>
  );
}
