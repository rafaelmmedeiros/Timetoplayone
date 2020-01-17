import React from 'react'
import { Item, Button, Segment } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'

interface IProps {
  grupos: IGrupo[];
  selectGrupo: (id: string) => void;
  deleteGrupo: (id: string) => void;
}

export const GrupoList: React.FC<IProps> = ({ 
  grupos, 
  selectGrupo,
  deleteGrupo
}) => {
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
                <Button 
                  onClick={() => selectGrupo(grupo.id)} 
                  floated='right' 
                  content='Detalhes' 
                  color='blue' 
                  />
                <Button 
                  onClick={() => deleteGrupo(grupo.id)} 
                  floated='right' 
                  content='Excluir' 
                  color='red' 
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}
