import { type SQLiteDatabase } from 'expo-sqlite';

export async function initDatabase(db: SQLiteDatabase) {
    await db.execAsync(`
        DROP TABLE Pet;
        DROP TABLE Jogo;
        DROP TABLE Pet_Jogo;

        CREATE TABLE IF NOT EXISTS Pet (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL,
            Tipo_Cor TEXT NOT NULL,
            Fome INTEGER DEFAULT 100 CHECK (Fome >= 0 AND Fome <= 100),
            Sono INTEGER DEFAULT 100 CHECK (Sono >= 0 AND Sono <= 100),
            Diversao INTEGER DEFAULT 100 CHECK (Diversao >= 0 AND Diversao <= 100),
            Last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS Jogo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS Pet_Jogo (
            Pontos INTEGER NOT NULL,
            Pet_id INTEGER,
            Jogo_id INTEGER,
            FOREIGN KEY (Pet_id) REFERENCES Pet(id),
            FOREIGN KEY (Jogo_id) REFERENCES Jogo(id)
        );
    `)
    console.log('Tabela "Pet" criada ou já existe com restrições.');
    console.log('Tabela "Jogo" criada ou já existe.');
    console.log('Tabela "Pet_Jogo" criada ou já existe.');
};
