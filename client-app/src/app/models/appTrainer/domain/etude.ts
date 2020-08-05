export interface IEtude {
    id: string;
    title: string;
    active: boolean;
    tome: string;
    time: string;
    description: string;
    executions: number;
    played: number;
    created: Date;
    lastPlayed: Date;
  }