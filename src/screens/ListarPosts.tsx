// src/screens/ListarPosts.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminPosts'>;

export default function ListarPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const carregarPosts = () => {
    axios.get<Post[]>('http://192.168.0.7:3000/posts')
      .then(res => setPosts(res.data))
      .catch(() => Alert.alert('Erro', 'Erro ao carregar posts'));
  };

  const excluirPost = (id: number) => {
    Alert.alert('Excluir', 'Deseja excluir este post?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: () => {
          axios.delete(`http://192.168.0.7:3000/posts/${id}`)
            .then(() => carregarPosts());
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts Cadastrados</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.author}>Autor: {item.author}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => navigation.navigate('EditarPost', { id: item.id })} />
              <Button title="Excluir" color="red" onPress={() => excluirPost(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  item: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12, backgroundColor: '#f9f9f9' },
  titleText: { fontWeight: 'bold', fontSize: 16 },
  author: { marginTop: 4, fontStyle: 'italic', color: '#666' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
