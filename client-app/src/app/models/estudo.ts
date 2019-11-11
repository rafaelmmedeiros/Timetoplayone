export interface IEstudo {
    id: string;
    titulo: string;
    origem: string;
    descricao: string;
    bpmInicial: number;
    tecnica: string;
    dificuldade: number;
    proposito: number;
    fluencia: number;
    minutos: number;
    vezesPraticado: number;
    tempoPraticado: number;
    dataCriacao: Date;
    primeiroTreino: Date;
    ultimoTreino: Date;
}