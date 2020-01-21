import React, { useContext } from 'react'
import { Item, Button, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import GrupoStore from '../../../app/stores/grupoStore';
import { Link } from 'react-router-dom';
import GrupoListItem from './GrupoListItem';

const GrupoList: React.FC = () => {

  const grupoStore = useContext(GrupoStore);
  const {
    gruposByLexi,
    deleteGrupo,
    target
  } = grupoStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {gruposByLexi.map(grupo => (
          <GrupoListItem
            key={grupo.id}
            grupo={grupo}
          />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default observer(GrupoList);
