import { View, Text, StyleSheet } from 'react-native';

const telacadastro = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                TELA DE CADASTRO
            </Text>
        </View>
    );
}

export default telacadastro;
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