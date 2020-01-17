import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'

interface IProps {
  grupo: IGrupo
  setEditMode: (editMode: boolean) => void
  setSelectedGrupo: (grupo: IGrupo | null) => void;
}

export const GrupoDetails: React.FC<IProps> = ({
  grupo,
  setEditMode,
  setSelectedGrupo
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{grupo.titulo}</Card.Header>
        <Card.Description>{grupo.descricao}</Card.Description>
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
