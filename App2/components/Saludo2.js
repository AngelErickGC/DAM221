import {Text, Image, Button, View} from 'react-native';

export const Saludo2=()=>{
    return(

        <View>
            <Text>Hola RN: Soy un componente Propio Compuesto</Text>
        <Text>Hola RN: Soy un componente Propio</Text>
        <Image source={require('../assets/wave.png')} />
        <Button title="Presiona Para Saludar"/>
        </View>
    )
}