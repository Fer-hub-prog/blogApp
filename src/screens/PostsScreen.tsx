import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à tela de posts!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
