import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Estudante = {
  id: number;
  nome: string;
  email: string;
};

export default function ListarEstudantes() {
  const [estudantes, setEstudantes] = useState<Estudante[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const carregarEstudantes = () => {
    axios.get<Estudante[]>('http://192.168.0.7:3000/estudantes')
      .then(res => setEstudantes(res.data))
      .catch(() => Alert.alert('Erro ao carregar estudantes'));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarEstudantes);
    return unsubscribe;
  }, [navigation]);

  const excluirEstudante = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir este estudante?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.0.7:3000/estudantes/${id}`)
              .then(() => carregarEstudantes())
              .catch(() => Alert.alert('Erro ao excluir estudante'));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="← Voltar" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Lista de Estudantes</Text>

      <FlatList
        data={estudantes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => navigation.navigate('EditarEstudante', { id: item.id })} />
              <Button title="Excluir" color="red" onPress={() => excluirEstudante(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#555', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});
