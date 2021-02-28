export interface ITome {
  id: string;
  title: string;
  active: boolean;
  position: number;
  totalEtudes: number;
  totalTime: number;
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
