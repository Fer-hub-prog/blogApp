// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import PostsProfessor from '../screens/PostsProfessor';
import PostsAluno from '../screens/PostsAluno';
import ProfessoresList from '../screens/ProfessoresList';
import ProfessorForm from '../screens/ProfessorForm';
import EditarProfessor from '../screens/EditarProfessor';
import ListarEstudantes from '../screens/ListarEstudantes';
import EditarEstudante from '../screens/EditarEstudante';
import AdminPosts from '../screens/AdminPosts';
import CriarPostProfessor from '../screens/CriarPostProfessor';
import CriarProfessor from '../screens/CriarProfessor';
import CriarEstudante from '../screens/CriarEstudante';
import PostDetalhe from '../screens/PostDetalhe';
import EditarPost from '../screens/EditarPost';

export type RootStackParamList = {
  Login: undefined;
  PostsProfessor: undefined;
  PostsAluno: undefined;
  ProfessoresList: undefined;
  ProfessorForm: { professor?: { id: number; nome: string; email: string; senha?: string } } | undefined;
  EditarProfessor: { id: number };
  ListarEstudantes: undefined;
  EditarEstudante: { id: number };
  AdminPosts: undefined;
  CriarPostProfessor: undefined;
  CriarProfessor: undefined;
  CriarEstudante: undefined;
  EditarPost: { id: number };
  PostDetalhe: { post: { id: number; titulo?: string; description?: string; conteudo?: string; author?: string } };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { userType } = useAuth();
if (userType === null) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />

        {userType === 'aluno' && (
          <>
            <Stack.Screen name="PostsAluno" component={PostsAluno} />
            <Stack.Screen name="PostDetalhe" component={PostDetalhe} />
          </>
        )}

        {userType === 'professor' && (
          <>
            <Stack.Screen name="PostsProfessor" component={PostsProfessor} />
            <Stack.Screen name="CriarPostProfessor" component={CriarPostProfessor} />
            <Stack.Screen name="PostDetalhe" component={PostDetalhe} />
            <Stack.Screen name="AdminPosts" component={AdminPosts} />
            <Stack.Screen name="CriarProfessor" component={CriarProfessor} />
            <Stack.Screen name="CriarEstudante" component={CriarEstudante} />    
            <Stack.Screen name="ProfessoresList" component={ProfessoresList} />
            <Stack.Screen name="ProfessorForm" component={ProfessorForm} />
            <Stack.Screen name="EditarPost" component={EditarPost} />
            <Stack.Screen name="EditarProfessor" component={EditarProfessor} />
            <Stack.Screen name="ListarEstudantes" component={ListarEstudantes} />
            <Stack.Screen name="EditarEstudante" component={EditarEstudante} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}