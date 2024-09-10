import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Alert, Animated, Easing, ImageBackground } from 'react-native';
import { router } from 'expo-router';

const ReactionGame = () => {
    const [isGameActive, setIsGameActive] = useState<boolean>(false);
    const [reactionTime, setReactionTime] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [canPress, setCanPress] = useState<boolean>(false); // Permite saber se o usuário pode pressionar
    const [vibrationTimeout, setVibrationTimeout] = useState<NodeJS.Timeout | null>(null);
    const [dinoAnimation, setDinoAnimation] = useState<Animated.Value>(new Animated.Value(0)); // Animação do dino

    useEffect(() => {
        if (isGameActive) {
            // Começar o loop de vibração com intervalo aleatório
            startRandomVibration();
        } else if (vibrationTimeout) {
            clearTimeout(vibrationTimeout); // Limpar o timeout ao terminar o jogo
            setVibrationTimeout(null);
        }

        return () => {
            // Limpar o timeout quando o componente for desmontado
            if (vibrationTimeout) {
                clearTimeout(vibrationTimeout);
            }
            Vibration.cancel(); // Parar a vibração ao desmontar
        };
    }, [isGameActive]);

    // Função para definir a vibração com intervalo aleatório
    const startRandomVibration = () => {
        const randomInterval = Math.floor(Math.random() * 5000) + 2000; // Intervalo aleatório entre 2 e 7 segundos

        const timeout = setTimeout(() => {
            Vibration.vibrate(500); // Vibra por 500ms
            setStartTime(Date.now()); // Marca o momento da vibração
            setCanPress(true); // Permite o toque

            // Configura a próxima vibração
            startRandomVibration();
        }, randomInterval);

        setVibrationTimeout(timeout); // Armazena o timeout
    };

    const startGame = () => {
        setScore(0);  // Reiniciar pontuação
        setIsGameActive(true);  // Começar o jogo
        setReactionTime(0);
        setCanPress(false); // O jogador só pode tocar após a vibração
    };

    const handlePress = () => {
        if (!isGameActive || !canPress) {
            // Caso o jogador toque antes da vibração ou no momento errado
            Alert.alert('Muito cedo!', 'Você tocou antes da vibração.');
            setScore(score - 1); // Penalidade por tocar fora do tempo
            return;
        }

        // Verifica o tempo de reação
        const timeTaken = Date.now() - startTime;

        if (timeTaken > 0) {
            setReactionTime(timeTaken);
            setScore(score + 1);  // Aumenta a pontuação por reação rápida
            setCanPress(false);  // Desativa o toque até a próxima vibração

            // Iniciar a animação do dino
            startDinoAnimation();

            Alert.alert('Bom reflexo!', `Você reagiu em ${timeTaken} ms!`);
        }
    };

    const startDinoAnimation = () => {
        // Reseta a animação
        dinoAnimation.setValue(0);

        // Configura a animação de pulo
        Animated.sequence([
            Animated.timing(dinoAnimation, {
                toValue: 1,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(dinoAnimation, {
                toValue: 0,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start();
    };

    const endGame = () => {
        setIsGameActive(false);  // Termina o jogo
        setCanPress(false);
        Vibration.cancel(); // Parar a vibração quando o jogo terminar
        Alert.alert('Fim do Jogo', `Sua pontuação final foi: ${score}`);
    };

    const exitGame = () => {
        setIsGameActive(false); // Termina o jogo ao sair
        Vibration.cancel(); // Parar a vibração ao sair do jogo
        router.back();
    };

    // Configura o estilo da imagem do dino com base na animação
    const dinoStyle = {
        transform: [
            {
                translateY: dinoAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50] // Muda a altura do pulo para um valor menor
                })
            }
        ],
        zIndex: isGameActive ? -1 : 1, // Ajusta a ordem de sobreposição com base no estado do jogo
    };

    return (
        <ImageBackground
            source={require("@/assets/images/fundoGamePassos.jpg")}
            style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Jogo de Reflexos</Text>

                <Text style={styles.instructions}>
                    Toque assim que o telefone vibrar! Tente ser rapido.
                </Text>

                <Text style={styles.score}>Pontuacao: {score}</Text>

                {isGameActive ? (
                    <TouchableOpacity style={styles.pressArea} onPress={handlePress}>
                        <Text style={styles.pressText}>Pressione!</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={startGame}>
                        <Text style={styles.buttonText}>Iniciar Jogo</Text>
                    </TouchableOpacity>
                )}

                {isGameActive && (
                    <TouchableOpacity style={styles.buttonEnd} onPress={endGame}>
                        <Text style={styles.buttonText}>Terminar Jogo</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.buttonExit} onPress={exitGame}>
                    <Text style={styles.buttonTextExit}>Sair</Text>
                </TouchableOpacity>

                {/* Imagem do dino com animação de pulo */}
                <Animated.Image
                    source={require('@/assets/images/dino.gif')}
                    style={[styles.dino, dinoStyle]}
                />
            </View>
        </ImageBackground>
    );
};

export default ReactionGame;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50, // Adiciona um padding inferior para evitar que o dino sobreponha os botões
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#392629',
        fontFamily: "Daydream",
        backgroundColor: "#EDE7D6",
        padding: 10,
        borderWidth: 3,
        borderRadius: 5
    },
    instructions: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
        color: '#392629',
        fontFamily: "Daydream",
        backgroundColor: "#EDE7D6",
        padding: 5,
        borderWidth: 3,
        borderRadius: 5
    },
    score: {
        fontSize: 10,
        marginBottom: 40,
        color: '#fa1505',
        fontFamily: "Daydream",
        backgroundColor: "#EDE7D6",
        padding: 5,
        borderWidth: 3,
        borderRadius: 5
    },
    pressArea: {
        backgroundColor: '#EDE7D6',
        padding: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:4,
        borderColor:"#392629"
    },
    pressText: {
        fontSize: 24,
        color: '#392629',
        fontWeight:"bold"
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: "#fff",
        width: 250,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16, // Diminuído o tamanho da fonte
        color: '#FFF',
        fontFamily: "Daydream"
    },
    buttonEnd: {
        backgroundColor: '#Fa1505',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        marginTop:14,
        borderWidth:3,
        borderColor:"#fff"
    },
    buttonExit: {
        backgroundColor: '#0400ff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#fff",
    },
    buttonTextExit: {
        fontSize: 16, // Diminuído o tamanho da fonte
        color: '#FFF',
        fontFamily: "Daydream"
    },
    dino: {
        position: 'absolute',
        bottom: 10, // Ajuste a posição do dino para ficar mais para baixo
        width: 150, // Aumenta a largura do dino
        height: 150, // Aumenta a altura do dino
        zIndex: -1, // Define a ordem de sobreposição para ficar atrás dos botões inicialmente
    },
});
