import { RootStore } from "../rootStore";
import { observable, runInAction, action } from "mobx";
import { IUserLore } from "../../models/appTrainer/userLore";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { ITome } from "../../models/appTrainer/domain/tome";

export default class UserLoreStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable userLore: IUserLore | null = null;
  @observable loadingUserLore = true;

  @observable loading = false;
  @observable submitting = false;

  @observable targetUp = "";
  @observable targetDown = "";
  @observable targetDelete = "";
  @observable targetActivate = "";

  @observable createModeLore = false;

  @action setcreateModeLore = async () => {
    this.createModeLore = !this.createModeLore;
  };

  @action setTargetUp = async (id: string) => {
    runInAction(() => {
      this.targetUp = id;
      this.targetDown = "";
      this.targetDelete = "";
      this.targetActivate = "";
    });
  };

  @action setTargetDown = async (id: string) => {
    runInAction(() => {
      this.targetDown = id;
      this.targetUp = "";
      this.targetDelete = "";
      this.targetActivate = "";
    });
  };

  @action setTargetDelete = async (id: string) => {
    runInAction(() => {
      this.targetDelete = id;
      this.targetUp = "";
      this.targetDown = "";
      this.targetActivate = "";
    });
  };

  @action setTargetActivate = async (id: string) => {
    runInAction(() => {
      this.targetActivate = id;
      this.targetUp = "";
      this.targetDown = "";
      this.targetDelete = "";
    });
  };

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
      toast.error("👎 Erro carregando Grupos.");
    }
  };

  @action createTome = async (tome: ITome) => {
    this.submitting = true;
    try {
      await agent.UserLore.create(tome);
      runInAction(() => {
        this.submitting = false;
      });
      toast.success("👍 Grupo criado com sucesso.");
      this.setcreateModeLore();
      this.loadUserLore();
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error("👎 Erro criando grupo.");
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
      toast.error("👎 Erro deslocando grupo para cima.");
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
      toast.error("👎 Erro deslocando grupo para baixo.");
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
      toast.success("👍 Grupo deletado com sucesso.");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Erro deletando grupo");
    }
  };

  @action changeActive = async (tome: ITome) => {
    this.loading = true;
    try {
      await agent.UserLore.changeActive(tome.id);
      runInAction(() => {
        this.loadUserLore();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Erro ao definir status do Grupo.");
    }
  };
}
