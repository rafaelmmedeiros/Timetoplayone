import { observable, action, computed } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';

class GrupoStore {
  @observable grupoRegistry = new Map();
  @observable grupos: IGrupo[] = [];
  @observable selectedGrupo: IGrupo | undefined;
  @observable loadingStart = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get gruposByLexi() {
    return Array.from(this.grupoRegistry.values()).sort(); // NÂO FUNCIONA
  }

  // CARREGA TODOS GRUPOS
  @action loadGrupos = async () => {
    this.loadingStart = true;

    try {
      const grupos = await agent.Grupos.list();
      grupos.forEach((grupo) => {
        this.grupoRegistry.set(grupo.id, grupo);
      });
      this.loadingStart = false;
    } catch (error) {
      this.loadingStart = false;
      console.log(error);
    }
  };

  // CUD
  @action createGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.create(grupo);
      this.grupoRegistry.set(grupo.id, grupo);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action editGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.update(grupo);
      this.grupoRegistry.set(grupo.id, grupo);
      this.selectedGrupo = grupo;
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  @action deleteGrupo = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Grupos.delete(id);
      this.grupoRegistry.delete(id);
      this.submitting = false;
      this.target = '';
    } catch (error) {
      console.log(error);
      this.submitting = false;
      this.target = '';
    }
  };


  // OTHERS
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedGrupo = undefined;
  }

  @action openEditForm = (id: string) => {
    this.selectedGrupo = this.grupoRegistry.get(id);
    this.editMode = true;
  }

  @action cancelEditForm = () => {
    this.editMode = false;
  };

  @action selectGrupo = (id: string) => {
    this.selectedGrupo = this.grupoRegistry.get(id);
    this.editMode = false;
  };

  @action cancelSelectedGrupo = () => {
    this.selectedGrupo = undefined;
  };
};

export default createContext(new GrupoStore())