import { RootStore } from "../rootStore";
import { observable } from "mobx";
import { IUserLore } from "../../models/appTrainer/userLore";

export default class UserLoreStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  MOBx Functions
  @observable userRepertoire: IUserLore | null = null;
  @observable loadingUserRepertoire = true;



  //  MOBx Actions
  
}
