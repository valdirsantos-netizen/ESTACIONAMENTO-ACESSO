"use client"
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../lib/supabase';

export default function Portaria() {
  const [mensagem, setMensagem] = useState("Aguardando leitura...");

  useEffect(() => {
    // Inicializa o scanner
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(async (text) => {
      setMsg("Verificando...");
      
      // Busca o veículo
      const { data: v } = await supabase
        .from('veiculos')
        .select('id, placa, funcionarios(nome)')
        .eq('tag_uuid', text)
        .single();

      if (!v) {
        setMensagem("❌ Veículo não cadastrado!");
        return;
      }

      // Verifica se há entrada aberta
      const { data: aberto } = await supabase
        .from('acessos')
        .select('*')
        .eq('veiculo_id', v.id)
        .is('saida', null)
        .single();

      if (aberto) {
        // Se estiver aberto, registra a saída
        await supabase.from('acessos').update({ saida: new Date() }).eq('id', aberto.id);
        setMensagem(`✅ Saída: ${v.funcionarios.nome}`);
      } else {
        // Se não, registra a entrada
        await supabase.from('acessos').insert({ veiculo_id: v.id });
        setMensagem(`✅ Entrada: ${v.funcionarios.nome}`);
      }
    }, (err) => { });

    return () => scanner.clear();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📲 Scanner Portaria</h1>
      <div id="reader" style={{ maxWidth: '400px', margin: '0 auto' }}></div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#eef2ff', borderRadius: '10px', fontWeight: 'bold' }}>
        {mensagem}
      </div>
      <br /><a href="/">⬅ Voltar</a>
    </div>
  );
}
