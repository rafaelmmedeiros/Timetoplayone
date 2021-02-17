export interface IEtude {
  id: string;
  title: string;
  active: boolean;
  fluence: number;
  tome: string;
  tomePosition: number;
  time: string;
  description: string;
  executions: number;
  played: number;
  created: Date;
  lastPlayed: Date;
  priority: number;
}
