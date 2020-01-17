import React from 'react'
import { Item, Button, Segment } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'

interface IProps {
    grupos: IGrupo[]
}

export const GrupoList: React.FC<IProps> = ({ grupos }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {grupos.map(grupo => (
                    <Item key={grupo.id}>
                        <Item.Content>
                            <Item.Header as='a'>{grupo.titulo}</Item.Header>
                            <Item.Description>
                                <div>{grupo.descricao}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='Visualizar' color='blue' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
