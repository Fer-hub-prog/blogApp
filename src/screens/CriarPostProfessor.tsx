import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function CriarPostProfessor({ navigation }: any) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('autorPost')
      .then(value => {
        if (value) setAutor(value);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível recuperar o autor logado');
      });
  }, []);

  const handleSalvar = () => {
    if (!titulo || !descricao || !conteudo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    axios
      .post('http://192.168.0.7:3000/posts', {
        titulo,
        conteudo,
        descricao,
        author: autor || 'Desconhecido',
        data: new Date().toISOString(),
      })
      .then(() => {
        Alert.alert('Sucesso', 'Post criado com sucesso!');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro', 'Erro ao criar post'));
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

        <Text style={styles.title}>Novo Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
        />

        <Text style={styles.autor}>👤 Autor: {autor || 'Desconhecido'}</Text>

        <Button title="Salvar Post" onPress={handleSalvar} />
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
  voltarBtn: {
    marginBottom: 16,
  },
  voltarText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  autor: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
});