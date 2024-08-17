import { View, Text, StyleSheet } from 'react-native';

const teladetalhe = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                TELA DE DETALHES
            </Text>
        </View>
    );
}

export default teladetalhe;

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