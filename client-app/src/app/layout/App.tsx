import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import { LoadingComponent } from './LoadingComponent';
import GrupoStore from '../stores/grupoStore';
import { observer } from 'mobx-react-lite';
import GrupoDashboard from '../../features/grupos/GrupoDashboard';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import GrupoForm from '../../features/grupos/components/GrupoForm';
import GrupoDetails from '../../features/grupos/components/GrupoDetails';

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
        <Route exact path='/' component={HomePage} />
        <Route exact path='/grupos' component={GrupoDashboard} />
        <Route path='/grupos/:id' component={GrupoDetails} />
        <Route path='/criarGrupo' component={GrupoForm} />
      </Container>
    </Fragment>
  );
}

export default observer(App)