import { IEtude } from "./domain/etude";

export interface IUserCollection {
  username: string;
  etudes: IEtude[];
}
