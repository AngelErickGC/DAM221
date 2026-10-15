
/* 1. Zona imporyaciones */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';

/* 2. Zona Render o Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola Mundo React Native!</Text>
      <Image source={require('./assets/wave.png')} />

         <Text>_________________________________</Text>

         <Saludo></Saludo>
         <Saludo/>

          <Text>_________________________________</Text>

         <Saludo2></Saludo2>
         <Saludo2/>

      <StatusBar style="auto" />
    </View>
  );
}


/* 3. Zona de Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
