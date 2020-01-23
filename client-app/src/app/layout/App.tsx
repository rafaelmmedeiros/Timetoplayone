import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import GrupoDashboard from '../../features/grupos/GrupoDashboard';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import GrupoForm from '../../features/grupos/components/GrupoForm';
import GrupoDetails from '../../features/grupos/components/details/GrupoDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route
        exact
        path='/'
        component={HomePage}
      />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container
              style={{ marginTop: '7em' }}>
              <Route
                exact
                path='/grupos'
                component={GrupoDashboard}
              />
              <Route
                path='/grupos/:id'
                component={GrupoDetails}
              />
              <Route
                key={location.key}
                path={['/criarGrupo', '/editar/:id']}
                component={GrupoForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));