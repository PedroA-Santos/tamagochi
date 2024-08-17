import { View, Text , StyleSheet} from 'react-native';

const telalistagem = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                TELA DE LISTAGEM
            </Text>
        </View>
    );
}

export default telalistagem;
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
