import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';

export default function PressableScreen() {
  const [mensaje, setMensaje] = useState('Presiona el botón');
  const [activado, setActivado] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pressable</Text>
      <Text>{mensaje}</Text>

      <Pressable
        onPress={() => setMensaje('Botón presionado')}
        onPressIn={() => console.log('Inicia el apretado del botón')}
        onPressOut={() => console.log('Fin del apretado')}
        onLongPress={() => setMensaje('Pulsación prolongada')}
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
        ]}
      >
        <Text style={styles.textoBoton}>Presióname</Text>
      </Pressable>

      <View style={styles.separador} />

      <Text style={styles.titulo}>Switch</Text>
      <Text>Estado: {activado ? 'Activado' : 'Desactivado'}</Text>

      <Switch
        value={activado}
        onValueChange={setActivado}
        disabled={false}
        trackColor={{ false: '#ff000099', true: '#19d600' }}
        thumbColor={activado ? '#2de454' : '#999999'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#319b80',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  botonPresionado: {
    backgroundColor: '#1e6655',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  separador: {
    height: 2,
    backgroundColor: '#cccccc',
    width: '90%',
    marginVertical: 35,
  },
});