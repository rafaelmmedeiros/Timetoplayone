import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import { IChapter } from "../../models/appTrainer/domain/chapter";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export default class UserChaptersStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  MOBx Functions
  //  CHAPTER OF THE DAY
  @observable todayChapter: IChapter | null = null;
  @observable loadingTodayChapter = true;

  //  Aux Actions

  //  MOBx Actions
  @action loadTodayChapter = async () => {
    this.loadingTodayChapter = true;
    try {
      const todayChapter = await agent.UserChapters.today();
      runInAction("loadTodayChapter", () => {
        this.todayChapter = todayChapter;
        this.loadingTodayChapter = false;
      });
    } catch (error) {
      runInAction("loadTodayChapter Error", () => {
        this.loadingTodayChapter = false;
      });
      toast.error("👎 Error loading Today Chapter.");
    }
  };
}
