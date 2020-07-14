import { RootStore } from "../rootStore";
import { observable, runInAction, action } from "mobx";
import { IUserLore } from "../../models/appTrainer/userLore";
import agent from "../../api/agent";
import { toast } from "react-toastify";

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
  @action loadUserLore = async () => {
    this.loadingUserLore = true;
    try {
      const userLore = await agent.UserLore.get();
      runInAction(() => {
        this.userLore = userLore;
        this.loadingUserLore = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingUserLore = false;
      });
      toast.error("👎 Error loading lore.");
    }
  };
}
