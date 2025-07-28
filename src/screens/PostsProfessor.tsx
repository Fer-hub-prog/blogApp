import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostItem from '../components/PostItem';

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  data?: string;
  autor: string;
};

export default function PostsProfessor({ navigation }: any) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editando, setEditando] = useState<number | null>(null);

  const carregarPosts = () => {
    axios.get<Post[]>('http://192.168.0.7:3000/posts')
      .then(res => setPosts(res.data));
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  const handleSalvar = () => {
    if (!titulo.trim() || !conteudo.trim() || !autor.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha título, conteúdo e autor');
      return;
    }

    const novoPost = { titulo, conteudo, autor };

    if (editando !== null) {
      axios.put(`http://192.168.0.7:3000/posts/${editando}`, novoPost)
        .then(() => {
          setTitulo('');
          setConteudo('');
          setAutor('');
          setEditando(null);
          carregarPosts();
        });
    } else {
      axios.post('http://192.168.0.7:3000/posts', novoPost)
        .then(() => {
          setTitulo('');
          setConteudo('');
          setAutor('');
          carregarPosts();
        });
    }
  };

  const handleEditar = (post: Post) => {
    setEditando(post.id);
    setTitulo(post.titulo);
    setConteudo(post.conteudo);
    setAutor(post.autor);
  };

  const handleExcluir = (id: number) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir este post?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          axios.delete(`http://192.168.0.7:3000/posts/${id}`).then(() => carregarPosts());
        },
      },
    ]);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Área do Professor</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Conteúdo" value={conteudo} onChangeText={setConteudo} />
      <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor} />

      <Button title={editando !== null ? 'Atualizar Post' : 'Criar Post'} onPress={handleSalvar} />

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem
            title={item.titulo}
            content={item.conteudo}
            date={item.data}
            author={item.autor}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleExcluir(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
});
