import { View, Text, StyleSheet, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import Button from '@/mycomponents/button';
import { useRouter, Href } from 'expo-router';

type Game = { //tipando o game para não ter problemas para usar o flat list
    id: string;
    name: string;
    //imagem: any;
    route: Href;
};

const games: Game[] = [ //aparentemente, se define o tipo com ': Game[]' inserindo o tipo dessa maneira
    {
        id: '1',
        name: 'Jogo do Dino',
        //image: require() // ---------- Talvez por uma imagem aqui
        route: '/DinoGame',
    },
    {
        id: '2',
        name: "Indefinido ainda '~' ",
        //image: require() 
        route: '/',
    },
];

const telajogos = () => {
    const router = useRouter();

    const renderItem = ({ item }: { item: Game }) => ( //aqui tem que tipar dnv com ': { item: Game }' para que não tenha problemas
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => router.push(item.route)}
            >
                <Text style={styles.gameName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/fundoInicial.jpg')}
            style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Jogos</Text>
                <FlatList
                    data={games}// Busca o vetor 'games' que criei com as informações dos jogos
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    background: {
        flex: 1,
        resizeMode: "cover"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 20,
        backgroundColor: "#000",
        borderRadius: 10,
        borderWidth: 4,
        borderColor: "#36843F",
    },
    petImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    gameName: {
        fontSize: 18,
        color: "#Ffff",
        fontWeight: "bold",
    },
});


export default telajogos;