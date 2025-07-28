import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500); 

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
  source={require('../assets/splashscreen.png')}
  style={styles.image}
  entering={FadeIn.duration(1500)}
  resizeMode="contain"
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
