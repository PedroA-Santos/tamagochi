import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/mycomponents/header';

const telajogos = () => {
    const router = useRouter();

    const goToDinoGame = () => {
        router.push("/DinoGame")
    }
    return (
        <ImageBackground
            source={require("../assets/images/fundoInicial.jpg")}
            style={styles.background}
        >
            <Header title='DINOGOSHI'></Header>
            <Text style={styles.titulo}>Selecione o Jogo :</Text>
            <View style={styles.container}>

                <View style={styles.selectGameContainer}>
                    <TouchableOpacity
                        style={styles.containerGame}
                        onPress={goToDinoGame}>
                        <Text style={styles.textGameContainer}>Jogo do Dino</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    );
}

export default telajogos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    titulo: {
        fontSize: 18,
        fontFamily: "Daydream",
        color: "#ffff",
        marginTop: 15,
        marginLeft: 65

    },
    selectGameContainer: {
        top: -330,
        justifyContent: "center",
        flexDirection: "column"

    }, containerGame: {
        backgroundColor: "#36843F",
        width: 350,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#000",
        borderRadius: 10
    },
    textGameContainer: {
        color: "#ffff",
        fontFamily: "Daydream",
        justifyContent: "center"

    }
})