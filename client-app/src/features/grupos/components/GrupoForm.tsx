import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { GrupoFormValues } from "../../../app/models/grupo";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { combineValidators, isRequired, composeValidators, hasLengthBetween } from 'revalidate'; 
import { RootStoreContext } from "../../../app/stores/rootStore";

// VALIDATION
const validate = combineValidators({
  titulo: composeValidators(
    isRequired({message: 'Deve conter um Título'}),
    hasLengthBetween(4,15)({message: 'Titulo deve ter entre 4 e 15 caracteres.'})
  )(),
  subTitulo: composeValidators(
    isRequired({message: 'Deve conter um Sub-Título'}),
    hasLengthBetween(4,35)({message: 'Sub-Titulo deve ter entre 4 e 35 caracteres.'})
  )(),
  label: composeValidators(
    isRequired({message: 'Deve conter um Label'}),
    hasLengthBetween(4,15)({message: 'Label deve ter entre 4 e 15 caracteres.'})
  )(),
  descricao: composeValidators(
    isRequired({message: 'Deve conter uma Descrição'}),
    hasLengthBetween(4,128)({message: 'Descrição deve ter entre 4 e 128 caracteres.'})
  )(),
})

interface DetailsParams {
  id: string;
}

const GrupoForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createGrupo,
    editGrupo,
    submitting,
    loadGrupo
  } = rootStore.grupoStore;

  const [grupo, setGrupo] = useState(new GrupoFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadGrupo(match.params.id)
        .then(grupo => setGrupo(new GrupoFormValues(grupo)))
        .finally(() => setLoading(false));
    }
  }, [loadGrupo, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...grupo } = values;

    if (!grupo.id) {
      let newGrupo = {
        ...grupo,
        id: uuid()
      };
      createGrupo(newGrupo);
    } else {
      editGrupo(grupo);
    }
  };

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={grupo}
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit, invalid, pristine }) => (
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field
              name="titulo"
              placeholder="Titulo"
              value={grupo.titulo}
              component={TextInput}
            />
            <Field
              name="subTitulo"
              placeholder="Sub-Titulo"
              value={grupo.subTitulo}
              component={TextInput}
            />
            <Field
              name="label"
              placeholder="Label"
              value={grupo.label}
              component={TextInput}
            />
            <Field
              name="descricao"
              placeholder="Descrição"
              rows={5}
              value={grupo.descricao}
              component={TextAreaInput}
            />
            <Button.Group widths={2}>
              <Button
                loading={submitting}
                disabled={loading || invalid || pristine}
                color="olive"
                type="submit"
                content="Salvar"
              />
              <Button
                onClick={
                  grupo.id
                    ? () => history.push(`/grupos/${grupo.id}`)
                    : () => history.push("/grupos")
                }
                basic
                color="grey"
                type="button"
                content="Cancelar"
              />
            </Button.Group>
          </Form>
        )}
      />
    </Segment>
  );
};

export default observer(GrupoForm);
