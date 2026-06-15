import { useState } from 'react';

const API_URL = 'http://20.22.247.37:3000/api/telefone';

export const useConsultaTelefone = () => {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const consultar = async (numero) => {
    if (!numero || numero.trim() === '') return;

    setCarregando(true);
    setErro(null);
    setDados(null);

    try {
      const response = await fetch(`${API_URL}/${numero}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
           setDados({ status: 'DESCONHECIDO' });
           setErro(data.mensagem);
        } else {
           throw new Error(data.mensagem || 'Erro na consulta');
        }
      } else {
        setDados(data);
      }
    } catch (err) {
      setErro('Falha de conexão. Verifique se a API está rodando e o IP está correto.');
    } finally {
      setCarregando(false);
    }
  };

  return { dados, erro, carregando, consultar };
};