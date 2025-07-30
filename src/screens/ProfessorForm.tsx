import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function ProfessorForm({ route, navigation }: any) {
  const professorEditando = route.params?.professor;
  const [nome, setNome] = useState(professorEditando?.nome || '');
  const [email, setEmail] = useState(professorEditando?.email || '');

  const handleSalvar = () => {
    if (!nome || !email) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (professorEditando) {
      axios.put(`http://192.168.0.7:3000/professores/${professorEditando.id}`, { nome, email })
        .then(() => navigation.goBack());
    } else {
      axios.post('http://192.168.0.7:3000/professores', { nome, email })
        .then(() => navigation.goBack());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 6 },
});