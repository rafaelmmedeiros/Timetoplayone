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

// VALIDATION
const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: "Is required" }),
    hasLengthBetween(3, 15)({ message: "Must be beetween 3 and 15 characters" })
  )(),
  tome: composeValidators(
    isRequired({ message: "Is required" }),
    hasLengthBetween(3, 15)({ message: "Must be beetween 3 and 15 characters" })
  )(),
  time: composeValidators(
    isRequired({ message: "Is required" }),
    hasLengthLessThan(3)({ message: "Must be beetween 0 and 99" })
  )(),
  description: composeValidators(
    isRequired({ message: "Is required" }),
    hasLengthLessThan(250)({ message: "Maximun of 250 characters" })
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
            placeholder="Title"
            value={etude.title}
            component={TextInput}
          />
          <Field
            name="tome"
            placeholder="Tome"
            value={etude.title}
            component={TextInput}
          />
          <Field
            name="time"
            placeholder="Time"
            value={etude.time}
            component={NumberInput}
          />
          <Field
            name="description"
            placeholder="Description and Details"
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
            content="Create"
          />
        </Form>
      )}
    />
  );
};

export default observer(TrainerCreateEtudeForm);
