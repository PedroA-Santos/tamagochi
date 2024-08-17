import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Ajuste o caminho conforme necessário

const index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>TELA INICIAL</Text>
      <Button
        title="Vá para a Tela de Cadastro"
        onPress={() => navigation.navigate('telacadastro')}
      />
    </View>
  );
}

export default index;
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:"#000",
      justifyContent:"center",
      alignItems:"center"
  },
  texto:{
      fontSize:20,
      color:"#ffff"
  }
})

