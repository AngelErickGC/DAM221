import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [pantallaCarga, setPantallaCarga] = useState(true);

  useEffect(() => {
    // Temporizador de 2 segundos para el splash
    const timer = setTimeout(() => {
      setPantallaCarga(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {pantallaCarga ? <SplashScreen /> : <HomeScreen />}
    </View>
  );
}