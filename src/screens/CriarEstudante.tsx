import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function CriarEstudante() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const salvar = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    axios.post('http://192.168.0.7:3000/estudantes', { nome, email, senha })
      .then(() => {
        Alert.alert('Estudante criado com sucesso');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro ao criar estudante'));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Cadastrar Estudante</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Button title="Salvar" onPress={salvar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  voltarBtn: {
    marginBottom: 16,
  },
  voltarText: {
    color: '#007AFF',
    fontSize: 16,
  },
});