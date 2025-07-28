import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos da resposta da API
type Usuario = {
  username: string;
  role: 'aluno' | 'professor';
};

type LoginResponse = {
  success: boolean;
  user: Usuario;
};

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>('http://192.168.0.7:3000/login', {
        username,
        password: senha,
      });

      if (response.status === 200 && response.data.success) {
        const { role } = response.data.user;

        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(response.data.user));

        Alert.alert('Sucesso', `Bem-vindo, ${username}!`);

        if (role === 'professor') {
          navigation.replace('PostsProfessor');
        } else if (role === 'aluno') {
          navigation.replace('PostsAluno');
        } else {
          Alert.alert('Erro', 'Tipo de usuário desconhecido');
        }
      }
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro no login, tente novamente');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo ao Blog Educação Fiap, desafio #4</Text>
      <Image
        source={require('../../assets/coruja.png')}
        style={styles.logo}
        resizeMode="contain"
      />      

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120, marginBottom: 20 },
  subtext: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    width: '100%',
  },
});
