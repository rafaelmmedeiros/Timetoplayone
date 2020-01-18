import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IGrupo } from '../../app/models/grupo'
import { GrupoList } from './components/GrupoList'
import { GrupoDetails } from './components/GrupoDetails';
import { GrupoForm } from './components/GrupoForm';

interface IProps {
  grupos: IGrupo[];
  selectGrupo: (id: string) => void;
  selectedGrupo: IGrupo | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedGrupo: (grupo: IGrupo | null) => void;
  createGrupo: (grupo: IGrupo) => void;
  editGrupo: (grupo: IGrupo) => void;
  deleteGrupo: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const GrupoDashboard: React.FC<IProps> = ({
  grupos,
  selectGrupo,
  selectedGrupo,
  editMode,
  setEditMode,
  setSelectedGrupo,
  createGrupo,
  editGrupo,
  deleteGrupo,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <GrupoList
          grupos={grupos}
          selectGrupo={selectGrupo}
          deleteGrupo={deleteGrupo}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedGrupo && !editMode &&
          <GrupoDetails
            grupo={selectedGrupo}
            setEditMode={setEditMode}
            setSelectedGrupo={setSelectedGrupo}
          />
        }
        {editMode &&
          <GrupoForm
            key={(selectedGrupo && selectedGrupo.id) || 0}
            grupo={selectedGrupo!}
            setEditMode={setEditMode}
            createGrupo={createGrupo}
            editGrupo={editGrupo}
            submitting={submitting}
          />
        }
      </Grid.Column>
    </Grid>
  );
};