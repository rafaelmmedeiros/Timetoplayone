import { RootStore } from "../rootStore";
import { observable, runInAction, action } from "mobx";
import { IUserLore, ITome } from "../../models/appTrainer/userLore";
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
  @observable submitting = false;

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

  @action createTome = async (tome: ITome) => {
    this.submitting = true;
    try {
      await agent.UserLore.create(tome);
      runInAction(() => {
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("👎 Error creating Tome.");
      console.log(error.response);
    }
  };
}
