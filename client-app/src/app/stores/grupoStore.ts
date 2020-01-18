import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IGrupo } from '../models/grupo';
import agent from '../api/agent';

class GrupoStore {
  @observable grupos: IGrupo[] = [];
  @observable loadingStart = false;

  @action loadGrupos = () => {
    this.loadingStart = true;
    agent.Grupos.list()
    .then(grupos => {
      grupos.forEach((grupos) => {
        this.grupos.push(grupos);
      })
    }).finally(() => this.loadingStart = false);
  }
}

export default createContext(new GrupoStore())