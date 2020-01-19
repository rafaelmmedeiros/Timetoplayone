import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';

configure({ enforceActions: 'always' });

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
      runInAction('Loading Grupos', () => {
        grupos.forEach((grupo) => {
          this.grupoRegistry.set(grupo.id, grupo);
        });
        this.loadingStart = false;
      })
    } catch (error) {
      runInAction('Loading Grupos Erro',() => {
        this.loadingStart = false;
      })
      console.log(error);
    }
  };

  // CUD
  @action createGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.create(grupo);
      runInAction('Create Grupo', () => {
        this.grupoRegistry.set(grupo.id, grupo);
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('Create Grupo Erro', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editGrupo = async (grupo: IGrupo) => {
    this.submitting = true;

    try {
      await agent.Grupos.update(grupo);
      runInAction('Edit Grupo',() => {
        this.grupoRegistry.set(grupo.id, grupo);
        this.selectedGrupo = grupo;
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('Edit Grupo Erro',() => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteGrupo = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Grupos.delete(id);
      runInAction('Delete Grupo', () => {
        this.grupoRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('Delete Grupo Erro', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
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