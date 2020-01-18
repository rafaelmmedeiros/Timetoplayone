import { observable, action, computed } from 'mobx';
import { createContext } from 'react';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';

class GrupoStore {
  @observable grupos: IGrupo[] = [];
  @observable selectedGrupo: IGrupo | undefined;
  @observable loadingStart = false;
  @observable editMode = false;
  @observable submitting = false;

  @computed get gruposByLexi() {
    return this.grupos.sort((a, b) => Number.parseInt(a.titulo) - Number.parseInt(b.titulo)); // NÂO FUNCIONA
  }

  // CARREGA TODOS GRUPOS
  @action loadGrupos = async () => {
    this.loadingStart = true;

    try {
      const grupos = await agent.Grupos.list();
      grupos.forEach((grupos) => {
        this.grupos.push(grupos);
      });
      this.loadingStart = false;
    } catch (error) {
      this.loadingStart = false;
      console.log(error);
    }
  };

  // CRUD
  @action createGrupo = async (grupo: IGrupo) => {
    this.submitting = true;
    try {
      await agent.Grupos.create(grupo);
      this.grupos.push(grupo);
      this.editMode = false;
      this.submitting = false;
    } catch (error) {
      this.submitting = false;
      console.log(error);
    }
  };

  // OTHERS
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedGrupo = undefined;
  }

  @action selectGrupo = (id: string) => {
    this.selectedGrupo = this.grupos.find(a => a.id === id);
    this.editMode = false;
  };
};

export default createContext(new GrupoStore())