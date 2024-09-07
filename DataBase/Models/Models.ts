//esse arquivo é pra facilitar alterar os dados dos pets, ta sendo usado na ../db/usePetsDB.ts

export type Pet  = {
    id: number;
    Nome: string;
    Tipo_Cor: string;
    Fome: number;
    Sono: number;
    Diversao: number;
    Last_uptate: string; //TIMESTAMP É PASSADO COMO STRING
    elapsedTime: number; //não existe na tabela mas é usado na consulta updatePetStatus()
}

export type Pet_Jogo = {
    Pontos: number;
    Pet_id: number;
    Jogo_id: number;
}

export type Jogo = {
    id: number;
    Nome: string;
};

