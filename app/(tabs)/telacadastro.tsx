import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Header from '@/mycomponents/header';
import Button from '@/mycomponents/button';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const telacadastro = () => {
    const [inputNomePet, setInputNomePet] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleNomePet = (text: string) => {
        setInputNomePet(text);
    };

    const handleSelectImage = (image: string) => {
        setSelectedImage(image);
    };

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
            setErrorMessage("Preencha os campos obrigatórios")
        }

    };

    return (

        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}
        >
            <ScrollView>
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

                    {inputNomePet && (
                        <Text style={styles.selectedImageText}>
                            O nome do seu Pet sera: {inputNomePet}

                        </Text>
                    )}{errorMessage && (
                        <Text style={styles.errors}>{errorMessage}</Text> 
                    )}

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
        color: "#000",
        marginTop: 15,

    },
    texto: {
        fontFamily: "Daydream",
        fontSize: 12,
        marginTop: 30,
        color: "#0d0"
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
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    errors:{
        color:"#fa0505",
        fontSize:18,
        fontWeight:"bold",
        textDecorationLine:"underline",
        padding:8
    }
   
});
