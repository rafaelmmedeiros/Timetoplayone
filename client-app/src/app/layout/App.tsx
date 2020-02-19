import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import { observer } from 'mobx-react-lite';
import GrupoDashboard from '../../features/grupos/GrupoDashboard';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import GrupoForm from '../../features/grupos/components/GrupoForm';
import GrupoDetails from '../../features/grupos/components/details/GrupoDetails';
import NotFound from './errors/NotFound';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <ToastContainer position="bottom-right"/>
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
              <Switch>
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
                  path={['/criargrupo', '/editgrupo/:id']}
                  component={GrupoForm}
                />
                <Route
                  component={NotFound}
                />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));