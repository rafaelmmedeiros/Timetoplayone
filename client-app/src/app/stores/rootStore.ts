import GrupoStore from "./grupoStore";
import UserStore from "./userStore";
import { createContext } from "react";

export class RootStore {
  grupoStore: GrupoStore;
  userStore: UserStore;

  constructor() {
    this.grupoStore = new GrupoStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());