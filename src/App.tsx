// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PostsProfessor from './screens/PostsProfessor';
import PostsAluno from './screens/PostsAluno';
import PostDetalhe from './screens/PostDetalhe';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PostsProfessor" component={PostsProfessor} options={{ title: 'Área do Professor' }} />
        <Stack.Screen name="PostsAluno" component={PostsAluno} options={{ title: 'Área do Aluno' }} />
        <Stack.Screen
  name="PostDetalhe"
  component={PostDetalhe}
  options={{ title: 'Detalhes do Post' }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
