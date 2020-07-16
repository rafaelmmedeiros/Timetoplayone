import { RootStore } from "../rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IUserCollection, IEtude } from "../../models/appTrainer/userCollection";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export default class UserCollectionStore {
  rootStore: RootStore;

  //  Todas stores devem ter referencia a ROOT
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  //  MOBx Functions
  @observable etudeRegistry = new Map();
  @observable userCollection: IUserCollection | null = null;
  @observable loadingUserCollection = true;
  @observable submitting = false;
  @observable createMode = false;

  //  AUXILIAR ACTIONS
  @action setCreateMode = async () => {
    if (this.createMode) {
      this.createMode = false;
    } else {
      this.createMode = true;
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

  //  MOBx Actions
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
}
