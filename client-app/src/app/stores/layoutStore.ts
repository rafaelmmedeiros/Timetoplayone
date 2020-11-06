import { RootStore } from "./rootStore";
import { action, observable, runInAction } from "mobx";

export default class LayoutSotre {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable colorSelected = "";

  @action setColor = async (position: number) => {
    runInAction(() => {
      if (position === 1) this.colorSelected = "red";
    });
  };
}
