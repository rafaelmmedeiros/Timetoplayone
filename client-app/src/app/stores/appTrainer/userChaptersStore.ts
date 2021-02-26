import { RootStore } from "../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IChapter } from "../../models/appTrainer/domain/chapter";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { IUserChaptersWeek } from "../../models/appTrainer/userChaptersWeek";
import { IUserChaptersMonth } from "../../models/appTrainer/userChaptersMonth";
import { IBrief } from "../../models/appTrainer/domain/brief";

export default class UserChaptersStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;

  //  CHAPTER OF THE DAY
  @observable todayChapter: IChapter | null = null;
  @observable loadingTodayChapter = true;
  @observable loadingIncrease = false;
  @observable loadingDecrease = false;

  //  WEEK BRIEF
  @observable weekBrief: IBrief | null = null;
  @observable loadingWeekBrief = true;

  //  USERCHAPTERS
  @observable userChaptersWeek: IUserChaptersWeek | null = null;
  @observable userChaptersMonth: IUserChaptersMonth | null = null;
  @observable loadingUserChaptersWeek = true;
  @observable loadingUserChaptersMonth = true;

  //  Aux Actions
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

  @action loadWeekBrief = async () => {
    this.loadingWeekBrief = true;
    try {
      const weekBrief = await agent.UserChapters.brief();
      runInAction("loadWeekBrief", () => {
        this.weekBrief = weekBrief;
        this.loadingWeekBrief = false;
      });
    } catch (error) {
      runInAction("loadWeekBrief Error", () => {
        this.loadingWeekBrief = false;
      });
      toast.error("👎 Error loading Week Brief.");
    }
  };

  @action loadUserChaptersWeek = async () => {
    this.loadingUserChaptersWeek = true;
    try {
      const userChaptersWeek = await agent.UserChapters.week();
      runInAction("loadUserChaptersWeek", () => {
        this.userChaptersWeek = userChaptersWeek;
        this.loadingUserChaptersWeek = false;
      });
    } catch (error) {
      runInAction("loadUserChaptersWeek error", () => {
        this.loadingUserChaptersWeek = false;
      });
      toast.error("👎 Error loading Week Chapaters.");
    }
  };

  @action loadUserChaptersMonth = async () => {
    this.loadingUserChaptersMonth = true;
    try {
      const userChaptersMonth = await agent.UserChapters.month();
      runInAction("loadUserChaptersMonth", () => {
        this.userChaptersMonth = userChaptersMonth;
        this.loadingUserChaptersMonth = false;
      });
    } catch (error) {
      runInAction("loadUserChaptersMonth error", () => {
        this.loadingUserChaptersMonth = false;
      });
      toast.error("👎 Error loading Montth Week Chapaters.");
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
      toast.error("👎 Error increasing objective.");
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
      toast.error("👎 Error decreasing objective.");
    }
  };
}
