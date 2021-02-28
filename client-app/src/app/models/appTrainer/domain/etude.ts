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

export interface IEtudeFormValues extends Partial<IEtude> {
  // FUTURO USO para elementos opcionais
}

export class EtudeFormValues implements IEtudeFormValues {
  id?: string = undefined;
  title: string = "";
  tome: string = "";
  time: string = "";
  description: string = "";

  constructor(init?: IEtudeFormValues) {
    Object.assign(this, init);
  }
}
