import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IGrupo } from '../../../app/models/grupo'
import { v4 as uuid } from 'uuid';
import GrupoStore from '../../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';


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
    subTitulo: '',
    descricao: '',
    label: ''
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

  // const handleSubmit = () => {
  //   if (grupo.id.length === 0) {
  //     let newGrupo = {
  //       ...grupo,
  //       id: uuid()
  //     }
  //     createGrupo(newGrupo)
  //       .then(() => history.push(`/grupos/${newGrupo.id}`));
  //   } else {
  //     editGrupo(grupo)
  //       .then(() => history.push(`/grupos/${grupo.id}`));
  //   }
  // }

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <Segment clearing>
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name='titulo'
              placeholder='Titulo'
              value={grupo.titulo}
              component={TextInput}
            />
            <Field
              name='subTitulo'
              placeholder='Sub-Titulo'
              value={grupo.subTitulo}
              component={TextInput}
            />
            <Field
              name='label'
              placeholder='Label'
              value={grupo.label}
              component={TextInput}
            />
            <Field
              name='descricao'
              placeholder='Descrição'
              rows={5}
              value={grupo.descricao}
              component={TextAreaInput}
            />
            <Button.Group widths={2}>
              <Button
                loading={submitting}
                color='olive'
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
        )}
      />
    </Segment>
  )
}

export default observer(GrupoForm);