import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../../api/agent";
import { IUserPractice } from "../../models/appTrainer/userPractice";
import { toast } from "react-toastify";
import { IEtude } from "../../models/appTrainer/domain/etude";

export default class UserPracticeStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  MOBx Functions
  @observable userPractice: IUserPractice | null = null;
  @observable loadingUserPractice = true;
  @observable loading = false;

  //  Aux Actions

  //  MOBx Actions
  @action loadUserPractice = async () => {
    this.loadingUserPractice = true;
    try {
      const userPractice = await agent.UserPractice.get();
      runInAction("loadUserPractice", () => {
        this.userPractice = userPractice;
        this.loadingUserPractice = false;
      });
    } catch (error) {
      runInAction("loadUserPractice error", () => {
        this.loadingUserPractice = false;
      });
      toast.error("👎 Error loading Practice.");
    }
  };

  @action setEtudeDone = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserPractice.done(etude.id);
      runInAction(() => {
        this.loading = false;
        //this.loadUserPractice();
      });
      toast.success("👍" + etude.title + " done with success.");
      toast.warning("🎼 Continue Playing!! Never give-up!!");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting done etude.");
    }
  };
}
