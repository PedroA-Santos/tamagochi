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
        <ImageBackground
        source={require('../../assets/images/fundoInicial.jpg')}
        style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Pets</Text>
                <FlatList
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View style={styles.petContainer}>
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
