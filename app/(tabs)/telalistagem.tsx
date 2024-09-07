import { View, Text, StyleSheet, Image, FlatList, ImageBackground } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Button from '@/mycomponents/button';
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
        console.log(res)
    }

    useEffect(() => {
        list(); // Chama a função para buscar os pets quando o componente é montado
    }, []);



    const handleSelectPet = (petId: number) => {
        router.push({
            pathname: "/(tabs)/teladetalhe",
            params: { petId } //para navegar até a tela de detalhes com  o id do pet
        });

    }

    return (

        //* BACKGORUND DA TELA
        <ImageBackground
        source={require('../../assets/images/fundoInicial.jpg')}
        style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Pets</Text>
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
                            <Button titleButton='Selecionar' onPress={() => handleSelectPet(item.id)}></Button>
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

export default telalistagem;
