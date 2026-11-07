import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Registro de Libros Leídos</Text>
      <Text style={styles.subtitulo}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 8,
  },
});