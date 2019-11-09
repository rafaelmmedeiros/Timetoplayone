import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { IEstudo } from '../../../app/models/estudo'

interface IProps {
    estudos: IEstudo[]
}


export const EstudoDashboard: React.FC<IProps> = ({ estudos }) => {
    return (
        <Grid>
            <Grid.Row>
                Filtros
            </Grid.Row>
            <Grid.Row>
                Estatisticas Gerais de Estudos
            </Grid.Row>
            <Grid.Row>
                <List>
                    {estudos.map((estudo) => (
                        <List.Item key={estudo.id}>{estudo.titulo} {estudo.origem} Idade: {estudo.dificuldade}</List.Item>
                    ))}
                </List>
            </Grid.Row>
        </Grid>
    )
}
