import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { EtudeFormValues } from "../../../../../app/models/appTrainer/userCollection";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../../../../app/common/form/TextInput";
import TextAreaInput from "../../../../../app/common/form/TextAreaInput";
import NumberInput from "../../../../../app/common/form/NumbeInput";


const TrainerCreateEtudeForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createEtude, submitting, setCreateMode } = rootStore.userCollectionStore;

  const [loading, setLoading] = useState(false);
  const [etude, setEtude] = useState(new EtudeFormValues());

  const handleFinalFormSubmit = (values: any) => {
    const { ...etude } = values;
    let newEtude = {
      ...etude,
      id: uuid(),
    };
    createEtude(newEtude);
  };

  return (
    <FinalForm
      
      initialValues={etude}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={loading}>
          <Field 
            name="title" 
            placeholder="Title" 
            value={etude.title} 
            component={TextInput} />
          <Field 
            name="tome" 
            placeholder="Tome" 
            value={etude.title} 
            component={TextInput} />
          <Field 
            name="time" 
            placeholder="Time"
            value={etude.time} 
            component={NumberInput} />
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
