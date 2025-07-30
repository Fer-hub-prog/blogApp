import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Post = {
  id: number;
  titulo?: string;
  description?: string;
  conteudo?: string;
  author?: string;
};

export default function PostsAluno() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [busca, setBusca] = useState('');
  const [postsFiltrados, setPostsFiltrados] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    axios.get<Post[]>('http://10.0.2.2:3000/posts')
      .then(res => {
        setPosts(res.data);
        setPostsFiltrados(res.data);
        setCarregando(false);
      })
      .catch(() => {
        alert('Erro ao carregar os posts');
        setCarregando(false);
      });
  }, []);

  useEffect(() => {
    const texto = busca.toLowerCase();
    const filtrados = posts.filter(p =>
      (p.titulo?.toLowerCase() ?? '').includes(texto) ||
      (p.description?.toLowerCase() ?? '').includes(texto)
    );
    setPostsFiltrados(filtrados);
  }, [busca, posts]);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#444" />
        <Text>Carregando posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Bem-vindo, Aluno!</Text>
      <TextInput
        placeholder="Buscar por título ou descrição"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetalhe', { post: item })}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo ?? 'Sem título'}</Text>
              <Text>{item.description ?? 'Sem descrição'}</Text>
              <Text style={styles.author}>Autor: {item.author ?? 'Desconhecido'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  author: { fontStyle: 'italic', color: '#555', marginTop: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});