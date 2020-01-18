import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'
import { v4 as uuid } from 'uuid';

interface IProps {
  grupo: IGrupo;
  setEditMode: (editMode: boolean) => void;
  createGrupo: (grupo: IGrupo) => void;
  editGrupo: (grupo: IGrupo) => void;
  submitting: boolean;
}

export const GrupoForm: React.FC<IProps> = ({
  grupo: initialFormState,
  setEditMode,
  createGrupo,
  editGrupo,
  submitting
}) => {

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState
    } else {
      return {
        id: '',
        titulo: '',
        descricao: ''
      };
    };
  };

  const [grupo, setGrupo] = useState<IGrupo>(initializeForm);

  const handleSubmit = () => {
    if (grupo.id.length === 0) {
      let newGrupo = {
        ...grupo,
        id: uuid()
      }
      createGrupo(newGrupo);
    } else {
      editGrupo(grupo);
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
            onClick={() => setEditMode(false)}
            basic color='grey'
            type='button'
            content='Cancelar'
          />
        </Button.Group>
      </Form>
    </Segment>
  )
}
