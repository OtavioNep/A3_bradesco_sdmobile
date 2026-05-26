import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Keyboard 
} from 'react-native';
import { useConsultaTelefone } from '../hooks/useConsultaTelefone';

export default function ConsultaScreen() {
  const [numero, setNumero] = useState('');
  
  // Consumindo o nosso Custom Hook
  const { dados, erro, carregando, consultar } = useConsultaTelefone();

  const handleConsulta = () => {
    Keyboard.dismiss(); // Esconde o teclado
    consultar(numero);
  };

  const getCorStatus = (status) => {
    switch(status) {
      case 'OFICIAL': return '#28a745'; // Verde
      case 'GOLPE': return '#dc3545'; // Vermelho
      case 'DESCONHECIDO': return '#ffc107'; // Amarelo
      default: return '#6c757d';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Validador de telefone</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o número (Ex: 40020022)"
        keyboardType="numeric"
        value={numero}
        onChangeText={setNumero}
      />

      <TouchableOpacity style={styles.botao} onPress={handleConsulta} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotao}>Consultar</Text>
        )}
      </TouchableOpacity>

      {/* Renderiza o resultado apenas se houver dados */}
      {dados && (
        <View style={[styles.card, { borderColor: getCorStatus(dados.status) }]}>
          <Text style={[styles.status, { color: getCorStatus(dados.status) }]}>
            {dados.status === 'DESCONHECIDO' ? 'NÃO ENCONTRADO' : dados.status}
          </Text>
          
          {dados.instituicao && (
            <Text style={styles.detalhe}>Instituição: <Text style={styles.negrito}>{dados.instituicao}</Text></Text>
          )}
          
          <Text style={styles.observacao}>
            {dados.observacoes || erro}
          </Text>
        </View>
      )}

      {/* Renderiza erro de conexão caso a API esteja fora */}
      {!dados && erro && (
        <Text style={styles.erroConexao}>{erro}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA', justifyContent: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#cc092f', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 15, fontSize: 18, marginBottom: 15 },
  botao: { backgroundColor: '#cc092f', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  card: { marginTop: 30, padding: 20, backgroundColor: '#FFF', borderWidth: 2, borderRadius: 8, alignItems: 'center' },
  status: { fontSize: 22, fontWeight: '900', marginBottom: 10 },
  detalhe: { fontSize: 16, color: '#333', marginBottom: 5 },
  negrito: { fontWeight: 'bold' },
  observacao: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 10, fontStyle: 'italic' },
  erroConexao: { color: '#dc3545', textAlign: 'center', marginTop: 20, fontWeight: 'bold' }
});