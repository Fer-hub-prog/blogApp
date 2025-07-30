// src/screens/ListarProfessores.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

type Professor = {
  id: number;
  nome: string;
  email: string;
};

export default function ListarProfessores({ navigation }: any) {
  const [professores, setProfessores] = useState<Professor[]>([]);

  const carregar = () => {
    axios.get<Professor[]>('http://192.168.0.7:3000/professores')
      .then(res => setProfessores(res.data))
      .catch(() => Alert.alert('Erro', 'Erro ao carregar professores'));
  };

  useEffect(() => {
    carregar();
  }, []);

  const excluir = (id: number) => {
    Alert.alert('Confirmar', 'Deseja excluir este professor?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          axios.delete(`http://192.168.0.7:3000/professores/${id}`)
            .then(() => carregar());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professores Cadastrados</Text>

      <FlatList
        data={professores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.email}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => navigation.navigate('EditarProfessor', { id: item.id })} />
              <Button title="Excluir" color="red" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
