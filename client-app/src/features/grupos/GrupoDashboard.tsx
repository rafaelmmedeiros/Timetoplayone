import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IGrupo } from '../../app/models/grupo'

interface IProps {
    grupos: IGrupo[]
}

export const GrupoDashboard: React.FC<IProps> = ({ grupos }) => {
    return (
        <Grid>
            <Grid.Row>
                Filtros
            </Grid.Row>
            <Grid.Row>
                Estatisticas Gerais de Grupos
            </Grid.Row>
            <Grid.Row>
                Adição de novo Grupo
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}