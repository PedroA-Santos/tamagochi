//* IMPORTS UTILIZADOS NA TELA DE LISTAGEM
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from "../../mycomponents/header";

const Telalistagem = () => {
    //*ESTADO UTILIZADO PARA RECEBER O NOME E IMAGEM USADOS NO CADASTRO
    const { nomePet, imagePet } = useLocalSearchParams();
    const router = useRouter();

    // DEFININDO O TYPE DO PET
    type Pet = {
        id: string;
        nome: string;
        imagem: string;
    };

    // ADICIONANDO O TYPE DO PET NO ARRAY DE PETS
    const pets: Pet[] = [
        { id: '1', nome: nomePet as string, imagem: imagePet as string }
    ];

    // FUNÇÃO PARA SELECIONAR O PET NA LISTA PASSANDO SEUS PARAMETROS PARA A TELA DE DETALHES E ENCAMINHANDO PARA LA
    const handleSelectPet = (pet: Pet) => {
        router.push({
            pathname: "/(tabs)/teladetalhe",
            params: { nomePet: pet.nome, imagePet: pet.imagem }
        });
    };

    return (

        //* BACKGORUND DA TELA
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}>
            <Header title='DINOGOSHI' />
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Pets</Text>
                {/*LISTA PARA A RENDERIZAÇÃO DOS PETS COM NOME, IMAGEM E BOTÃO PARA SELECIONAR */}
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.petContainer}>
                            {/**IMAGEM DO PET */}
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
                            <TouchableOpacity
                                style={styles.buttonSelect}
                                onPress={() => handleSelectPet(item)}
                            >
                                <Text style={styles.buttonText}>Selecionar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: "Daydream",
        color: "#ffff",
        justifyContent: "center",
        marginLeft: 50
    },
    petContainer: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#10641f",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#000",
        padding: 15,
        justifyContent: "center"

    },
    petImage: {
        width: 120,
        height: 100,
        backgroundColor: "#fff9",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 4,

    },
    petName: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff",
        textShadowColor: "#000",
        textShadowRadius: 9,
        fontFamily: "Daydream",
        justifyContent: "center",
        padding: 5
    },
    buttonSelect: {
        backgroundColor: "#fff9",
        width: 120,
        height: 40,
        borderWidth: 3,
        borderColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5


    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default Telalistagem;
