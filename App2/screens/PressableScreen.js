/* 1. Zona imporyaciones */
import { StyleSheet, View,  } from 'react-native';

/* 2. Zona Render o Main */
export default function PressableScreen() {
  return (
    
    <View style={styles.container}>
      <Text> Practica 11 </Text>
      <Text> Alvaro O Alan </Text>
  
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

});
