import { useSQLiteContext } from 'expo-sqlite';
import { initDatabase } from './initDB';
import { Pet, Jogo, Pet_Jogo } from "@/DataBase/Models/Models";


export function usePetsDB() {
    const db = useSQLiteContext()

    
    //função para cadastrar um novo dino na DB
    async function addPet({nome, tipo_cor}: {nome: string, tipo_cor: string}) {
        console.log(nome, tipo_cor)
        const query = await db.prepareAsync(
            `INSERT INTO Pet (Nome,Tipo_Cor, Fome, Sono , Diversao)
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

            for( const row of res ){
                updatePetStatus(row.id) //provavel gambiarra pra atualizar os status dos pets na litagem
            }

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
                (strfTime(\'%S\', Last_update)))) as elapsedTime,
                Fome, Sono, Diversao
                FROM Pet WHERE id = ?`, [petId]);

                
                
                if (result) {
                    const pet = result as Pet;
                    console.log((pet.elapsedTime));
                    const elapsedTime = pet.elapsedTime; // Tempo em segundos
                    if( elapsedTime >= 30 ){
                        
                        // Calcula novos valores garantindo que não ultrapasse 100
                        const newHunger = Math.max(0, Math.min(100, pet.Fome - Math.floor(elapsedTime / 15))); // Diminui fome a cada 30 seg
                        const newSleep = Math.max(0, Math.min(100, pet.Sono - Math.floor(elapsedTime / 15))); // Diminui sono a cada  30 seg
                        const newFun = Math.max(0, Math.min(100, pet.Diversao - Math.floor(elapsedTime / 15))); // Diminui diversão a cada  30 seg
                        
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
                        
                        return { newHunger, newSleep, newFun }
                        
                    } else {
                        const newHunger = pet.Fome;
                        const newSleep = pet.Sono;
                        const newFun = pet.Diversao;
                        console.log(`Status do Pet com id: ${petId}, não precisa ser atualizado.`)

                        return { newHunger, newSleep, newFun }
                }
    
            } else {
                console.log(`Pet com id: ${petId} não encontrado.`);
            }
        } catch (error) {
            console.error('Erro ao atualizar o status do pet:', error);
        }

        return null
    };


    async function toFeed(petId:number) {

        try {
            const result = await db.getFirstAsync<Pet>(
                `SELECT Fome FROM Pet WHERE id = ?`, [petId]);

            if(result){
                const pet = result as Pet;
                const comida = 20;
                if(pet.Fome + comida > 100){
                    const newHunger = 100;

                    await db.runAsync(
                        `
                        UPDATE Pet
                        SET Fome = ? WHERE id = ?;
                        `,
                        [newHunger, petId]
                    );

                    updatePetStatus(petId);
                    
                    return { newHunger }
                    
                } else {
                    const newHunger = pet.Fome + 20;
                    
                    await db.runAsync(
                        `
                        UPDATE Pet
                        SET Fome = ? WHERE id = ?;
                        `,
                        [newHunger, petId]
                    );
                    updatePetStatus(petId);
                    
                    return { newHunger }
                }
            } else {
                console.error(`Erro ao encontrar o pet com id: ${petId}`)
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    async function toSleep(petId: number, Sono: number){
        try {
            await db.runAsync(
                `UPDATE Pet
                SET Sono = ? WHERE id = ?;`,[Sono, petId]
            );
            
            updatePetStatus(petId);
            return { newSleep: 100 }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    async function toFun(petId: number, score: number, idGame: number) {
        let newScore = 0;
        if(idGame == 1){
        
            newScore = score / 25;
        
        } else if (idGame == 2){

            newScore = score * 8;

        }

        try {
            const result = await db.getFirstAsync<Pet>(
                `SELECT Diversao FROM Pet WHERE id = ?`,[petId]
            );
            
            if(result){
                const pet = result as Pet;
                if(pet.Diversao + newScore > 100){
                    const newFun = 100;
                    
                    await db.runAsync(
                        `
                        UPDATE Pet
                        SET Diversao = ? WHERE id = ?;
                        `,
                        [newFun, petId]
                    );
                    console.log('Se divertiu 1: '+newFun);
                    updatePetStatus(petId);
                    
                } else {
                    const newFun = pet.Diversao + newScore;
                    
                    await db.runAsync(
                        `
                        UPDATE Pet
                        SET Diversao = ? WHERE id = ?;
                        `,
                        [newFun, petId]
                    );
                    
                    console.log('Se divertiu 2: '+newFun);
                    updatePetStatus(petId);
                }
            }
        } catch (error) {
            console.error(error)
        }
    };


    return { addPet, getAllPets, updatePetStatus, toFeed, toSleep, toFun }
}

