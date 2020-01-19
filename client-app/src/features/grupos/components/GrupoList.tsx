import React, { useContext } from 'react'
import { Item, Button, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import GrupoStore from '../../../app/stores/grupoStore';
import { Link } from 'react-router-dom';

const GrupoList: React.FC = () => {

  const grupoStore = useContext(GrupoStore);
  const { gruposByLexi, selectGrupo, deleteGrupo, target } = grupoStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {gruposByLexi.map(grupo => (
          <Item key={grupo.id}>
            <Item.Content>
              <Item.Header as='a'>{grupo.titulo}</Item.Header>
              <Item.Description>
                <div>{grupo.descricao}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link} to={`/grupos/${grupo.id}`}
                  floated='right'
                  content='Detalhes'
                  color='blue'
                />
                <Button
                  name={grupo.id}
                  loading={target === grupo.id}
                  onClick={(e) => deleteGrupo(e, grupo.id)}
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

export default observer(GrupoList);
