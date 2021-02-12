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

  @observable createModeCollection = false;

  //  AUXILIAR ACTIONS
  @action setcreateModeCollection = async () => {
    if (this.createModeCollection) {
      this.createModeCollection = false;
    } else {
      this.createModeCollection = true;
    }
  };

  //  SEGRAGATE FOR TWO REACT COMPONENTS
  @computed get etudesByTome() {
    return this.groupEtudesByTome(Array.from(this.etudeRegistry.values()));
  }

  groupEtudesByTome(etudes: IEtude[]) {
    const sortedEtudes = etudes.sort((a: any, b: any) => a.tome - b.tome); // TODO fazer essa bosta funcionar com string
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
}
