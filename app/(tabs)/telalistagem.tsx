import { View, Text, StyleSheet, Image, FlatList, ImageBackground } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/mycomponents/button';
import { useRouter } from 'expo-router';

const telalistagem = () => {
    const { nomePet, imagePet } = useLocalSearchParams();

    const pets = [
        { id: '1', nome: nomePet, imagem: imagePet }
    ];

    const handleSelectPet = () => {
        router.push("/(tabs)/teladetalhe")

    }

    return (
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Pets</Text>
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.petContainer}>
                            <Image
                                source={
                                    item.imagem === 'pet1'
                                        ? require('../../assets/images/spritesDinoMove/DinoSpritesAmarelo.gif')
                                        : item.imagem === 'pet2'
                                            ? require('../../assets/images/spritesDinoMove/DinoSpritesAzul.gif')
                                            : item.imagem === 'pet3'
                                                ? require('../../assets/images/spritesDinoMove/DinoSpritesVerde.gif')
                                                : require('../../assets/images/spritesDinoMove/DinoSpritesVermelho.gif')
                                }
                                style={styles.petImage}
                            />
                            <Text style={styles.petName}>{item.nome}</Text>
                            <Button titleButton='Selecionar' onPress={handleSelectPet}></Button>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

export default telalistagem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    petContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#000",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#36843F"
    },
    petImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    petName: {
        fontSize: 18,
        color: "#Ffff",
        textAlign: "center",
        fontWeight: "bold",
    },
});
