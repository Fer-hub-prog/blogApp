import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Post = {
  id: number;
  titulo: string;
  description?: string;
  author?: string;
};

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const carregarPosts = () => {
    axios.get<Post[]>('http://192.168.0.7:3000/posts')
      .then(res => setPosts(res.data))
      .catch(() => Alert.alert('Erro ao carregar os posts'));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarPosts);
    return unsubscribe;
  }, [navigation]);

  const excluirPost = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.0.7:3000/posts/${id}`)
              .then(() => carregarPosts())
              .catch(() => Alert.alert('Erro ao excluir post'));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Administração de Posts</Text>

        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.autor}>Autor: {item.author ?? 'Desconhecido'}</Text>
              <View style={styles.buttons}>
                <Button title="Editar" onPress={() => navigation.navigate('EditarPost', { id: item.id })} />
                <Button title="Excluir" color="red" onPress={() => excluirPost(item.id)} />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: { flex: 1, padding: 16 },
  voltarBtn: { marginBottom: 8 },
  voltarText: { color: '#007AFF', fontSize: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
  },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  autor: { color: '#555', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});