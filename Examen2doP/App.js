import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert } from 'react-native';


function TarjetaActividad({ nombre, descripcion }) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </View>
  );
}
export default function App() {
  const [encabezado, setEncabezado] = useState('');
  const [tarjetaActividad, setTarjetaActividad] = useState('');

  const [nombre, setNombre] = useState('Estudiar react native');
  const [descripcion, setDescripcion] = useState('Aprender a crear aplicaciones móviles con React Native');

  const [nombre1, setNombre1] = useState('Estudiar react native');
  const [descripcion1, setDescripcion1] = useState('Aprender a crear aplicaciones móviles con React Native');

  const alertaSimple = () => {
    Alert.alert('Hola', '¡Teto word of the day!');
  };


  const alertaDosBotones = () => {
    Alert.alert('Siguiente', [
      { text: 'Cancelar' },
      { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') },
    ]);
  };

  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.encabezado}>Mi Dia Universitario</Text>
      <Text style={styles.tarjetas}>
        <Pressable
          onPress={() => {
            setNombre('Estudiar react native');
            setDescripcion('Aprender a crear aplicaciones móviles con React Native');

          }}
          >
          <Text>{nombre}</Text>
        </Pressable>

        
      </Text>
      <TarjetaActividad nombre={nombre1} descripcion={descripcion1} />
      <TarjetaActividad nombre={nombre2} descripcion={descripcion2} />
      <Pressable onPress={alertaSimple}>
        <Text style={styles.tarjetas}>Alerta Simple</Text>
      </Pressable>
      <Pressable onPress={alertaDosBotones}>
        <Text style={styles.tarjetas}>Alerta con Dos Botones</Text>
      </Pressable>
      <StatusBar style="auto" />

    </SafeAreaView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#534e4e',
    alignItems: 'center',

    justifyContent: 'center',
  },
  encabezado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    radius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#000',
  },
  tarjetas: {
    fontSize: 18,
    color: '#fff',
    radius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333',
  },
});
