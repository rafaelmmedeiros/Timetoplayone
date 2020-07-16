import { observable, action, computed, runInAction } from "mobx";
import { SyntheticEvent } from "react";
import { IGrupo } from "../models/grupo";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

export default class GrupoStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable grupoRegistry = new Map();
  @observable grupo: IGrupo | null = null;
  @observable loadingStart = false;
  @observable submitting = false;
  @observable target = "";

  // ORDERING
  @computed get gruposByLabel() {
    return this.groupGruposByLabel(Array.from(this.grupoRegistry.values()));
  }

  groupGruposByLabel(grupos: IGrupo[]) {
    const sortedGrupos = grupos.sort(
      (a: any, b: any) => a.label - b.label // NAO FUNCIONA ARRUMAR
    );
    return Object.entries(
      sortedGrupos.reduce((grupos, grupo) => {
        const label = grupo.label;
        grupos[label] = grupos[label] ? [...grupos[label], grupo] : [grupo];
        return grupos;
      }, {} as { [key: string]: IGrupo[] })
    );
  }

  // CLEAN PARA USO EM FORM
  @action clearGrupo = () => {
    this.grupo = null;
  };

  // READs
  @action loadGrupos = async () => {
    this.loadingStart = true;

    try {
      const grupos = await agent.Grupos.list();
      runInAction("Loading Grupos", () => {
        grupos.forEach((grupo) => {
          this.grupoRegistry.set(grupo.id, grupo);
        });
        this.loadingStart = false;
      });
      console.log(this.groupGruposByLabel(grupos));
    } catch (error) {
      runInAction("Loading Grupos Erro", () => {
        this.loadingStart = false;
      });
      console.log(error);
    }
  };

  @action loadGrupo = async (id: string) => {
    let grupo = this.getGrupo(id);
    if (grupo) {
      this.grupo = grupo;
      return grupo;
    } else {
      this.loadingStart = true;

      try {
        grupo = await agent.Grupos.details(id);
        runInAction("Get Grupo", () => {
          this.grupo = grupo;
          this.grupoRegistry.set(grupo.id, grupo);
          this.loadingStart = false;
        });
        return grupo;
      } catch (error) {
        runInAction("Get Grupo Error", () => {
          this.loadingStart = false;
        });
        console.log(error);
      }
    }
  };

  getGrupo = (id: string) => {
    return this.grupoRegistry.get(id);
  };

  // CUD
  @action createGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.create(grupo);
      runInAction("Create Grupo", () => {
        this.grupoRegistry.set(grupo.id, grupo);
        this.submitting = false;
      });
      history.push(`/grupos/${grupo.id}`);
    } catch (error) {
      runInAction("Create Grupo Erro", () => {
        this.submitting = false;
      });
      toast.error("Problema ao enviar Grupo");
      console.log(error.response);
    }
  };

  @action editGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.update(grupo);
      runInAction("Edit Grupo", () => {
        this.grupoRegistry.set(grupo.id, grupo);
        this.grupo = grupo;
        this.submitting = false;
      });
      history.push(`/grupos/${grupo.id}`);
    } catch (error) {
      runInAction("Edit Grupo Erro", () => {
        this.submitting = false;
      });
      toast.error("Problema ao enviar Grupo");
      console.log(error.response);
    }
  };

  @action deleteGrupo = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Grupos.delete(id);
      runInAction("Delete Grupo", () => {
        this.grupoRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("Delete Grupo Erro", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
}
