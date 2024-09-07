import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Header from "../../mycomponents/header";

const Teladetalhe = () => {
    const { nomePet, imagePet } = useLocalSearchParams();

    // Configurando animação de escala para cada botão
    const scaleAnim1 = useRef(new Animated.Value(1)).current;
    const scaleAnim2 = useRef(new Animated.Value(1)).current;
    const scaleAnim3 = useRef(new Animated.Value(1)).current;

    // Estados para controlar os valores de sono, fome e diversão
    const [sleep, setSleep] = useState(80); // Valor de 0 a 100
    const [hunger, setHunger] = useState(50); // Valor de 0 a 100
    const [fun, setFun] = useState(70); // Valor de 0 a 100

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
        router.push("/telajogos");
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


    return (
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}
        >
            <Header title='DINOGOSHI' />
            {/* Barrinhas de Sono, Fome e Diversão */}
            {renderAttributeBar('Sono', sleep)}
            {renderAttributeBar('Fome', hunger)}
            {renderAttributeBar('Diversao', fun)}
            <View style={styles.container}>
                <Image
                    source={
                        imagePet === 'pet1'
                            ? require('../../assets/images/spritesDinoMove/DinoSpritesAmarelo.gif')
                            : imagePet === 'pet2'
                                ? require('../../assets/images/spritesDinoMove/DinoSpritesAzul.gif')
                                : imagePet === 'pet3'
                                    ? require('../../assets/images/spritesDinoMove/DinoSpritesVerde.gif')
                                    : require('../../assets/images/spritesDinoMove/DinoSpritesVermelho.gif')
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
                            source={require("../../assets/images/controle-de-video-game.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim1 }] }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={playGames}
                        onPressIn={() => handlePressIn(scaleAnim2)}
                        onPressOut={() => handlePressOut(scaleAnim2)}
                    >
                        <Animated.Image
                            source={require("../../assets/images/pizza.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim2 }] }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={playGames}
                        onPressIn={() => handlePressIn(scaleAnim3)}
                        onPressOut={() => handlePressOut(scaleAnim3)}
                    >
                        <Animated.Image
                            source={require("../../assets/images/lua-e-estrelas.png")}
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
