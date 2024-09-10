import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import Header from "@/mycomponents/header";
import { usePetsDB } from '@/DataBase/db/usePetsDB';
import { Pet } from "@/DataBase/Models/Models";

const Teladetalhe = () => {
    const { nomePet, imagePet, petId } = useLocalSearchParams();
    const { updatePetStatus, toFeed, toSleep } = usePetsDB();

    const petIDNumber = Number(petId)//alterando o parametro do ID que vem como string

    // Configurando animação de escala para cada botão
    const scaleAnim1 = useRef(new Animated.Value(1)).current;
    const scaleAnim2 = useRef(new Animated.Value(1)).current;
    const scaleAnim3 = useRef(new Animated.Value(1)).current;




    // Estados para controlar os valores de sono, fome e diversão
    const [sleep, setSleep] = useState<number>(100); // Valor de 0 a 100
    const [hunger, setHunger] = useState<number>(100); // Valor de 0 a 100
    const [fun, setFun] = useState<number>(100); // Valor de 0 a 100

    //Atualiza os status do pet
    async function attPet() {
        const res = await updatePetStatus(petIDNumber);

        if (res) {
            setSleep(res.newSleep);
            setHunger(res.newHunger);
            setFun(res.newFun);
        }
    };

    useFocusEffect(() => {
        attPet();
    });



    const getBackGroundColor = () => {
        switch (imagePet) {
            case "pet1":
                return "#52543e";
            case "pet2":
                return "#3e4754";
            case "pet3":
                return "#46543e";
            case "pet4":
                return "#543E3E";
            default:
                return "#ffff";
        }
    };


    const playGames = () => {
        router.push({
            pathname: "/telajogos",
            params: { petId } //para navegar até a tela de jogos com  o id do pet
        });
    };


    async function alimentar() {
        const res = await toFeed(petIDNumber);

        if (res) {
            setHunger(res.newHunger);
        }
    };

    async function dormir() {
        const result = await toSleep(petIDNumber);

        if (result) {

            // Timer para acordar o pet depois de, por exemplo, 1 minuto (60000 ms)
            setTimeout(() => {
                setSleep(result.newSleep);
                updatePetStatus(petIDNumber); // Atualiza o status do pet após o sono
            }, (1 * 60000));
        }
    };



    // Função para iniciar a animação de escala
    const handlePressIn = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 0.8, // Diminuindo o tamanho para 80%
            useNativeDriver: true,
        }).start();
    };

    // Função para voltar ao tamanho original
    const handlePressOut = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 1, // Retornando ao tamanho original
            useNativeDriver: true,
        }).start();
    };

    // Função para renderizar as barras de atributos
    // Função para renderizar as barras de atributos com tipagem
    const renderAttributeBar = (label: string, value: number) => (
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeLabel}>{label}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barForeground, { width: `${value}%` }]} />
            </View>
        </View>
    );

    const statusPet = () => {
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
            source={require('@/assets/images/fundoInicial.jpg')}
            style={styles.background}
        >
            <Header title='DINOGOSHI' />
            {/* Barrinhas de Sono, Fome e Diversão */}
            {renderAttributeBar('Sono', sleep)}
            {renderAttributeBar('Fome', hunger)}
            {renderAttributeBar('Diversao', fun)}
            <View>
                <Text style={styles.statusText}> Status: {statusPet()}</Text>

            </View>
            <View style={styles.container}>
                <Image
                    source={
                        imagePet === 'pet1'
                            ? require('@/assets/images/spritesDinoMove/DinoSpritesAmarelo.gif')
                            : imagePet === 'pet2'
                                ? require('@/assets/images/spritesDinoMove/DinoSpritesAzul.gif')
                                : imagePet === 'pet3'
                                    ? require('@/assets/images/spritesDinoMove/DinoSpritesVerde.gif')
                                    : require('@/assets/images/spritesDinoMove/DinoSpritesVermelho.gif')
                    }
                    style={[styles.petImage, { backgroundColor: getBackGroundColor() }]}
                />
                <Text style={styles.petName}>{nomePet}</Text>


                <View style={styles.petIconsContainer}>
                    <TouchableOpacity
                        onPress={playGames}
                        onPressIn={() => handlePressIn(scaleAnim1)}
                        onPressOut={() => handlePressOut(scaleAnim1)}
                    >
                        <Animated.Image
                            source={require("@/assets/images/controle-de-video-game.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim1 }] }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={alimentar}
                        onPressIn={() => handlePressIn(scaleAnim2)}
                        onPressOut={() => handlePressOut(scaleAnim2)}
                    >
                        <Animated.Image
                            source={require("@/assets/images/pizza.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim2 }] }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={dormir}
                        onPressIn={() => handlePressIn(scaleAnim3)}
                        onPressOut={() => handlePressOut(scaleAnim3)}
                    >
                        <Animated.Image
                            source={require("@/assets/images/lua-e-estrelas.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim3 }] }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Teladetalhe;

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
    petImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderWidth: 4,
        borderRadius: 15,
    },
    petName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
        textShadowColor: "#000",
        textShadowRadius: 5,
        fontFamily: "Daydream",
    },
    petIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: '90%',
        bottom: -120,
        padding: 5,
    },
    buttonImageIcons: {
        height: 100,
        width: 100,
        backgroundColor: "#fff9",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#000",

    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        fontFamily:"Daydream"
    },

    // Estilos para as barrinhas de atributos
    attributeContainer: {
        width: '70%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginLeft: 55,
        marginTop: 10



    },
    attributeLabel: {
        fontSize: 12,
        fontFamily: 'Daydream',
        color: '#fff',


    },
    barBackground: {
        width: '100%',
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000"
    },
    barForeground: {
        height: '100%',
        backgroundColor: '#4caf50',
        borderRadius: 10,
    },
});
