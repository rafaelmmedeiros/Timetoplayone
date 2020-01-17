import React from 'react'
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
    setEditMode: (editMode: boolean) =>void;
    setSelectedGrupo: (grupo: IGrupo | null) => void;
}

export const GrupoDashboard: React.FC<IProps> = ({ 
    grupos, 
    selectGrupo, 
    selectedGrupo, 
    editMode, 
    setEditMode,
    setSelectedGrupo
}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GrupoList
                    grupos={grupos}
                    selectGrupo={selectGrupo}
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
                        setEditMode={setEditMode}
                    />
                }
            </Grid.Column>
        </Grid>
    );
};