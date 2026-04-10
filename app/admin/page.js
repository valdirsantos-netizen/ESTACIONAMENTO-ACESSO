"use client"
export const dynamic = 'force-dynamic'; // Força o Next.js a não gerar essa página estaticamente
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.from('acessos').select('entrada, veiculos(placa, funcionarios(nome))').is('saida', null);
      setLista(data || []);
    }
    carregar();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>📊 Painel Admin</h1>
      {lista.map((item, i) => (
        <div key={i} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
          <strong>{item.veiculos?.funcionarios?.nome}</strong> - {item.veiculos?.placa}
        </div>
      ))}
      {lista.length === 0 && <p>Pátio vazio.</p>}
      <br /><a href="/">Voltar</a>
    </div>
  );
}
