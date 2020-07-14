export interface IUserLore {
  username: string;
  tomes: ITome[];
}

export interface ITome {
    id: string;
    position: number;
    tittle: string;
}
