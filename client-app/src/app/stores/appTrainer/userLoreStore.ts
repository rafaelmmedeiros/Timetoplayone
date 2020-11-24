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

  @observable createModeLore = false;

  @observable loading = false;
  @observable submitting = false;

  @observable targetUp = "";
  @observable targetDown = "";
  @observable targetDelete = "";

  //  MOBx AUX. ACTIONS
  @action setcreateModeLore = async () => {
    if (this.createModeLore) {
      this.createModeLore = false;
    } else {
      this.createModeLore = true;
    }
  };

  @action setTargetUp = async (id: string) => {
    runInAction(() => {
      this.targetUp = id;
      this.targetDown = "";
      this.targetDelete = "";
    });
  };

  @action setTargetDown = async (id: string) => {
    runInAction(() => {
      this.targetDown = id;
      this.targetUp = "";
      this.targetDelete = "";
    });
  };

  @action setTargetDelete = async (id: string) => {
    runInAction(() => {
      this.targetDelete = id;
      this.targetUp = "";
      this.targetDown = "";
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
      this.setcreateModeLore();
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

  @action deleteTome = async (tome: ITome) => {
    this.loading = true;
    try {
      await agent.UserLore.delete(tome.id);
      runInAction(() => {
        this.loadUserLore();
        this.loading = false;
      });
      toast.success("👍 Tome deleted with success.");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error deleting Tome.");
    }
  };
}
