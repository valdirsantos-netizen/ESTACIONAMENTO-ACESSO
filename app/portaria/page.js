"use client"
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../lib/supabase';

export default function Portaria() {
  const [msg, setMsg] = useState("Aguardando leitura de TAG...");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(async (text) => {
      setMsg("🔍 Verificando...");
      const { data: v } = await supabase.from('veiculos').select('id, placa, funcionarios(nome)').eq('tag_uuid', text).single();
      
      if (!v) { setMsg("❌ Veículo não cadastrado!"); return; }

      const { data: aberto } = await supabase.from('acessos').select('*').eq('veiculo_id', v.id).is('saida', null).single();

      if (aberto) {
        await supabase.from('acessos').update({ saida: new Date() }).eq('id', aberto.id);
        setMsg(`✅ SAÍDA: ${v.funcionarios.nome} (${v.placa})`);
      } else {
        await supabase.from('acessos').insert({ veiculo_id: v.id });
        setMsg(`✅ ENTRADA: ${v.funcionarios.nome} (${v.placa})`);
      }
    });
    return () => scanner.clear();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>📲 Scanner Portaria</h2>
      <div id="reader" style={{ maxWidth: '400px', margin: '0 auto' }}></div>
      <div style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: '#0070f3' }}>{msg}</div>
      <br/><a href="/">⬅ Voltar</a>
    </div>
  );
}
