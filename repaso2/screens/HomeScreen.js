import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ImageBackground 
} from 'react-native';

export default function HomeScreen() {
  // Estados para los inputs
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  
  // Estado para la lista y el cargando
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);

  const agregarLibro = () => {
    // Validar que no esten vacios
    if (titulo === '' || autor === '' || genero === '') {
      Alert.alert('Aviso', 'Por favor, llena todos los campos');
      return;
    }

    // Mostrar el ActivityIndicator
    setCargando(true);

    // Simular la espera de 4 segundos
    setTimeout(() => {
      // Crear objeto del nuevo libro
      let nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero
      };

      // Agregar a la lista
      setLibros([...libros, nuevoLibro]);

      // Limpiar los TextInput
      setTitulo('');
      setAutor('');
      setGenero('');

      // Quitar el cargando
      setCargando(false);

      // Mostrar alerta de exito
      Alert.alert('Éxito', 'Libro guardado correctamente');
    }, 4000);
  };

  return (
    <ImageBackground 
      source={require('../assets/FondoL.jpg')} 
      style={styles.fondo}
    >
      {/* Capa oscura para que se lea el texto */}
      <View style={styles.capaOscura}>
        
        <Text style={styles.tituloApp}>Mis Libros Favoritos</Text>

        {/* Formulario */}
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            value={titulo}
            onChangeText={(texto) => setTitulo(texto)}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={autor}
            onChangeText={(texto) => setAutor(texto)}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            value={genero}
            onChangeText={(texto) => setGenero(texto)}
          />

          <TouchableOpacity style={styles.boton} onPress={agregarLibro}>
            {cargando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.textoBoton}>Agregar libro</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* FlatList para mostrar los libros */}
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.textoTitulo}>{item.titulo}</Text>
              <Text style={styles.textoNormal}>Autor: {item.autor}</Text>
              <Text style={styles.textoNormal}>Género: {item.genero}</Text>
            </View>
          )}
        />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
  },
  capaOscura: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  tituloApp: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  },
  formulario: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  boton: {
    backgroundColor: '#0056b3',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tarjeta: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  textoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  textoNormal: {
    fontSize: 14,
    color: '#444',
    marginTop: 2,
  },
});