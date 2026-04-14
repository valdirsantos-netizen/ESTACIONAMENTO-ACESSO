'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UserPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSearch() {
    if (!searchTerm) return;
    setLoading(true);
    setErrorMsg('');
    setVehicle(null);

    try {
      // Busca por Placa ou por TAG
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .or(`plate.eq.${searchTerm.toUpperCase()},tag.eq.${searchTerm.toUpperCase()}`)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setVehicle(data);
      } else {
        setErrorMsg('Veículo não encontrado. Verifique os dados ou procure a administração.');
      }
    } catch (err: any) {
      setErrorMsg('Erro ao consultar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '500px', 
      margin: 'auto', 
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1a2233' }}>🚗 Consulta de Veículo</h2>
        <p style={{ color: '#666' }}>Digite sua placa ou TAG para verificar seu status.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          style={{ 
            flex: 1, 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            fontSize: '1rem' 
          }}
          placeholder="Ex: ABC1D23 ou TAG-123"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: '12px 20px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '...' : 'Consultar'}
        </button>
      </div>

      {errorMsg && (
        <div style={{ padding: '15px', backgroundColor: '#fff5f5', color: '#c53030', borderRadius: '8px', textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}

      {vehicle && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #eee'
        }}>
          <h3 style={{ marginTop: 0 }}>Dados do Cadastro</h3>
          <p><strong>Proprietário:</strong> {vehicle.name}</p>
          <p><strong>Placa:</strong> {vehicle.plate}</p>
          <p><strong>TAG:</strong> {vehicle.tag}</p>
          <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Status:</span>
            <span style={{ 
              padding: '5px 12px', 
              borderRadius: '20px', 
              fontSize: '0.9rem',
              fontWeight: 'bold',
              backgroundColor: vehicle.status === 'Liberado' ? '#e6fffa' : '#fff5f5',
              color: vehicle.status === 'Liberado' ? '#2c7a7b' : '#c53030'
            }}>
              {vehicle.status}
            </span>
          </div>
        </div>
      )}

      <button 
        onClick={() => window.location.href = '/'} 
        style={{ 
          marginTop: '40px', 
          background: 'none', 
          border: 'none', 
          color: '#0070f3', 
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        Voltar ao início
      </button>
    </div>
  );
}
