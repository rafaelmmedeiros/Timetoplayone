import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IPhoto } from "../models/profile";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;

  // PARA COMPARAR SE USER É IGUAL PROFILE
  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      //console.log(error);
      toast.error("👎 Erro carregando perfil.");
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
      toast.success("👍 Photo uploaded with success.");
    } catch (error) {
      runInAction(() => {
        this.uploadingPhoto = false;
      });
      toast.error("👎 Error uploading photo.");
      //console.log(error);
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find((a) => a.isMain)!.isMain = false;
        this.profile!.photos.find((a) => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loading = false;
      });
      toast.success("👍 Foto principal alterada com sucesso.");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Erro selecionando foto principal.");
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;

    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter((a) => a.id !== photo.id);
        this.loading = false;
      });
      toast.success("👍 Foto deletada com sucesso.");
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("👎 Erro deletando foto.");
    }
  };

  @action updateAbout = async (profile: Partial<IProfile>) => {
    try {
      await agent.Profiles.updateAbout(profile);
      runInAction(() => {
        if (profile.displayName !== this.rootStore.userStore.user!.displayName) {
          this.rootStore.userStore.user!.displayName = profile.displayName!;
        }
        this.profile = { ...this.profile!, ...profile };
      });
      toast.success("👍 Perfil atualizado com sucesso.");
    } catch (error) {
      toast.error("👎 Erro atualizando perfil.");
    }
  };
}
