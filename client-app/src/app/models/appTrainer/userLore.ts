export interface IUserLore {
  username: string;
  repetories: IRepertoire[];
}

export interface IRepertoire {
    id: string;
    position: number;
    tittle: string;
}
