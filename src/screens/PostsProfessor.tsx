import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function PostsProfessor() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Painel do Professor</Text>
      <Button title="CRIAR NOVO POST" onPress={() => navigation.navigate('CriarPostProfessor')} />
      <Button title="GERENCIAR PROFESSORES" onPress={() => navigation.navigate('ProfessoresList')} />
      <Button title="CADASTRAR PROFESSOR" onPress={() => navigation.navigate('CriarProfessor')} />
      <Button title="GERENCIAR ESTUDANTES" onPress={() => navigation.navigate('ListarEstudantes')} />
      <Button title="CADASTRAR ESTUDANTE" onPress={() => navigation.navigate('CriarEstudante')} />
      <Button title="PAINEL ADMINISTRATIVO DE POSTS" onPress={() => navigation.navigate('AdminPosts')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});
