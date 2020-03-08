import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import GrupoList from './components/list/GrupoList'
import { observer } from 'mobx-react-lite';
import GrupoStore from '../../app/stores/grupoStore';
import LoadingComponent from '../../app/layout/LoadingComponent';

const GrupoDashboard: React.FC = () => {

  const grupoStore = useContext(GrupoStore);

  useEffect(() => {
    grupoStore.loadGrupos();
  }, [grupoStore]);

  if (grupoStore.loadingStart)
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