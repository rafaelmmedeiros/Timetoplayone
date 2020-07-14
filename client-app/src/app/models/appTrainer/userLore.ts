export interface IUserLore {
  username: string;
  tomes: ITome[];
}

export interface ITome {
    id: string;
    position: number;
    title: string;
}
