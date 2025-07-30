import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Professor } from '../types';

type EditarProfessorRouteProp = RouteProp<RootStackParamList, 'EditarProfessor'>;

export default function EditarProfessor() {
  const navigation = useNavigation();
  const route = useRoute<EditarProfessorRouteProp>();
  const { id } = route.params;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get<Professor>(`http://192.168.0.7:3000/professores/${id}`)
      .then(response => {
        const professor = response.data;
        setNome(professor.nome);
        setEmail(professor.email);
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar os dados.'));
  }, [id]);

  const handleSalvar = () => {
    axios.put(`http://192.168.0.7:3000/professores/${id}`, {
      nome,
      email,
    })
      .then(() => {
        Alert.alert('Sucesso', 'Professor atualizado com sucesso.');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro', 'Erro ao atualizar professor.'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Professor</Text>

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
      />

      <Button title="Salvar Alterações" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});