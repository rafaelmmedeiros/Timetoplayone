import { RootStore } from "../rootStore";
import { observable, runInAction, action } from "mobx";
import { IUserLore } from "../../models/appTrainer/userLore";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { ITome } from "../../models/appTrainer/domain/tome";

export default class UserLoreStore {
  rootStore: RootStore;

  //  ROOTSTORE
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  MOBx OBSERVABLES
  @observable userLore: IUserLore | null = null;
  @observable loadingUserLore = true;

  @observable submitting = false;
  @observable createMode = false;
  
  @observable loading = false;

  @observable targetUp = "";
  @observable targetDown = "";

  //  MOBx AUX. ACTIONS
  @action setCreateMode = async () => {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
    }
  };

  @action setTargetUp = async (id: string) => {
    runInAction(() => {
      this.targetUp = id;
      this.targetDown = "";
    });
  };

  @action setTargetDown = async (id: string) => {
    runInAction(() => {
      this.targetDown = id;
      this.targetUp = "";
    });
  };

  //  MOBx ACTIONS
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

  @action setTomeUp = async (tome: ITome) => {
    this.loading = true;
    try {
      await agent.UserLore.setUp(tome.id);
      runInAction(() => {
        this.loadUserLore();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting Tome Up.");
    }
  };

  @action setTomeDown = async (tome: ITome) => {
    this.loading = true;
    try {
      await agent.UserLore.setDown(tome.id);
      runInAction(() => {
        this.loadUserLore();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting Tome Down.");
    }
  };
}
