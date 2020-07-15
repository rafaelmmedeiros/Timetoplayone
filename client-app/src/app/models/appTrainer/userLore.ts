export interface IUserLore {
  username: string;
  tomes: ITome[];
}

export interface ITome {
  id: string;
  position: number;
  title: string;
}

export interface ITomeFormValues extends Partial<ITome> {
  // FUTURO USO para elementos opcionais
}

export class TomeFormValues implements ITomeFormValues {
  id?: string = undefined;
  title: string = '';

  constructor(init?: ITomeFormValues) {
    Object.assign(this, init);
  }
}
