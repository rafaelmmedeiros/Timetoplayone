import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IGrupo } from '../../app/models/grupo'
import { GrupoList } from './components/GrupoList'

interface IProps {
    grupos: IGrupo[]
}

export const GrupoDashboard: React.FC<IProps> = ({ grupos }) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <GrupoList 
                    grupos={grupos} />
            </Grid.Column>
        </Grid>
    );
};