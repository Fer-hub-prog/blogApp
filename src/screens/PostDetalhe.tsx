import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PostDetalheRouteProp = RouteProp<RootStackParamList, 'PostDetalhe'>;
type PostDetalheNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostDetalhe'>;

export default function PostDetalhe() {
  const route = useRoute<PostDetalheRouteProp>();
  const navigation = useNavigation<PostDetalheNavigationProp>();
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{post.titulo ?? 'Sem título'}</Text>
      <Text style={styles.author}>Autor: {post.author ?? 'Desconhecido'}</Text>
      <Text style={styles.description}>{post.description ?? 'Sem descrição'}</Text>
      <Text style={styles.content}>{post.conteudo ?? 'Sem conteúdo disponível.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 48 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  author: { fontStyle: 'italic', marginBottom: 12 },
  description: { fontSize: 16, color: '#666', marginBottom: 16 },
  content: { fontSize: 18, lineHeight: 24 },
});