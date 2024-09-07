
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Header from '@/mycomponents/header';
import Button from '@/mycomponents/button';
import { useState, useRef } from 'react';
import { useRouter } from 'expo-router';

//importando a funções de consultas da base de dados
import { usePetsDB } from '@/DataBase/db/usePetsDB';

const telacadastro = () => {
    const [nome, setNome] = useState<string>("");
    const [tipo_cor, setTipo_cor] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const inputPetRef = useRef<TextInput>(null);

    const { addPet } = usePetsDB();

    const create = async () => {
        if (nome && tipo_cor) {
            try {
                const res = await addPet({ nome, tipo_cor });
                console.log(res);

                // Redirecionar após o cadastro
                router.push({
                    pathname: "/(tabs)/telalistagem",
                    params: { nome }
                });

                // Resetar campos após o sucesso
                setNome("");
                setTipo_cor("");
                setErrorMessage(null);

            } catch (error) {
                console.error("Erro ao cadastrar o pet:", error);
                setErrorMessage("Ocorreu um erro ao cadastrar seu pet. Tente novamente.");
            }
        } else {
            if (!nome || !tipo_cor) {
                setErrorMessage("Preencha corretamente os campos Nome e Imagem do Pet");
                inputPetRef.current?.focus();
            }
        }
    };


    const handleSelectImage = (image: string) => {
        setTipo_cor(image);
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
                        value={nome}
                        onChangeText={setNome}
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
                                    tipo_cor === 'pet1' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet2')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesAzul.gif')}
                                style={[
                                    styles.petImage,
                                    tipo_cor === 'pet2' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet3')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesVerde.gif')}
                                style={[
                                    styles.petImage,
                                    tipo_cor === 'pet3' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSelectImage('pet4')}>
                            <Image
                                source={require('../../assets/images/spritesDinoMove/DinoSpritesVermelho.gif')}
                                style={[
                                    styles.petImage,
                                    tipo_cor === 'pet4' && styles.selectedImage,
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    {nome && (
                        <Text style={styles.selectedImageText}>
                            O nome do seu Pet sera: {nome}

                        </Text>
                        /**MENSAGEM DE ERRO CASO OS INPUTS NÃO SEJAM PREENCHIDOS */
                    )}{errorMessage && (
                        <Text style={styles.errors}>{errorMessage}</Text>
                    )}

                    <Button titleButton='confirmar' onPress={create} />
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
        borderWidth: 4,
        borderColor: "#000"
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
