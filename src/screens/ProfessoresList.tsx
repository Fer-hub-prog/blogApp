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
  Platform
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Professor = {
  id: number;
  nome: string;
  email: string;
};

export default function ProfessoresList() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const carregarProfessores = () => {
    axios.get<Professor[]>('http://192.168.0.7:3000/professores')
      .then(res => setProfessores(res.data))
      .catch(() => Alert.alert('Erro ao carregar professores'));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarProfessores);
    return unsubscribe;
  }, [navigation]);

  const excluirProfessor = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir este professor?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            axios.delete(`http://192.168.0.7:3000/professores/${id}`)
              .then(() => carregarProfessores())
              .catch(() => Alert.alert('Erro ao excluir professor'));
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

        <Text style={styles.title}>Lista de Professores</Text>

        <FlatList
          data={professores}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <View style={styles.buttons}>
                <Button title="Editar" onPress={() => navigation.navigate('EditarProfessor', { id: item.id })} />
                <Button title="Excluir" color="red" onPress={() => excluirProfessor(item.id)} />
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
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
  email: { color: '#555', marginBottom: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
});