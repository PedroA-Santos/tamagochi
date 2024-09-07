import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/mycomponents/header';
import { useEffect } from 'react';
import { usePetsDB } from '@/DataBase/db/usePetsDB';

const Index = () => {
  const router = useRouter();
  const { getAllPets } = usePetsDB();

  
    const checkExistPets = async () => {
      try {
        const pets = await getAllPets()
        if (pets.length === 0) {
          router.push("/(tabs)/telacadastro")
        } else if (pets.length > 0) {
          router.push("/(tabs)/telalistagem")
          
        }

      } catch (error) {
        console.log("Erro ao verificar pets");

      }
    }
  

  return (
    <ImageBackground
      source={require('../assets/images/fundoInicial.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Header title='DINOGOSHI' />
        <Image
          source={require('../assets/images/dino.gif')}
          style={styles.gif}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.buttonPlay}
          onPress={(checkExistPets)}

        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  gif: {
    width: 500,
    height: 380,
    marginTop: 200,
  },
  buttonPlay: {
    backgroundColor: '#267D33',
    padding: 10,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
    zIndex: 1,
    marginBottom: 40,
    borderWidth: 4,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
    fontFamily: 'Daydream',
  },
});
