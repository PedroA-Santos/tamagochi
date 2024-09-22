import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Button from '@/mycomponents/button';
import Header from '@/mycomponents/header';
import { useRouter, Href, router, useLocalSearchParams } from 'expo-router';




const telajogos = () => {
    const { petId } = useLocalSearchParams();

    const handleGameDino = () => {
        console.log(petId);
        router.push({
            pathname: "/DinoGame",
            params: { petId }
        })
    }

    const handleGameVib = () => {
        router.push({
            pathname: "/VibGame",
            params: { petId }
        })
    }


    return (

        <ImageBackground
            source={require('@/assets/images/fundoInicial.jpg')}
            style={styles.background}>
            <Header title='DINOGOSHI'></Header>
            <View style={styles.container}>
                <Text style={styles.title}>Selecione seu Jogo</Text>
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={handleGameDino}>
                    <Text style={styles.textDino}>Game do Dino</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={handleGameVib}>
                    <Text style={styles.textDino}>Game Vibra</Text>

                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    title: {
        fontSize: 20,
    
        marginBottom: 20,
        color: "#ffff",
        fontFamily: "Daydream"
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 20,
        backgroundColor: "#EDE7D6",
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "#392629",
        width: 350,
        height: 200,
        alignItems: "center",
        justifyContent: "center"
    },
    petImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    gameName: {
        fontSize: 18,
        color: "#392629",
        fontWeight: "bold",
        fontFamily: "Daydream",
        alignItems: "center",
        justifyContent: "center"
    }, textDino: {
        color: "#392629",
        fontFamily: "Daydream",
        fontSize: 24,
        borderRadius: 30

    }
});


export default telajogos;