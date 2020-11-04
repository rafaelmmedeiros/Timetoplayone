import { ITome } from "./domain/tome";

export interface IUserLore {
  tomes: ITome[];
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
