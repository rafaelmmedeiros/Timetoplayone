import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
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

  @observable weekBrief: IBrief | null = null;
  @observable loadingWeekBrief = true;

  @observable userChaptersWeek: IUserChaptersWeek | null = null;
  @observable userChaptersMonth: IUserChaptersMonth | null = null;
  @observable loadingUserChaptersWeek = true;
  @observable loadingUserChaptersMonth = true;

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
      toast.error("👎 Erro carregando últimos 7 dias.");
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
      toast.error("👎 Erro carregando última semana.");
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
      toast.error("👎 Erro carregando último mês.");
    }
  };
}
