// app/_layout.tsx
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Tela Inicial' }}
      />
      <Tabs.Screen
        name="telacadastro"
        options={{ title: 'Tela de Cadastro' }}
      />
      <Tabs.Screen
        name="telalistagem"
        options={{
          title: "Lista"
        }}
      />
      <Tabs.Screen
        name="teladetalhe"
        options={{ title: 'Tela de Detalhes' }}
      />
      <Tabs.Screen
        name="telajogos"
        options={{ title: 'Tela de Jogos' }}
      />
      <Tabs.Screen
        name="DinoGame"
        options={{ title: 'DinoGame', tabBarStyle: { display: 'none' } }} //para esconder o tabs na tela do jogo
      />
    </Tabs>
  );
}
