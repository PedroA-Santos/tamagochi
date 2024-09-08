import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text, Image, TouchableWithoutFeedback, Easing, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenOrientation from 'expo-screen-orientation';
import dinoSprite from '@/assets/images/sprites/azul/moveRS.gif';
import { useRouter } from "expo-router";


const DinoGame = () => {
    const [isJumping, setIsJumping] = useState(false); //status de pulo
    const [obstaclePosition, setObstaclePosition] = useState(new Animated.Value(-50)); //obstáculo
    const jumpHeight = useRef(new Animated.Value(0)).current;
    const [gameOver, setGameOver] = useState(true);
    const [currentJumpHeight, setCurrentJumpHeight] = useState(0);
    const [score, setScore] = useState(0);


    const floor = require('@/assets/images/sprites/BackgroundLayers/Layer_0001_8.png'); // imagem do piso
    const obstacleImage = require('@/assets/images/sprites/Cactus/tile000.png') //imagem do obstaculo
    const router = useRouter()


    //função de reset do jogo ----
    const resetGame = () => {
        setObstaclePosition(new Animated.Value(-50));
        setGameOver(false);
        setIsJumping(false);
        setCurrentJumpHeight(0);
        jumpHeight.setValue(0);
        setScore(0);
    };

    const exitGame = async () => {
        // Desbloqueia a orientação da tela ao sair do jogo
        await ScreenOrientation.unlockAsync();

        // Navega de volta para a tela de detalhes
        router.push('/teladetalhe');
    };

    //função de pontos do jogo ------
    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(() => {
                setScore(prevScore => prevScore + 1);
            }, 50) //define o tempo pra subir os pontos

            return () => clearInterval(interval);
        }
    }, [gameOver]);

    //Animação Pulo -------
    const handleJump = () => {
        if (!isJumping && !gameOver) {
            setIsJumping(true);
            Animated.sequence([
                Animated.timing(jumpHeight, {
                    toValue: -150,
                    duration: 200,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(jumpHeight, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsJumping(false);
            });

            // Atualizar a altura do pulo com listener
            const listenerId = jumpHeight.addListener(({ value }) => {
                //console.log(`Jump Height: ${value}`); // Log para verificar o valor
                setCurrentJumpHeight(value);
            });

            return () => {
                jumpHeight.removeListener(listenerId);
            }
        }
    };

    useEffect(() => { ///para verificar se o jogo terminou durante a animação e interromper
        if (gameOver) {
            jumpHeight.stopAnimation();
            setIsJumping(false);
        }
    }, [gameOver]);



    //Animação obstaculos ------
    const currentJumpHeightRef = useRef(currentJumpHeight); //referência para não bugar o moveObstacle

    useEffect(() => { //Funçao que atualiza o currentJump  sempre que ele mudar
        currentJumpHeightRef.current = currentJumpHeight;
    }, [currentJumpHeight]);

    //finalmente a funçao que anima os obstaculos
    useEffect(() => {
        const moveObstacle = () => {
            const animation = Animated.timing(obstaclePosition, {
                toValue: -50,
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: true,
            });

            animation.start(({ finished }) => {
                if (!gameOver && finished) {
                    obstaclePosition.setValue(1000);
                    moveObstacle();
                }
            });

            if (gameOver) {
                animation.stop();
            }
        };

        // Adicionar listener para colisão
        const listenerId = obstaclePosition.addListener(({ value }) => {
            checkCollision(value, currentJumpHeightRef.current);
        });

        moveObstacle();

        return () => {
            obstaclePosition.removeAllListeners(); // Remove todos os listeners
        };
    }, [obstaclePosition, gameOver]);





    //função para veririficar a colisão --------
    const checkCollision = (obstacleLeft: number, currentJumpHeight: number) => {
        const dinoWidth = 40;
        const dinoHeight = 70;
        const dinoLeft = 230;
        const dinoRight = dinoLeft + 40;
        const dinoBottom = 28 + currentJumpHeight;
        const dinoTop = dinoBottom + 70;


        const obstacleWidth = 30;
        const obstacleheight = 50;
        const obstacleLeftPos = obstacleLeft;
        const obstacleRight = obstacleLeftPos + obstacleWidth;
        const obstacleTop = 22 + 50; //posição 'bottom' + altura

        //console.log(`Dino: ${dinoBottom}-${dinoTop}`);


        if (
            dinoRight > obstacleLeft &&
            dinoLeft < obstacleRight &&
            dinoBottom < obstacleTop &&
            dinoTop > 22 &&
            !gameOver
        ) {
            setGameOver(true);
            //alert("Game Over!");
            console.log(`Game Over! ${dinoBottom}-${dinoTop}`);
        }

    };

    //Animação do piso ----
    const floorPosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animatedFloor = () => {
            Animated.loop(
                Animated.timing(floorPosition, {
                    toValue: -898, // Ajuste o valor conforme necessário
                    duration: 2500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };
        animatedFloor();
    }, [floorPosition]);


    //Orientação da tela na horizontal -------
    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
        lockOrientation();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={handleJump}>
            <LinearGradient colors={['#FFA500', '#FFDAB9']} style={styles.container}>
                <Text style={styles.score}>Score: {score}</Text>
                <Animated.Image source={floor} resizeMode={'cover'} style={[styles.floor, { transform: [{ translateX: floorPosition }] }]} />
                <Animated.View style={[styles.dinoHitbox, { transform: [{ translateY: jumpHeight }] }]} />
                <Animated.View style={[styles.dino, { transform: [{ translateY: jumpHeight }] }]}>
                    <Image source={dinoSprite} style={styles.dinoImage} resizeMode="contain" />
                </Animated.View>
                <Animated.Image source={obstacleImage} style={[styles.cacto, { transform: [{ translateX: obstaclePosition }] }]} />
                {gameOver && (
                    <View style={styles.buttonContainer}>
                        <Button title="(Re)Iniciar" onPress={resetGame} />
                        <Button title="Sair" onPress={exitGame} />
                    </View>)}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    dino: {
        position: 'absolute',
        bottom: 10,
        left: 200,
        borderColor: 'blue',
        //borderWidth: 1,
    },
    dinoHitbox: {
        position: 'absolute',
        bottom: 22,
        left: 230,
        width: 40,
        height: 70,
        borderColor: 'red',
        //borderWidth: 1,
    },
    obstacle: {
        width: 30,
        height: 50,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 22,
    },
    cacto: {
        position: 'absolute',
        bottom: 0,
        width: 60,
        height: 100,
    },
    dinoImage: {
        width: 100,
        height: 100,
    },
    floor: {
        width: '205%',
        height: 700,
        position: "absolute",
        bottom: 0,
        resizeMode: 'stretch'
    },
    buttonContainer: {
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: [{ translateX: -50 }],
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff9",
        borderWidth: 4,
        borderColor: "#000",
        borderRadius: 5
    },
    score: {
        position: 'absolute',
        top: 30,
        left: 30,
        fontSize: 22,
        color: 'white',
    },
})

export default DinoGame;