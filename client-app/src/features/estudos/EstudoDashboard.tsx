import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IEstudo } from '../../app/models/estudo'
import { EstudoList } from './components/EstudoList'

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
                Adição de novo estudo
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    <EstudoList />
                </Grid.Column>
                {/* <List>
                    {estudos.map((estudo) => (
                        <List.Item key={estudo.id}>{estudo.titulo} {estudo.origem} Idade: {estudo.dificuldade}</List.Item>
                    ))}
                </List> */}
            </Grid.Row>
        </Grid>
    )
}
