import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import GrupoList from './components/list/GrupoList'
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../app/stores/rootStore';

const GrupoDashboard: React.FC = () => {

  const rootStore = useContext(RootStoreContext);
  const {loadGrupos, loadingStart} = rootStore.grupoStore;

  useEffect(() => {
    loadGrupos();
  }, [loadGrupos]);

  if (loadingStart)
    return <LoadingComponent content='Carregando Grupos de estudos ...' />

  return (
    <Grid>
      <Grid.Column width={16}>
        <GrupoList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(GrupoDashboard);