import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

export default function App() {
  // Variables para guardar lo que el usuario escribe
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [carreraAlumno, setCarreraAlumno] = useState('');
  const [semestreAlumno, setSemestreAlumno] = useState('');

  // Variables para los switches (preguntas de si/no)
  const [asisteTaller, setAsisteTaller] = useState(false);
  const [pideConstancia, setPideConstancia] = useState(false);
  const [haceDeporte, setHaceDeporte] = useState(false);

  // Función que se ejecuta al dar clic en el botón
  const registrarDatos = () => {

    // Primero checamos que no haya nada vacío
    if (
      nombreAlumno.trim() === '' ||
      carreraAlumno.trim() === '' ||
      semestreAlumno.trim() === ''
    ) {
      Alert.alert(
        "Campos incompletos",
        "Debes llenar todos los campos."
      );
      return; // Nos salimos de la función para que no siga
    }

    // Aquí verificamos si lo que escribió en semestre es letra o número
    // Usamos isNaN (Is Not a Number) para saber si NO es un número
    if (isNaN(semestreAlumno)) {
      Alert.alert(
        "Error",
        "El semestre debe ser un número."
      );
      return;
    }

    // Si pasó las validaciones, mostramos el resumen
    Alert.alert(
      "Registro enviado",
      `Nombre: ${nombreAlumno}\nCarrera: ${carreraAlumno}\nSemestre: ${semestreAlumno}\n\n` +
      `Taller: ${asisteTaller ? 'Sí' : 'No'}\n` +
      `Constancia: ${pideConstancia ? 'Sí' : 'No'}\n` +
      `Deportes: ${haceDeporte ? 'Sí' : 'No'}`
    );
  };

  return (
    <ScrollView contentContainerStyle={estilosApp.contenedorPrincipal}>

      <Text style={estilosApp.tituloApp}>Registro de Evento Universitario</Text>

      {/* Inputs del formulario */}
      <TextInput
        style={estilosApp.cajaTexto}
        placeholder="Nombre completo"
        placeholderTextColor="#999"
        value={nombreAlumno}
        onChangeText={setNombreAlumno}
      />

      <TextInput
        style={estilosApp.cajaTexto}
        placeholder="Carrera"
        placeholderTextColor="#999"
        value={carreraAlumno}
        onChangeText={setCarreraAlumno}
      />

      <TextInput
        style={estilosApp.cajaTexto}
        placeholder="Semestre"
        placeholderTextColor="#999"
        value={semestreAlumno}
        onChangeText={setSemestreAlumno}
        keyboardType="numeric"
      />

      <Text style={estilosApp.subtituloOpciones}>Opciones</Text>

      {/* Preguntas con los Switches */}
      <View style={estilosApp.filaSwitch}>
        <Text style={estilosApp.textoPregunta}>¿Asistirá al taller?</Text>
        <Switch
          trackColor={{ false: "#e0e0e0", true: "#007AFF" }}
          thumbColor={asisteTaller ? "#ffffff" : "#f4f3f4"}
          onValueChange={setAsisteTaller}
          value={asisteTaller}
        />
      </View>

      <View style={estilosApp.filaSwitch}>
        <Text style={estilosApp.textoPregunta}>¿Requiere constancia?</Text>
        <Switch
          trackColor={{ false: "#e0e0e0", true: "#007AFF" }}
          thumbColor={pideConstancia ? "#ffffff" : "#f4f3f4"}
          onValueChange={setPideConstancia}
          value={pideConstancia}
        />
      </View>

      <View style={estilosApp.filaSwitch}>
        <Text style={estilosApp.textoPregunta}>¿Participará en deportes?</Text>
        <Switch
          trackColor={{ false: "#e0e0e0", true: "#007AFF" }}
          thumbColor={haceDeporte ? "#ffffff" : "#f4f3f4"}
          onValueChange={setHaceDeporte}
          value={haceDeporte}
        />
      </View>

      {/* Botón para enviar */}
      <TouchableOpacity style={estilosApp.botonEnviar} onPress={registrarDatos}>
        <Text style={estilosApp.textoBoton}>Enviar Registro</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

// Aquí defino los estilos (cambié los nombres a español para que se vea más tuyo)
const estilosApp = StyleSheet.create({
  contenedorPrincipal: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA', // Un blanco un poco más grisáceo
    padding: 20,
    paddingTop: 50,
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#222',
  },
  cajaTexto: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#007AFF', // Borde azul para que se vea más bonito
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  subtituloOpciones: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    color: '#333',
  },
  filaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Más espacio entre preguntas
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textoPregunta: {
    fontSize: 16,
    color: '#444',
  },
  botonEnviar: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25, // Botón más redondeado
    marginTop: 25,
    marginBottom: 40,
    elevation: 3, // Sombrita en Android
    shadowColor: '#000', // Sombrita en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});