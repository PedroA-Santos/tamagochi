//*IMPORTES UTILIZADOS
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Header from '@/mycomponents/header';
import Button from '@/mycomponents/button';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';

const telacadastro = () => {
    //*CONTROLE DE ESTADOS NOMEPET,IMAGEMPET,MENSAGEM DE ERRO*//
    const [inputNomePet, setInputNomePet] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const inputPetRef = useRef<TextInput>(null)

    //* LIDANDO COM O NOME DO PET INSERIDO
    const handleNomePet = (text: string) => {
        setInputNomePet(text);
    };
    //* LIDANDO COM  A IMAGEM DO PET SELECIONADA
    const handleSelectImage = (image: string) => {
        setSelectedImage(image);
    };


    /**FUNÇÃO PARA CONFIRMAR A SELEÇÃO DO NOME E IMAGEM DO PET E SER REDIRECIONADO PARA A TELA DE LISTAGEM */
    //* ELA LIMPA OS INPUTS E TRATA OS INPUTS*/

    const handleConfirm = () => {
        if (inputNomePet && selectedImage) {
            router.push({
                pathname: "/(tabs)/telalistagem",
                params: { nomePet: inputNomePet, imagePet: selectedImage },
            });

            setInputNomePet("");
            setSelectedImage("");
            setErrorMessage(null)
        } else if (!inputNomePet && !selectedImage) {
            setErrorMessage("Preencha os campos Nome e Imagem do Pet")
            inputPetRef.current?.focus()
        } else if (!inputNomePet) {
            setErrorMessage("Preencha o Nome do pet")
            inputPetRef.current?.focus()
        } else if (!selectedImage) {
            setErrorMessage("Selecione a Imagem do seu Pet")
            inputPetRef.current?.focus()
        }

    };

    return (

        //* IMAGEM DE FUNDO
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}
        >
            <ScrollView>
                {/**INSERÇÃO DO NOME DO PET */}
                <View style={styles.container}>
                    <Header title='DINOGOSHI' />
                    <Text style={styles.titulo}>Nome do seu Pet:</Text>
                    <TextInput
                        style={styles.inputNomePet}
                        value={inputNomePet}
                        onChangeText={handleNomePet}
                        placeholder='Insira o nome do seu Pet'
                        maxLength={50}

                    />

                    {/*SELECIONANDO A IMAGEM DO PET */}
                    <Text style={styles.texto}>Selecione a imagem do seu Pet:</Text>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => handleSelectImage('pet1')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesAmarelo.gif')}
                                style={[
                                    styles.petImage,
                                    selectedImage === 'pet1' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet2')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesAzul.gif')}
                                style={[
                                    styles.petImage,
                                    selectedImage === 'pet2' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet3')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesVerde.gif')}
                                style={[
                                    styles.petImage,
                                    selectedImage === 'pet3' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet4')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesVermelho.gif')}
                                style={[
                                    styles.petImage,
                                    selectedImage === 'pet4' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    {/**MOSTRANDO O NOME DO PET INSERIDO */}
                    {inputNomePet && (
                        <Text style={styles.selectedImageText}>
                            O nome do seu Pet sera: {inputNomePet}

                        </Text>
                        /**MENSAGEM DE ERRO CASO OS INPUTS NÃO SEJAM PREENCHIDOS */
                    )}{errorMessage && (
                        <Text style={styles.errors}>{errorMessage}</Text>
                    )}
                    {/**BOTÃO DE CONFIRMAÇÃO */}
                    <Button titleButton='confirmar' onPress={handleConfirm} />
                </View>
            </ScrollView>
        </ImageBackground>

    );
};

export default telacadastro;





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    titulo: {
        fontSize: 18,
        fontFamily: "Daydream",
        color: "#ffff",
        marginTop: 15,

    },
    texto: {
        fontFamily: "Daydream",
        fontSize: 12,
        marginTop: 30,
        color: "#fff"
    },
    inputNomePet: {
        backgroundColor: "#36843F",
        width: 300,
        height: 40,
        borderColor: "#ffff",
        borderWidth: 3,
        paddingHorizontal: 8,
        marginTop: 10,
        borderRadius: 10,
        color: "#fff",
    },
    nomePreview: {
        fontSize: 16,
        fontFamily: "Daydream",
        marginTop: 10,
        color: "#267D33",
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 30,
    },
    petImage: {
        width: 150,
        height: 130,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "#fff9",
        borderWidth:4,
        borderColor:"#000"
    },
    selectedImage: {
        borderColor: '#fa0505',
        borderWidth: 6,
    },
    selectedImageText: {
        marginTop: 20,
        fontSize: 12,
        fontFamily: "Daydream",
        color: "#ffff",


    },
    errors: {
        color: "#fa0505",
        fontSize: 18,
        fontWeight: "bold",
        textDecorationLine: "underline",
        padding: 8
    }

});
