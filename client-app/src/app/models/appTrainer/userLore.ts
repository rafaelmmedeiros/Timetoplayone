export interface IUserLore {
  username: string;
  repetories: ITome[];
}

export interface ITome {
    id: string;
    position: number;
    tittle: string;
}
