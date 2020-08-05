import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../../api/agent";
import { IEtude } from "../../models/appTrainer/domain/etude";

export default class UserPracticeStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  MOBx Functions
  @observable userPractice = new Map();
  @observable etude: IEtude | null = null;
  @observable loadingUserPractice = true;

  //  Aux Actions
  //  MOBx Actions

  @action loadPractice = async () => {
    this.loadingUserPractice = true;

    try {
      const etudes = await agent.UserPractice.get();
      runInAction("loadPractice", () => {
        etudes.forEach((etude) => {
          this.userPractice.set(etude.id, etude);
        });
        this.loadingUserPractice = false;
      });
      
      //console.log(this.userPractice);
    } catch (error) {
      runInAction("loadPractice error", () => {
        this.loadingUserPractice = false;
      });
      console.log(error);
    }
  };
}
