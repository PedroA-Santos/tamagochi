import React, { useRef, useState, useEffect, useCallback } from 'react';
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
    const [dormindo, setDormindo] = useState(false);

    //Atualiza os status do pet


    useEffect(() => {
        if (dormindo) {
            const interval = setInterval( async () => {
                setSleep((prevSleep) => {
                    if (prevSleep >= 100) {
                        toSleep(petIDNumber, prevSleep); // Chama a função quando o sono atinge 100
                        clearInterval(interval); // Limpa o intervalo
                        setDormindo(false);
                        return 100; // Garante que o valor não ultrapasse 100
                    }
                    return prevSleep + 1; // Incrementa o valor de sono
                });
            }, 200); // Define o tempo para subir os pontos em ms
    
            return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente ou quando dormindo mudar
        }
    }, [dormindo]);
    
    

    useFocusEffect(
        useCallback(() => {
            async function fetchAndUpdatePet() {
                const res = await updatePetStatus(petIDNumber);
    
                if (res) {
                    setSleep(res.newSleep);
                    setHunger(res.newHunger);
                    setFun(res.newFun);
                }
            }
    
            fetchAndUpdatePet(); // Atualiza o pet quando a tela ganha foco
        }, [petIDNumber])
    );



    const getBackGroundColor = () => {
        switch (imagePet) {
            case "pet1":
                return "#525439";
            case "pet2":
                return "#3e4759";
            case "pet3":
                return "#465439";
            case "pet4":
                return "#543E39";
            default:
                return "#fff9";
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
        if (sleep >= 100) {
            alert("Seu pet já está totalmente descansado!");
            return; // Não permite dormir se o sono está cheio
        }

        const result = await toSleep(petIDNumber, sleep);

        if (result) {
            setDormindo(true); // Ativando o modo de sono
            setTimeout(() => {
                setSleep(result.newSleep);
                if (result.newSleep >= 100) {
                    setDormindo(false); // Desativando o modo de sono se o sono estiver cheio
                }
                updatePetStatus(petIDNumber); // Atualiza o status do pet após o sono
            }, (1 * 60000)); // 1 minuto de sono
        }
    }




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


    // Função para renderizar as barras de atributos com tipagem
    const renderAttributeBar = (label: string, value: number) => (
        <View style={styles.attributeContainer}>
            <Text style={styles.attributeLabel}>{label}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barForeground, { width: `${value}%` }]} />
            </View>
        </View>
    );

    //IF DO STATUS DO PET
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
            {/* VERIFICAÇÃO PARA MUDAR O ESTILO QUANDO ESRIVER DORMINDO */}
            {dormindo && (
                <View style={styles.sleepOverlay}>
                    <Text style={styles.iconSleep}>Dormindo</Text>
                    <TouchableOpacity onPress={() => setDormindo(false)}>
                        <Text style={styles.awakeButton}>Acordar</Text>
                    </TouchableOpacity>
                </View>
            )}


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
                            source={require("@/assets/images/play.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim1 }] }]}
                        />

                        <Text style={styles.iconText}>Jogar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={alimentar}
                        onPressIn={() => handlePressIn(scaleAnim2)}
                        onPressOut={() => handlePressOut(scaleAnim2)}
                    >
                        <Animated.Image
                            source={require("@/assets/images/comida.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim2 }] }]}
                        />

                        <Text style={styles.iconText}>Alimentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={dormir}
                        onPressIn={() => handlePressIn(scaleAnim3)}
                        onPressOut={() => handlePressOut(scaleAnim3)}
                    >
                        <Animated.Image
                            source={require("@/assets/images/lua.png")}
                            style={[styles.buttonImageIcons, { transform: [{ scale: scaleAnim3 }] }]}
                        />
                        <Text style={styles.iconText}>Dormir</Text>
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
        borderRadius: 20,
        borderColor: "#ede7d6"
    },
    petName: {
        fontSize: 22,
        color: "#ede7d6",
        textShadowColor: "#000",
        textShadowRadius: 5,
        fontFamily: "Daydream",
        backgroundColor: "#392629",
        padding: 5,
        width: 200,
        textAlign: "center",
        borderWidth: 3,
        borderColor: "#ede7d6",




    },
    petIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        width: '90%',
        bottom: -65,
        padding: 5,
    },
    buttonImageIcons: {
        height: 100,
        width: 100,
        resizeMode: "cover",
        borderWidth: 3,
        borderColor: "#ede7d6",
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#111111",
        marginVertical: 3



    },
    statusText: {
        fontSize: 12,
        color: '#392629',
        marginTop: 15,
        fontFamily: "Daydream",
        backgroundColor: "#EDE7D6",
        width: 300,
        marginLeft: 44,
        borderWidth: 3,
        borderColor: "#392629",
        padding: 3,
        height: "auto",
        textAlign: "center",
        textAlignVertical: "center"

    },
    iconText: {
        fontSize: 10,
        fontFamily: "Daydream",
        color: "#ede7d6",
        textAlign: "center",
        marginTop: 5
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
        backgroundColor: '#392629',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#392629",
        margin: 5
    },
    barForeground: {
        height: '100%',
        backgroundColor: '#ede7d6',
        borderRadius: 10,
    }, sleepOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo preto semi-transparente
        zIndex: 1, // Certifica-se de que fica sobre os outros elementos
    },
    iconSleep: {
        fontSize: 36,
        fontFamily: "Daydream",
        color: "#ede7d6",
        justifyContent: "center",
        textAlign: "center",
        marginTop: 400
    }, awakeButton: {
        fontSize: 24,
        color: '#ede7d6',
        backgroundColor: '#392629',
        padding: 10,
        marginTop: 20,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#ede7d6',
        width: 300,
        marginLeft: 60
    },

});
