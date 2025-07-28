import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import PostsProfessor from '../screens/PostsProfessor';
import PostsAluno from '../screens/PostsAluno';
import PostDetalhe from '../screens/PostDetalhe';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PostsProfessor" component={PostsProfessor} />
        <Stack.Screen name="PostsAluno" component={PostsAluno} />
        <Stack.Screen name="PostDetalhe" component={PostDetalhe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}