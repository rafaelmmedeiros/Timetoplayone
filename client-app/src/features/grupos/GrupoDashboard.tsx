import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import GrupoList from './components/GrupoList'
import GrupoDetails from './components/GrupoDetails';
import GrupoForm from './components/GrupoForm';
import { observer } from 'mobx-react-lite';
import GrupoStore from '../../app/stores/grupoStore';

const GrupoDashboard: React.FC = () => {

  const grupoStore = useContext(GrupoStore);
  const { editMode, grupo } = grupoStore;

  return (
    <Grid>
      <Grid.Column width={16}>
        <GrupoList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(GrupoDashboard);