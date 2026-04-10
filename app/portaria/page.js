"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Portaria() {
  const [mensagem, setMensagem] = useState("Aguardando leitura...");

  useEffect(() => {
    // Só carrega o scanner quando o componente já está na tela do usuário
    const startScanner = async () => {
      const { Html5QrcodeScanner } = await import('html5-qrcode');
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

      scanner.render(async (text) => {
        setMensagem("🔄 Verificando...");
        const { data: v } = await supabase.from('veiculos').select('id, placa, funcionarios(nome)').eq('tag_uuid', text).single();
        
        if (!v) return setMensagem("❌ Não cadastrado!");

        const { data: aberto } = await supabase.from('acessos').select('*').eq('veiculo_id', v.id).is('saida', null).single();

        if (aberto) {
          await supabase.from('acessos').update({ saida: new Date() }).eq('id', aberto.id);
          setMensagem(`✅ Saída: ${v.funcionarios.nome}`);
        } else {
          await supabase.from('acessos').insert({ veiculo_id: v.id });
          setMensagem(`✅ Entrada: ${v.funcionarios.nome}`);
        }
      }, (err) => { });
    };

    startScanner();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📲 Scanner Portaria</h1>
      <div id="reader" style={{ maxWidth: '400px', margin: '0 auto' }}></div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#eee', borderRadius: '10px' }}>{mensagem}</div>
      <br /><a href="/">Voltar</a>
    </div>
  );
}
