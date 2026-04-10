"use client"
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../lib/supabase';

export default function Portaria() {
  const [mensagem, setMensagem] = useState("Aguardando leitura de QR Code...");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(async (decodedText) => {
      setMensagem("🔄 Verificando...");
      
      const { data: veiculo } = await supabase
        .from('veiculos')
        .select('id, placa, funcionarios(nome)')
        .eq('tag_uuid', decodedText)
        .single();

      if (!veiculo) {
        setMensagem("❌ ERRO: Veículo não cadastrado!");
        return;
      }

      const { data: acessoAberto } = await supabase
        .from('acessos')
        .select('*')
        .eq('veiculo_id', veiculo.id)
        .is('saida', null)
        .single();

      if (acessoAberto) {
        await supabase.from('acessos').update({ saida: new Date() }).eq('id', acessoAberto.id);
        setMensagem(`✅ SAÍDA: ${veiculo.funcionarios.nome} (${veiculo.placa})`);
      } else {
        await supabase.from('acessos').insert({ veiculo_id: veiculo.id });
        setMensagem(`✅ ENTRADA: ${veiculo.funcionarios.nome} (${veiculo.placa})`);
      }
    }, (err) => {}); 

    return () => scanner.clear();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e293b' }}>📲 Scanner Portaria</h1>
      <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}></div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.2rem', fontWeight: 'bold' }}>
        {mensagem}
      </div>
      <br /><a href="/" style={{ color: '#2563eb' }}>Voltar ao Início</a>
    </div>
  );
}
