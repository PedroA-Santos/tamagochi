import { View, Text, StyleSheet } from 'react-native';

const telajogos = () => {
    return (
        <View style={styles.container}> 
            <Text style={styles.texto}>
                TELA DE JOGOS
            </Text>
        </View>
    );
}

export default telajogos;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000",
        justifyContent:"center",
        alignItems:"center"
    },
    texto:{
        fontSize:20,
        color:"#ffff"
    }
})