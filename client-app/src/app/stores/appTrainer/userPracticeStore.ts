import { RootStore } from "../rootStore";
import { observable, action, runInAction } from "mobx";
import agent from "../../api/agent";
import { IUserPractice } from "../../models/appTrainer/userPractice";
import { toast } from "react-toastify";
import { IEtude } from "../../models/appTrainer/domain/etude";

export default class UserPracticeStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable userPractice: IUserPractice | null = null;
  @observable loadingUserPractice = true;
  @observable loading = false;
  @observable targetDone = "";

  @action setTargetDone = async (id: string) => {
    runInAction(() => {
      this.targetDone = id;
    });
  };

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
      toast.error("👎 Erro carregando Prática.");
    }
  };

  @action setEtudeDone = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserPractice.done(etude.id);
      runInAction(() => {
        if (this.rootStore.userTodayChapterStore.todayChapter) {
          this.rootStore.userTodayChapterStore.todayChapter!.totalTime += Number(etude.time);
          this.rootStore.userTodayChapterStore.todayChapter!.totalEtudes++;
        } else {
          this.rootStore.userTodayChapterStore.loadTodayChapter();
          toast.info("👍 Começando um novo capítulo!");
        }

        this.loadUserPractice();
        this.loading = false;
      });
      toast.success("👍" + etude.title + " feito com sucesso.");
      //toast.warning("🎼 Continue Playing!! Never give-up!!");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Erro ao registrar etude.");
    }
  };
}
