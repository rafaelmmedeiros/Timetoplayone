import { RootStore } from "./rootStore";
import { observable } from "mobx";

export default class LayoutSotre {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  //  TODO: MAKE THIS SHIT WORK
  @observable isMobile = false;

}
