import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Header from '@/mycomponents/header';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
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

    useFocusEffect(
        useCallback(() => {
            list();
        }, [])
    );

    const handleSelectPet = (petId: number, nomePet: string, imagePet: string) => {
        router.push({
            pathname: "/teladetalhe",
            params: { petId, nomePet, imagePet }
        });
    };


    // Função para renderizar as barras de atributos com tipagem
    const renderAttributeBar = (label: string, value: number) => (
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeLabel}>{label}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barForeground, { width: `${value}%` }]} />
            </View>
        </View>
    );
    const getStatusPet = (hunger: number, sleep: number, fun: number) => {
        const statusSoma = hunger + sleep + fun;

        if (statusSoma === 0) {
            return "Morto";
        } else if (statusSoma <= 50) {
            return "Crítico";
        } else if (statusSoma <= 100) {
            return "Muito Triste";
        } else if (statusSoma <= 150) {
            return "Triste";
        } else if (statusSoma <= 200) {
            return "OK";
        } else if (statusSoma <= 250) {
            return "Bem";
        } else {
            return "Muito bem";
        }
    };




    return (
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}
        >
            <Header title='DINOGOSHI' />
            <View style={styles.container}>
                <Text style={styles.title}>Selecione seu Pet</Text>
                <FlatList
                    data={pets}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => {
                        // Verificando se o pet está "morto"
                        const isDead = item.Sono === 0 || item.Fome === 0 || item.Diversao === 0;

                        return (
                            <View style={[styles.petContainer, isDead && styles.petContainerDead]}>
                                {isDead ? (
                                    <View style={styles.deadContainer}>
                                        <Text style={styles.deadText}>O bichinho {item.Nome} morreu</Text>
                                        <Image
                                            source={
                                                item.Tipo_Cor === 'pet1'
                                                    ? require('@/assets/images/DinosDead/fantasmaAmarelo.gif')
                                                    : item.Tipo_Cor === 'pet2'
                                                        ? require('@/assets/images/DinosDead/fantasmaAzul.gif')
                                                        : item.Tipo_Cor === 'pet3'
                                                            ? require('@/assets/images/DinosDead/fantasmaVerde.gif')
                                                            : require('@/assets/images/DinosDead/fantasmaVermelho.gif')
                                            } style={styles.petImageDead}></Image>
                                    </View>

                                ) : (
                                    <>
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
                                        {/* Barras de status para sono, fome e diversão */}
                                        {renderAttributeBar('Sono', item.Sono)}
                                        {renderAttributeBar('Fome', item.Fome)}
                                        {renderAttributeBar('Diversao', item.Diversao)}

                                        {/* Exibição do status do pet */}
                                        <Text style={styles.statusText}>
                                            Status: {getStatusPet(item.Fome, item.Sono, item.Diversao)}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.buttonSelect}
                                            onPress={() => handleSelectPet(item.id, item.Nome, item.Tipo_Cor)}
                                        >
                                            <Text style={styles.buttonText}>Selecionar</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        );
                    }}
                />
            </View>
        </ImageBackground>
    );
};

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
        backgroundColor: "#286937",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#ffff",
        padding: 15,
        justifyContent: "center",
        width: 300
    },
    petContainerDead: {
        backgroundColor: "#333", // Cor escura para pet morto
        borderColor: "#222",
    },
    deadText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FF0000", // Cor vermelha para indicar que o pet morreu
        textAlign: "center",
        padding: 10,
        fontFamily: "Daydream",
    },
    deadContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    petImage: {
        width: 120,
        height: 100,
        backgroundColor: "#EDE7D6",
        borderRadius: 10,
        borderColor: "#392620",
        borderWidth: 4,
    },
    petImageDead: {
        width: 120,
        height: 100,
        backgroundColor: "#fff9",
        borderRadius: 10,
        borderColor: "#fc0303",
        borderWidth: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    petName: {
        fontSize: 12,
        textAlign: "center",
        color: "#ffff",
        textShadowColor: "#000",
        textShadowRadius: 9,
        fontFamily: "Daydream",
        justifyContent: "center",
        padding: 5
    },
    attributeContainer: {
        width: '80%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 5
    },
    attributeLabel: {
        fontSize: 12,
        fontFamily: 'Daydream',
        color: '#fff',
    },
    barBackground: {
        width: '100%',
        height: 20,
        backgroundColor: '#392629',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000"
    },
    barForeground: {
        height: '100%',
        backgroundColor: '#ede7d6',
        borderRadius: 10,
    },
    buttonSelect: {
        backgroundColor: "#EDE7D6",
        width: 120,
        height: 40,
        borderWidth: 3,
        borderColor: "#392620",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        marginTop: 10,

    },
    buttonText: {
        color: "#392620",
        fontSize: 8,
        fontFamily: "Daydream"
    }, statusText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Daydream',
        marginTop: 5,
        textAlign: 'center',
    },

});

export default telalistagem;
