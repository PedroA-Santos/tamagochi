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

    // Função para atualizar o status de um pet com base no tempo
    async function updatePetStatus(petId: number)  {
        
        try {
            // Buscar o pet pelo id
            const result = await db.getFirstAsync<Pet>(
                `SELECT 
                (((strfTime(\'%H\', CURRENT_TIME) * 3600) +
                (strfTime(\'%M\', CURRENT_TIME) * 60) +
                (strfTime(\'%S\', CURRENT_TIME))) -
                ((strfTime(\'%H\', Last_update) * 3600) +
                (strfTime(\'%M\', Last_update) * 60) +
                (strfTime(\'%S\', Last_update)))) as elapsedTime
                FROM Pet WHERE id = ?`, [petId]);
            
            if (result) {
                const pet = result as Pet;
                console.log((pet.elapsedTime));
                const elapsedTime = pet.elapsedTime; // Tempo em segundos
                if( elapsedTime >= 60 ){

                    // Calcula novos valores garantindo que não ultrapasse 100
                    const newHunger = Math.max(0, Math.min(100, pet.Fome - Math.floor(elapsedTime / 60))); // Diminui fome a cada minuto
                    const newSleep = Math.max(0, Math.min(100, pet.Sono - Math.floor(elapsedTime / 60))); // Diminui sono a cada  min
                    const newFun = Math.max(0, Math.min(100, pet.Diversao - Math.floor(elapsedTime / 60))); // Diminui diversão a cada  min
                    
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
                    console.log(`Status do Pet com id: ${petId}, não precisa ser atualizado`)
                }
    
            } else {
                console.log(`Pet com id: ${petId} não encontrado.`);
            }
        } catch (error) {
            console.error('Erro ao atualizar o status do pet:', error);
        }
    };


    return { addPet, getAllPets, updatePetStatus }
}





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

