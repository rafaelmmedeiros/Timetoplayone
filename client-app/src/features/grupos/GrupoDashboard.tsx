import React, { SyntheticEvent, useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import { IGrupo } from '../../app/models/grupo'
import GrupoList from './components/GrupoList'
import GrupoDetails from './components/GrupoDetails';
import { GrupoForm } from './components/GrupoForm';
import { observer } from 'mobx-react-lite';
import GrupoStore from '../../app/stores/grupoStore';

interface IProps {
  grupos: IGrupo[];
  setEditMode: (editMode: boolean) => void;
  setSelectedGrupo: (grupo: IGrupo | null) => void;
  editGrupo: (grupo: IGrupo) => void;
  deleteGrupo: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const GrupoDashboard: React.FC<IProps> = ({
  grupos,
  setEditMode,
  setSelectedGrupo,
  editGrupo,
  deleteGrupo,
  submitting,
  target
}) => {
  const grupoStore = useContext(GrupoStore);
  const {editMode, selectedGrupo} = grupoStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <GrupoList
          deleteGrupo={deleteGrupo}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedGrupo && !editMode &&
          <GrupoDetails
            setEditMode={setEditMode}
            setSelectedGrupo={setSelectedGrupo}
          />
        }
        {editMode &&
          <GrupoForm
            key={(selectedGrupo && selectedGrupo.id) || 0}
            grupo={selectedGrupo!}
            setEditMode={setEditMode}
            editGrupo={editGrupo}
            submitting={submitting}
          />
        }
      </Grid.Column>
    </Grid>
  );
};

export default observer(GrupoDashboard);