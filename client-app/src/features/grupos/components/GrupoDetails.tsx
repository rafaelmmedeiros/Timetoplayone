import React, { useContext, useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react'
import GrupoStore from '../../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps, Link } from 'react-router-dom';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';

interface DetailParams {
  id: string
}

const GrupoDetails: React.FC<RouteComponentProps<DetailParams>> = ({ 
  match, 
  history 
}) => {

  const grupoStore = useContext(GrupoStore);
  const {
    grupo,
    loadGrupo,
    loadingStart
  } = grupoStore;

  useEffect(() => {
    loadGrupo(match.params.id)
  }, [
    loadGrupo, 
    match.params.id
  ])

  if (loadingStart || !grupo)
    return <LoadingComponent content='Carregando Grupo...' />

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{grupo!.titulo}</Card.Header>
        <Card.Description>{grupo!.descricao}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/editar/${grupo.id}`}
            basic color='blue'
            content='Editar' />
          <Button
            onClick={() => history.push('/grupos')}
            basic color='red'
            content='Fechar' />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(GrupoDetails);
