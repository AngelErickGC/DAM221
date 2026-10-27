
/* 1. Zona imporyaciones */
import { StyleSheet, View,  } from 'react-native';
import MenuScreen from './screens/MenuScreen';

/* 2. Zona Render o Main */
export default function App() {
  return (
    
    <View style={styles.container}>

      <MenuScreen></MenuScreen>
  
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
