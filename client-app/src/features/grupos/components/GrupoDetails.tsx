import React, { useContext } from 'react'
import { Card, Button } from 'semantic-ui-react'
import GrupoStore from '../../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';

const GrupoDetails: React.FC = () => {

  const grupoStore = useContext(GrupoStore);
  const { selectedGrupo: grupo, openEditForm, cancelSelectedGrupo } = grupoStore;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{grupo!.titulo}</Card.Header>
        <Card.Description>{grupo!.descricao}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(grupo!.id)}
            basic color='blue'
            content='Editar' />
          <Button
            onClick={cancelSelectedGrupo}
            basic color='red'
            content='Fechar' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(GrupoDetails);
