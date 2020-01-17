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
}

export const GrupoDashboard: React.FC<IProps> = ({ grupos, selectGrupo, selectedGrupo }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GrupoList
                    grupos={grupos}
                    selectGrupo={selectGrupo}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedGrupo &&
                    <GrupoDetails 
                        grupo={selectedGrupo}
                    />
                }
                <GrupoForm />
            </Grid.Column>
        </Grid>
    );
};