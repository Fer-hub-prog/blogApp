import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Post } from '../types';

type EditarPostRouteProp = RouteProp<RootStackParamList, 'EditarPost'>;

export default function EditarPost() {
  const navigation = useNavigation();
  const route = useRoute<EditarPostRouteProp>();
  const { id } = route.params;

  const [titulo, setTitulo] = useState('');
  const [description, setDescription] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get<Post>(`http://192.168.0.7:3000/posts/${id}`)
      .then(response => {
        const post = response.data;
        setTitulo(post.titulo ?? '');
        setDescription(post.description ?? '');
        setConteudo(post.conteudo ?? '');
        setAuthor(post.author ?? '');
      })
      .catch(() => Alert.alert('Erro', 'Erro ao carregar post.'));
  }, [id]);

  const salvar = () => {
    axios.put(`http://192.168.0.7:3000/posts/${id}`, {
      titulo,
      description,
      conteudo,
      author
    })
      .then(() => {
        Alert.alert('Post atualizado com sucesso!');
        navigation.goBack();
      })
      .catch(() => Alert.alert('Erro ao atualizar post'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Editar Post</Text>

        <TextInput
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />
        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          style={[styles.input, { height: 100 }]}
        />
        <TextInput
          placeholder="Autor"
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />

        <Button title="Salvar Alterações" onPress={salvar} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  voltarBtn: {
    marginBottom: 16,
  },
  voltarText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});