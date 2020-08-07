import GrupoStore from "./grupoStore";
import UserStore from "./userStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import UserLoreStore from "./appTrainer/userLoreStore";
import LayoutSotre from "./layoutStore";
import UserCollectionStore from "./appTrainer/userCollectionStore";
import UserPracticeStore from "./appTrainer/userPracticeStore";
import UserChaptersStore from "./appTrainer/userChapters";

configure({ enforceActions: "always" });

export class RootStore {
  grupoStore: GrupoStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  userLoreStore: UserLoreStore;
  layoutStore: LayoutSotre;
  userCollectionStore: UserCollectionStore;
  userPracticeStore: UserPracticeStore;
  userChaptersStore: UserChaptersStore;

  constructor() {
    this.grupoStore = new GrupoStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.profileStore = new ProfileStore(this);
    this.userLoreStore = new UserLoreStore(this);
    this.layoutStore = new LayoutSotre(this);
    this.userCollectionStore = new UserCollectionStore(this);
    this.userPracticeStore = new UserPracticeStore(this);
    this.userChaptersStore = new UserChaptersStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
