/* 1. Zona imporyaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,  } from 'react-native';
import { Perfil } from '../components/Perfil';

/* 2. Zona Render o Main */
export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>Hola Mundo React Native!</Text>
      <Image source={require('./assets/wave.png')} />

         <Text>_________________________________</Text>

         <Saludo></Saludo>
         <Saludo/>

          <Text>_________________________________</Text>

         <Saludo2></Saludo2>
         <Saludo2/>
 */}
      
      <Perfil style={styles.tarjetas1} nombre="Lia" carrera="Tecnologías de la Información e Innovación Digital"  materia="Desarrollo de Aplicaciones Móviles" cuatri="4"  />

      <Perfil style={styles.tarjetas2} nombre="Angel" carrera="Tecnologías de la Información e Innovación Digital"  materia="Desarrollo de Aplicaciones Móviles" cuatri="4" />

      <Perfil style={styles.tarjetas3} nombre="Erick" carrera="Tecnologías de la Información e Innovación Digital"  materia="Desarrollo de Aplicaciones Móviles" cuatri="4" />

      <StatusBar style="auto" />
    </View>
  );
}


/* 3. Zona de Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tarjetas1:{backgroundColor: 'lightgray'},
  tarjetas2:{backgroundColor: 'lightblue'},
  tarjetas3:{backgroundColor: 'lightgreen'},

});