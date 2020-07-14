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
  @observable userLore: IUserLore | null = null;
  @observable loadingUserLore = true;



  //  MOBx Actions
  
}
