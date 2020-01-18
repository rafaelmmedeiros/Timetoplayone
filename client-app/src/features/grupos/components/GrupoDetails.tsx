import React, { useContext } from 'react'
import { Card, Button } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'
import GrupoStore from '../../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  setEditMode: (editMode: boolean) => void
  setSelectedGrupo: (grupo: IGrupo | null) => void;
}

const GrupoDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedGrupo
}) => {

  const grupoStore = useContext(GrupoStore);
  const {selectedGrupo: grupo} = grupoStore;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{grupo!.titulo}</Card.Header>
        <Card.Description>{grupo!.descricao}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic color='blue'
            content='Editar' />
          <Button
            onClick={() => setSelectedGrupo(null)}
            basic color='red'
            content='Fechar' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(GrupoDetails);
