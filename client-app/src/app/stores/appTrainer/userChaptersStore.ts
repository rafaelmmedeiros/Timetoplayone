import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import { IChapter } from "../../models/appTrainer/domain/chapter";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { IUserChapters } from "../../models/appTrainer/userChapters";

export default class UserChaptersStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  CHAPTER OF THE DAY
  @observable todayChapter: IChapter | null = null;
  @observable loadingTodayChapter = true;

  //  USERCHAPTERS
  @observable userChapters: IUserChapters | null = null;
  @observable loadingUserChapters = true;
  @observable loading = false;

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

  @action loadUserChapters = async () => {
    this.loadingUserChapters = true;
    try {
      const userChapters = await agent.UserChapters.get();
      runInAction("loadUserChapters", () => {
        this.userChapters = userChapters;
        this.loadingUserChapters = false;
      });
    } catch (error) {
      runInAction("loadUserChapters error", () => {
        this.loadingUserChapters = false;
      });
      toast.error("👎 Error loading Chapters.");
    }
  };
}
