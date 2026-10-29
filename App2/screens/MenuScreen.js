/* 1. Zona imporyaciones */
import { StyleSheet, View, Text, Button } from 'react-native';
import { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeScreen from './SafeScreen';
import PressableScreen from './PressableScreen';
import TextInputAlert from './TextInputAlert';
import FlatListSectionList from './FlatListSectionList';
import ImageBackgroungSlapshScreen from './ImageBackgroungSlapshScreen';
import ModalBottomSheet from './ModalBottomSheet';
import ActivityIndicatorKeyboardAvoidingView from './ActivityIndicatorKeyboardAvoidingView';

/* 2. Zona Render o Main */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safe':
            return <SafeScreen />;
        case 'pressable':
            return <PressableScreen />;
        case 'menu':

        default:
            return (
                <View style={styles.container}>
                    <Text> Menu de Practicas </Text>
                    <Button title="Pract:Tarjetas" onPress={() => setScreen('tarjetas')}> </Button>
                    <Button title="Pract:SafeAreaView" onPress={() => setScreen('safe')}> </Button>
                    <Button title="Pract:PressableScreen" onPress={() => setScreen('pressable')}> </Button>
                    <Button title="Pract:TextInputAlert" onPress={() => setScreen('textInputAlert')}> </Button>
                    <Button title="Pract:FlatListSectionList" onPress={() => setScreen('flatListSectionList')}> </Button>
                    <Button title="Pract:ImageBackgroundSplashScreen" onPress={() => setScreen('imageBackgroundSplashScreen')}> </Button>
                    <Button title="Pract:ModalBottomSheet" onPress={() => setScreen('modalBottomSheet')}> </Button>
                    <Button title="Pract:ActivityIndicatorKeyboardAvoidingView" onPress={() => setScreen('activityIndicatorKeyboardAvoidingView')}> </Button>
                </View>
            );
    }
}



/* 3. Zona de Estilos */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

});