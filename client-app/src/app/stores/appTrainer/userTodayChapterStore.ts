import { action, computed, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { IChapter } from "../../models/appTrainer/domain/chapter";
import { RootStore } from "../rootStore";

export default class UserTodayChapterStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable todayChapter: IChapter | null = null;
  @observable loadingTodayChapter = true;
  @observable loadingIncrease = false;
  @observable loadingDecrease = false;

  @computed get calculateNormalized() {
    if (this.todayChapter) {
      return Math.round((this.todayChapter?.totalTime / this.todayChapter?.objective) * 100);
    }
    return 0;
  }

  @computed get calculateHours() {
    if (this.todayChapter) {
      let hours = this.todayChapter.objective / 60;
      return hours.toFixed(1);
    }
    return 0;
  }

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
      toast.error("👎 Error carregando capítulo do dia.");
    }
  };

  @action increaseObjetive = async () => {
    this.loadingIncrease = true;
    try {
      await agent.UserChapters.increase();
      runInAction("increaseObjetive", () => {
        if (this.todayChapter) {
          this.todayChapter.objective += 10;
        }
        this.loadingIncrease = false;
      });
    } catch (error) {
      runInAction("", () => {
        this.loadingIncrease = false;
      });
      toast.error("👎 Erro aumentando objetivo do dia.");
    }
  };

  @action decreaseObjetive = async () => {
    this.loadingDecrease = true;
    try {
      await agent.UserChapters.decrease();
      runInAction("descreaseObjetive", () => {
        if (this.todayChapter) {
          if (this.todayChapter.objective >= 10) {
            this.todayChapter.objective -= 10;
          }
        }
        this.loadingDecrease = false;
      });
    } catch (error) {
      runInAction("", () => {
        this.loadingDecrease = false;
      });
      toast.error("👎 Erro diminuindo objetivo do dia.");
    }
  };
}
