import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import { IUserCollection } from "../../models/appTrainer/userCollection";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export default class UserCollectionStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  //  MOBx Functions
  @observable userCollection: IUserCollection | null = null;
  @observable loadingUserCollection = true;
  @observable submitting = false;
  @observable createMode = false;

  //  AUXILIAR ACTIONS
  @action setCreateMode = async () => {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
  };

  //  MOBx Actions
  @action loadUserCollection = async () => {
    this.loadingUserCollection = true;
    try {
      const userCollection = await agent.UserCollection.get();
      runInAction(() => {
        this.userCollection = userCollection;
        this.loadingUserCollection = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingUserCollection = false;
      });
      toast.error("👎 Error loading Collection.");
    }
  };
}
