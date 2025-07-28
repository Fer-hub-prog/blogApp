import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PostDetalhe({ route, navigation }: any) {
  const { titulo, conteudo, data, autor } = route.params;

  let dataFormatada = 'Data não disponível';

  if (data) {
    const dataObj = new Date(data);
    if (!isNaN(dataObj.getTime())) {
      dataFormatada = dataObj.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.data}>{dataFormatada}</Text>
      <Text style={styles.author}>Autor: {autor || 'Desconhecido'}</Text>
      <Text style={styles.conteudo}>{conteudo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  data: { fontSize: 14, color: '#666', marginBottom: 8 },
  author: { fontSize: 14, color: '#444', marginBottom: 16 },
  conteudo: { fontSize: 16, lineHeight: 24 },
  backBtn: { marginBottom: 12 },
  backText: { fontSize: 16, color: '#007AFF' },
});