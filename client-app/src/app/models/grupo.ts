export interface IGrupo {
  id: string;
  titulo: string;
  subTitulo: string;
  descricao: string;
  label: string;
}

export interface IGrupoFormValues extends Partial<IGrupo> {
  // FUTURO USO para algo opcional
}

export class GrupoFormValues implements IGrupoFormValues {
  id?: string = undefined;
  titulo: string = "";
  subTitulo: string = "";
  descricao: string = "";
  label: string = "";

  constructor(init?: IGrupoFormValues) {
    Object.assign(this, init);
  }
}
