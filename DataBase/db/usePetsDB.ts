import { useSQLiteContext } from 'expo-sqlite';
import { initDatabase } from './initDB';
import { Pet, Jogo, Pet_Jogo } from "@/DataBase/Models/Models";


export function usePetsDB() {
    const db = useSQLiteContext()

    
    //função para cadastrar um novo dino na DB
    async function addPet({nome, tipo_cor}: {nome: string, tipo_cor: string}) {
        console.log(nome, tipo_cor)
        const query = await db.prepareAsync(
            `INSERT INTO Pet (Nome, Tipo_Cor, Fome, Sono, Diversao)
            VALUES ($nome, $tipo_cor, 100, 100, 100);`
        )
        try {
            const result = await query.executeAsync({
                $nome: nome,
                $tipo_cor: tipo_cor
            })

            console.log(nome, tipo_cor, result.lastInsertRowId, result.changes);
        } catch (error) {
            throw error
        } finally {
            await query.finalizeAsync();
        }
    }

    async function getAllPets() {
        try {
            const query = `SELECT * FROM Pet;`

            const res = await db.getAllAsync<Pet>(query)

            return res
        } catch (error) {
            throw error
        }
    }

    return { addPet, getAllPets }
}




// Função para atualizar o status de um pet com base no tempo
export const updatePetStatus = async (petId: number) => {
    const db = useSQLiteContext()

    try {
        // Buscar o pet pelo id
        const result = await db.getFirstAsync('SELECT * FROM Pet WHERE id = ?', [petId]);

        if (result) {
            const pet = result as Pet;
            const currentTime = new Date().getTime();
            const lastUpdate = new Date(pet.Last_uptate).getTime();
            const elapsedTime = (currentTime - lastUpdate) / 1000; // Tempo em segundos

            // Calcula novos valores garantindo que não ultrapasse 100
            const newHunger = Math.max(0, Math.min(100, pet.Fome - Math.floor(elapsedTime / 60))); // Diminui fome a cada minuto
            const newSleep = Math.max(0, Math.min(100, pet.Sono - Math.floor(elapsedTime / 120))); // Diminui sono a cada 2 min
            const newFun = Math.max(0, Math.min(100, pet.Diversao - Math.floor(elapsedTime / 180))); // Diminui diversão a cada 3 min

            // Atualizar pet com novos valores
            await db.runAsync(
                `
                UPDATE Pet
                SET Fome = ?, Sono = ?, Diversao = ?, Last_update = CURRENT_TIMESTAMP
                WHERE id = ?
                `,
                [newHunger, newSleep, newFun, petId]
            );

            console.log(`Status do Pet com id: ${petId}, atualizado.`);
        } else {
            console.log(`Pet com id: ${petId} não encontrado.`);
        }
    } catch (error) {
        console.error('Erro ao atualizar o status do pet:', error);
    }
};

/*
//pra buscar os dinos cadastrados
export const getAllPets = async () => { //essa função ta meio(muito) porca então se algo de PROBLEMA é bom olhar aqui
    const result = await db.prepareAsync(
        `SELECT * FROM Pet`
    );

    if(result) {
        console.log(result);
        console.log('retorno teste 2')
    };
};*/

