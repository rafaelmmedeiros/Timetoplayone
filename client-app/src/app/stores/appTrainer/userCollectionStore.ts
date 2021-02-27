import { RootStore } from "../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IUserCollection } from "../../models/appTrainer/userCollection";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { IEtude } from "../../models/appTrainer/domain/etude";

export default class UserCollectionStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable etudeRegistry = new Map();
  @observable userCollection: IUserCollection | null = null;

  @observable etude: IEtude | null = null;
  @observable loadingUserCollection = true;

  @observable loading = false;
  @observable submitting = false;

  @observable targetLearning = "";
  @observable targetEvolution = "";
  @observable targetFlowing = "";
  @observable targetDelete = "";
  @observable targetActivate = "";

  @observable createModeCollection = false;

  @action setcreateModeCollection = async () => {
    this.createModeCollection = !this.createModeCollection;
  };

  @action setTargetLearning = async (id: string) => {
    runInAction(() => {
      this.targetLearning = id;
      this.targetEvolution = "";
      this.targetFlowing = "";
      this.targetDelete = "";
      this.targetActivate = "";
    });
  };

  @action setTargetEvolution = async (id: string) => {
    runInAction(() => {
      this.targetEvolution = id;
      this.targetLearning = "";
      this.targetFlowing = "";
      this.targetDelete = "";
      this.targetActivate = "";
    });
  };

  @action setTargetFlowing = async (id: string) => {
    runInAction(() => {
      this.targetFlowing = id;
      this.targetLearning = "";
      this.targetEvolution = "";
      this.targetDelete = "";
      this.targetActivate = "";
    });
  };

  @action setTargetDelete = async (id: string) => {
    runInAction(() => {
      this.targetDelete = id;
      this.targetLearning = "";
      this.targetEvolution = "";
      this.targetFlowing = "";
      this.targetActivate = "";
    });
  };

  @action setTargetActivate = async (id: string) => {
    runInAction(() => {
      this.targetActivate = id;
      this.targetLearning = "";
      this.targetEvolution = "";
      this.targetFlowing = "";
      this.targetDelete = "";
    });
  };

  //  SEGRAGATE FOR TWO REACT COMPONENTS
  @computed get etudesByTome() {
    return this.groupEtudesByTome(Array.from(this.etudeRegistry.values()));
  }

  groupEtudesByTome(etudes: IEtude[]) {
    const sortedEtudes = etudes;
    return Object.entries(
      sortedEtudes.reduce((etudes, etude) => {
        const tome = etude.tome;
        etudes[tome] = etudes[tome] ? [...etudes[tome], etude] : [etude];
        return etudes;
      }, {} as { [key: string]: IEtude[] })
    );
  }

  // CLEAN TO USE IN FORM
  @action clearetude = () => {
    this.etude = null;
  };

  //  LOAD ALL ETUDES FROM A USER COLLECTION
  @action loadUserCollection = async () => {
    this.loadingUserCollection = true;
    try {
      const userCollection = await agent.UserCollection.get();
      runInAction(() => {
        this.etudeRegistry.clear(); // TODO: Funciona... mas, será?
        userCollection.etudes.forEach((etude) => {
          this.etudeRegistry.set(etude.id, etude);
        });
        this.userCollection = userCollection;
        this.loadingUserCollection = false;
      });
      //console.log(this.groupEtudesByTome(userCollection.etudes));
    } catch (error) {
      runInAction(() => {
        this.loadingUserCollection = false;
      });
      toast.error("👎 Error loading Collection.");
    }
  };

  //  PROCEDURES TO LOAD A ETUDE FOR EDIT MODE
  loadEtude = async (id: string) => {
    let etude = this.getEtude(id);
    if (etude) {
      this.etude = etude;
      return etude;
    } else {
      this.loadingUserCollection = true;

      try {
        etude = await agent.UserCollection.detail(id);
        runInAction("Get Etude", () => {
          this.etude = etude;
          this.etudeRegistry.set(etude.id, etude);
          this.loadingUserCollection = false;
        });
        return etude;
      } catch (error) {
        runInAction("Get etude Error", () => {
          this.loadingUserCollection = false;
        });
        console.log(error);
      }
    }
  };

  getEtude = (id: string) => {
    return this.etudeRegistry.get(id);
  };

  //  CREATE ETUDE
  @action createEtude = async (etude: IEtude) => {
    this.submitting = true;

    try {
      await agent.UserCollection.create(etude);
      runInAction("Create Etude", () => {
        this.submitting = false;
      });
      toast.success("👍 Etude created with success.");
      this.setcreateModeCollection();
      this.loadUserCollection();
      // this.etudesByTome(); TODO
    } catch (error) {
      runInAction("Create etude Erro", () => {
        this.submitting = false;
      });
      toast.error("👎 Error creating Etude.");
      console.log(error.response);
    }
  };

  @action editEtude = async (etude: IEtude) => {
    this.submitting = true;

    try {
      await agent.UserCollection.edit(etude);
      runInAction("Edit Etude", () => {
        this.etudeRegistry.set(etude.id, etude);
        this.etude = etude;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("Edit Etude Error", () => {
        this.submitting = false;
      });
      toast.error("👎 Error editing Etude.");
      console.log(error.response);
    }
  };

  @action fluenceLearning = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserCollection.fluenceLearning(etude.id);
      runInAction(() => {
        this.loadUserCollection();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting Etude to Learning.");
    }
  };

  @action fluenceEvolution = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserCollection.fluenceEvolution(etude.id);
      runInAction(() => {
        this.loadUserCollection();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting Etude to Evolution.");
    }
  };

  @action fluenceFlowing = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserCollection.fluenceFlowing(etude.id);
      runInAction(() => {
        this.loadUserCollection();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error setting Etude to Flowing.");
    }
  };

  @action deleteEtude = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserCollection.delete(etude.id);
      runInAction(() => {
        this.loadUserCollection();
        this.loading = false;
      });
      toast.success("👍 Etude deleted with success.");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error deleting Etude.");
    }
  };

  @action changeActive = async (etude: IEtude) => {
    this.loading = true;
    try {
      await agent.UserCollection.changeActive(etude.id);
      runInAction(() => {
        this.loadUserCollection();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Error changines etude status.");
    }
  };
}
