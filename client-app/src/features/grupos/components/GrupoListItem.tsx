import React, { useContext } from 'react';
import { Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import GrupoStore from '../../../app/stores/grupoStore';
import { IGrupo } from '../../../app/models/grupo';

const GrupoListItem: React.FC<{grupo: IGrupo}> = ({
  grupo
}) => {

  const grupoStore = useContext(GrupoStore);
  const {
    gruposByLexi,
    deleteGrupo,
    target
  } = grupoStore;

  return (
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
            color='teal'
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default GrupoListItem