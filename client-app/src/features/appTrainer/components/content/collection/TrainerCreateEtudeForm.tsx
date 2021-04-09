import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../../../../app/common/form/TextInput";
import TextAreaInput from "../../../../../app/common/form/TextAreaInput";
import NumberInput from "../../../../../app/common/form/NumbeInput";
import {
  combineValidators,
  isRequired,
  hasLengthBetween,
  composeValidators,
  hasLengthLessThan,
} from "revalidate";
import { EtudeFormValues } from "../../../../../app/models/appTrainer/domain/etude";

let required = "Não pode ser vazio";

// VALIDATION
const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: required }),
    hasLengthBetween(3, 15)({ message: "Deve ter entre 3 e 15 caracteres" })
  )(),
  tome: composeValidators(
    isRequired({ message: required }),
    hasLengthBetween(3, 15)({ message: "Deve ter entre 3 e 15 caracteres" })
  )(),
  time: composeValidators(
    isRequired({ message: required }),
    hasLengthLessThan(3)({ message: "Deve ter entre 1 e 99" })
  )(),
  description: composeValidators(
    isRequired({ message: required }),
    hasLengthLessThan(250)({ message: "Máximo de 250 caracteres" })
  )(),
});

const TrainerCreateEtudeForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createEtude, editEtude, submitting } = rootStore.userCollectionStore;

  const [etude] = useState(new EtudeFormValues());
  const [loading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    const { ...etude } = values;

    if (!etude.id) {
      let newEtude = {
        ...etude,
        id: uuid(),
      };
      createEtude(newEtude);
    } else {
      editEtude(etude);
    }
  };

  return (
    <FinalForm
      validate={validate}
      initialValues={etude}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={loading}>
          <Field
            name="title"
            placeholder="Título"
            value={etude.title}
            component={TextInput}
          />
          <Field
            name="tome"
            placeholder="Grupo"
            value={etude.title}
            component={TextInput}
          />
          <Field
            name="time"
            placeholder="Tempo"
            value={etude.time}
            component={NumberInput}
          />
          <Field
            name="description"
            placeholder="Descrição e detalhes"
            rows={10}
            value={etude.description}
            component={TextAreaInput}
          />
          <Button
            loading={submitting}
            disabled={loading || invalid || pristine}
            floated="right"
            color="olive"
            type="submit"
            content="Criar"
          />
        </Form>
      )}
    />
  );
};

export default observer(TrainerCreateEtudeForm);
