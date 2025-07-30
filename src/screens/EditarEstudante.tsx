import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Estudante } from '../types';

type Params = RouteProp<RootStackParamList, 'EditarEstudante'>;

export default function EditarEstudante() {
  const route = useRoute<Params>();
  const { id } = route.params;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get<Estudante>(`http://192.168.0.7:3000/estudantes/${id}`)
      .then(res => {
        setNome(res.data.nome);
        setEmail(res.data.email);
      })
      .catch(() => Alert.alert('Erro ao carregar estudante'));
  }, [id]);

  const salvar = () => {
    axios.put(`http://192.168.0.7:3000/estudantes/${id}`, { nome, email })
      .then(() => {
        Alert.alert('Estudante atualizado');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro ao salvar alterações'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Estudante</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});