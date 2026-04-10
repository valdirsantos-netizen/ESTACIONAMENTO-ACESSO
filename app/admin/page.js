"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Admin() {
  const [presentes, setPresentes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const { data, error } = await supabase
          .from('acessos')
          .select('entrada, veiculos(placa, funcionarios(nome))')
          .is('saida', null);
        
        if (error) throw error;
        setPresentes(data || []);
      } catch (err) {
        console.error("Erro ao carregar:", err.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
    // Atualiza a lista a cada 10 segundos automaticamente
    const interval = setInterval(carregarDados, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1a202c' }}>📊 Painel Administrativo</h1>
      <h3 style={{ color: '#4a5568' }}>Veículos no Pátio Agora:</h3>
      
      {carregando ? (
        <p>Carregando lista...</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {presentes.map((item, i) => (
            <div key={i} style={{ padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                {item.veiculos?.funcionarios?.nome || "Funcionário não encontrado"}
              </div>
              <div style={{ color: '#718096' }}>Placa: {item.veiculos?.placa}</div>
              <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '5px' }}>
                Entrada: {new Date(item.entrada).toLocaleString('pt-BR')}
              </div>
            </div>
          ))}
          
          {presentes.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#a0aec0', border: '2px dashed #e2e8f0' }}>
              Nenhum veículo estacionado no momento.
            </div>
          )}
        </div>
      )}
      
      <br />
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none' }}>⬅ Voltar para o Início</a>
    </div>
  );
}
