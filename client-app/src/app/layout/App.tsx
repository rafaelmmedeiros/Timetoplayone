import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import { LoadingComponent } from './LoadingComponent';
import GrupoStore from '../stores/grupoStore';
import { observer } from 'mobx-react-lite';
import GrupoDashboard from '../../features/grupos/GrupoDashboard';

const App = () => {

  const grupoStore = useContext(GrupoStore);

  useEffect(() => {
    grupoStore.loadGrupos();
  }, [grupoStore]);

  if (grupoStore.loadingStart)
    return <LoadingComponent content='Carregando Grupos de estudos ...' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <GrupoDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App)