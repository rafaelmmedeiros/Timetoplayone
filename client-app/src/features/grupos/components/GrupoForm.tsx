import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'
import { v4 as uuid } from 'uuid';
import GrupoStore from '../../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailsParams {
  id: string;
}

const GrupoForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {

  const grupoStore = useContext(GrupoStore);
  const {
    createGrupo,
    editGrupo,
    submitting,
    grupo: initialFormState,
    loadGrupo,
    clearGrupo
  } = grupoStore;

  const [grupo, setGrupo] = useState<IGrupo>({
    id: '',
    titulo: '',
    descricao: '',
    label:''
  });

  useEffect(() => {
    if (match.params.id && grupo.id.length === 0) {
      loadGrupo(match.params.id)
        .then(() => initialFormState && setGrupo(initialFormState));
    }
    return () => {
      clearGrupo();
    }
  }, [loadGrupo, clearGrupo, match.params.id, initialFormState, grupo.id.length]);

  const handleSubmit = () => {
    if (grupo.id.length === 0) {
      let newGrupo = {
        ...grupo,
        id: uuid()
      }
      createGrupo(newGrupo)
        .then(() => history.push(`/grupos/${newGrupo.id}`));
    } else {
      editGrupo(grupo)
        .then(() => history.push(`/grupos/${grupo.id}`));
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setGrupo({ ...grupo, [name]: value })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='titulo'
          placeholder='Titulo'
          value={grupo.titulo}
        />
        <Form.TextArea
          rows={3}
          onChange={handleInputChange}
          name='descricao'
          placeholder='Descrição'
          value={grupo.descricao}
        />
        <Button.Group widths={2}>
          <Button
            loading={submitting}
            basic color='olive'
            type='submit'
            content='Salvar'
          />
          <Button
            onClick={() => history.push('/grupos')}
            basic color='grey'
            type='button'
            content='Cancelar'
          />
        </Button.Group>
      </Form>
    </Segment>
  )
}

export default observer(GrupoForm);