'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function AdminPanel() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar veículos sem erros de ordenação (Resolvendo o Erro 400)
  async function loadData() {
    try {
      setLoading(true);
      if (!supabase) return;

      const { data, error } = await supabase
        .from('vehicles')
        .select('*'); // Sem .order() para não dar erro de coluna inexistente

      if (error) throw error;
      
      console.log("Dados carregados:", data);
      setVehicles(data || []);
    } catch (error) {
      console.error("Erro no painel:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <h2>Painel Administrativo</h2>
      
      {/* O CARD QUE VOCÊ QUERIA */}
      <div style={{ 
        backgroundColor: '#1a2233', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '15px', 
        width: '250px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>Veículos cadastrados</p>
        <h1 style={{ margin: '10px 0 0 0', fontSize: '3rem' }}>
          {loading ? '...' : vehicles.length}
        </h1>
      </div>

      {/* TABELA DE VISUALIZAÇÃO */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>Lista de Cadastros</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Nome</th>
              <th style={{ padding: '10px' }}>Placa</th>
              <th style={{ padding: '10px' }}>TAG</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v: any) => (
              <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{v.name}</td>
                <td style={{ padding: '10px' }}>{v.plate}</td>
                <td style={{ padding: '10px' }}>{v.tag}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {vehicles.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '20px' }}>Nenhum veículo encontrado no banco.</p>}
      </div>
      
      <button onClick={() => window.location.href = '/'} style={{ marginTop: '20px', cursor: 'pointer' }}> Voltar para Seleção </button>
    </div>
  );
}
