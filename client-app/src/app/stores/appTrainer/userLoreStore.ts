import { RootStore } from "../rootStore";
import { observable, runInAction, action } from "mobx";
import { IUserLore } from "../../models/appTrainer/userLore";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { ITome } from "../../models/appTrainer/domain/tome";

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
      toast.error("👎 Error loading Lore.");
    }
  };

  @action createTome = async (tome: ITome) => {
    this.submitting = true;
    try {
      await agent.UserLore.create(tome);
      runInAction(() => {
        this.submitting = false;
      });
      toast.success("👍 Tome created with success.");
      this.setCreateMode();
      this.loadUserLore();
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("👎 Error creating Tome.");
      console.log(error.response);
    }
  };
}
