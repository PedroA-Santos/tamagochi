import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Header from '@/mycomponents/header';
import { useRouter } from 'expo-router';

import { useEffect, useState } from 'react';
import { usePetsDB } from '@/DataBase/db/usePetsDB';

import { Pet } from "@/DataBase/Models/Models";



const telalistagem = () => {
    const { getAllPets } = usePetsDB();

    const [pets, setPets] = useState<Pet[]>([]);
    const router = useRouter();

    async function list() {
        const res = await getAllPets();
        setPets(res);
    }

    useEffect(() => {
        list(); // Chama a função para buscar os pets quando o componente é montado
    }, [list]);

    const handleSelectPet = (petId: number, nomePet: string, imagePet: string) => {
        router.push({
            pathname: "/teladetalhe",
            params: { petId, nomePet, imagePet } //para navegar até a tela de detalhes com  o id do pet

        });

    }

    return (

        //* BACKGORUND DA TELA
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}>
            <Header title='DINOGOSHI'></Header>
            <View style={styles.container}>
                <Text style={styles.title}>Selecione seu Pet</Text>
                {/*LISTA PARA A RENDERIZAÇÃO DOS PETS COM NOME, IMAGEM E BOTÃO PARA SELECIONAR */}
                <FlatList
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={styles.petContainer}>
                            {/**IMAGEM DO PET */}
                            <Image
                                source={
                                    item.Tipo_Cor === 'pet1'
                                        ? require('../../assets/images/spritesDinoMove/DinoSpritesAmarelo.gif')
                                        : item.Tipo_Cor === 'pet2'
                                            ? require('../../assets/images/spritesDinoMove/DinoSpritesAzul.gif')
                                            : item.Tipo_Cor === 'pet3'
                                                ? require('../../assets/images/spritesDinoMove/DinoSpritesVerde.gif')
                                                : require('../../assets/images/spritesDinoMove/DinoSpritesVermelho.gif')
                                }
                                style={styles.petImage}
                            />
                            <Text style={styles.petName}>{item.Nome}</Text>
                            <TouchableOpacity style={styles.buttonSelect} onPress={() => handleSelectPet(item.id, item.Nome, item.Tipo_Cor)}>
                                <Text style={styles.buttonText}>Selecionar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    title: {
        fontFamily: "Daydream",
        color: "#ffff",
        justifyContent: "center",
        margin: 18,

    },
    petContainer: {
        flexDirection: "column",
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "#286937", // Verde Florestal
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#ffff", // Marrom Terra
        padding: 15,
        justifyContent: "center",
        width: 300
    },
    petImage: {
        width: 120,
        height: 100,
        backgroundColor: "#EDE7D6", // Bege Claro
        borderRadius: 10,
        borderColor: "#392620", // Cinza Pedregoso
        borderWidth: 4,
    },
    petName: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        color: "#ffff", // Amarelo Areia
        textShadowColor: "#000",
        textShadowRadius: 9,
        fontFamily: "Daydream",
        justifyContent: "center",
        padding: 5
    },
    buttonSelect: {
        backgroundColor: "#EDE7D6", // Bege Claro
        width: 120,
        height: 40,
        borderWidth: 3,
        borderColor: "#392620", // Marrom Terra
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    buttonText: {
        color: "#392620", // Verde Florestal
        fontSize: 16,
        fontWeight: "bold"
    },
});

export default telalistagem;
