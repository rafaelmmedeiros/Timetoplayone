export interface IUserCollection {
  username: string;
  etudes: IEtude[];
}

export interface IEtude {
  id: string;
  title: string;
  active: boolean;
  tome: string;
  time: number;
  description: string;
  executions: number;
  played: number;
  created: Date;
  lastPlayed: Date;
}