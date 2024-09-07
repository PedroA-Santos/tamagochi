import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ou qualquer outro pacote de ícones

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#EDE7D6', // Cor de fundo da barra de abas
          borderTopWidth: 0, // Opcional: Remove a borda superior da barra
        },
        tabBarLabelStyle: {
          color: '#392629',
           // Cor do texto das abas
        },
        tabBarIconStyle:{
          fontWeight:"bold",

        }
      }}>

      <Tabs.Screen
        name="telacadastro"
        options={{

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" color={"#392629"} size={size} />
          ),
          tabBarLabel: 'Cadastro',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="telalistagem"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={"#392629"} size={size} />
          ),
          tabBarLabel: 'Listagem',
          headerShown: false
        }}
      />



    </Tabs>
  );
}
