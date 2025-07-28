import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostItem from '../components/PostItem';

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  data?: string;
  author?: string;
};

export default function PostsAluno({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [busca, setBusca] = useState('');
  const [postsFiltrados, setPostsFiltrados] = useState<Post[]>([]);

  useEffect(() => {
   axios.get<Post[]>('http://192.168.0.7:3000/posts')
  .then((res) => {
    setPosts(res.data);
    setPostsFiltrados(res.data);
  });
      }, []); 

  useEffect(() => {
    const texto = busca.toLowerCase();
    const filtrados = posts.filter(p =>
      p.titulo.toLowerCase().includes(texto) || p.conteudo.toLowerCase().includes(texto)
    );
    setPostsFiltrados(filtrados);
  }, [busca, posts]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Posts dos Professores</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar post por palavra-chave"
        value={busca}
        onChangeText={setBusca}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem
  title={item.titulo}
  content={item.conteudo}
  date={item.data}
  author={item.author || item.author}
  onPress={() => navigation.navigate('PostDetalhe', item)}
/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
