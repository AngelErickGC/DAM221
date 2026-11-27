import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Alert
} from 'react-native';
import { agregarUsuario } from '../services/usuariosService';

export default function AltaUsuariosScreen() {
  const [guardando, setGuardando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');

  const guardarUsuario = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);

    try {
      await agregarUsuario(nombre, edad);
      setNombre('');
      setEdad('');
      Alert.alert('Éxito', 'Usuario guardado correctamente.');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.tituloPrincipal}>Registro de Usuarios</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          disabled={guardando}
          style={[styles.boton, guardando && { backgroundColor: '#999' }]}
          onPress={guardarUsuario}
        >
          <Text style={styles.textoBoton}>
            {guardando ? 'Guardando...' : 'Agregar Usuario'}
          </Text>
        </Pressable>

        {guardando && (
          <>
            <ActivityIndicator size="large" color="#1565C0" style={{ marginTop: 20 }} />
            <Text style={styles.guardando}>Guardando usuario...</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F5F7FA' // Fondo gris claro para toda la pantalla
  },
  tituloPrincipal: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1F2937', // Color oscuro para que resalte en fondo claro
    textAlign: 'center', 
    marginBottom: 25,
    marginTop: 20
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    color: '#1F2937'
  },
  boton: { 
    backgroundColor: '#1565C0', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center' 
  },
  textoBoton: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  guardando: { 
    color: '#1565C0', // Letras azules para el texto de guardando
    textAlign: 'center', 
    marginTop: 10, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});