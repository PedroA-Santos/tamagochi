import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SQLiteProvider } from 'expo-sqlite';

import { initDatabase } from '@/DataBase/db/initDB';
//import { updatePetStatus, getAllPets } from '@/DataBase/db/usePetsDB'; 

//apenas um teste para atualizar o pet com ID 1
//updatePetStatus(1);

// Evita que a tela de splash seja ocultada antes de carregar os assets.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Daydream: require('../assets/fonts/Daydream.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (

    <SQLiteProvider databaseName='Pets.db' onInit={initDatabase}>

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>

  );
}
