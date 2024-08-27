import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // ou qualquer outro pacote de ícones

export default function TabsLayout() {
  return (
    <Tabs>

      <Tabs.Screen
        name="telacadastro"
        options={{

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Cadastro',
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="telalistagem"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Listagem',
          headerShown: false
        }}
<<<<<<< HEAD
      />
      <Tabs.Screen
        name="teladetalhe"
        options={{ title: 'Tela de Detalhes' }}
=======
>>>>>>> 3755ff91e2bd9c53b744e64e7fae986f6d1443fe
      />
      <Tabs.Screen
        name="telajogos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Jogos',
          headerShown: false
        }}
      />
      <Tabs.Screen
<<<<<<< HEAD
        name="DinoGame"
        options={{ title: 'DinoGame', tabBarStyle: { display: 'none' } }} //para esconder o tabs na tela do jogo
      />
=======
        name="teladetalhe"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="eye-outline" color={color} size={size} />
          ),
          tabBarLabel: 'Detalhes',
          headerShown: false
        }}
      />

>>>>>>> 3755ff91e2bd9c53b744e64e7fae986f6d1443fe
    </Tabs>
  );
}
