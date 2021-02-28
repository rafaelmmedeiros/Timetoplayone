import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired, composeValidators, hasLengthBetween } from "revalidate";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import TextInput from "../../../../../app/common/form/TextInput";
import { Button, Form } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { TomeFormValues } from "../../../../../app/models/appTrainer/domain/tome";

const validate = combineValidators({
  title: composeValidators(
    isRequired({message: 'Is required'}),
    hasLengthBetween(3,15)({message: 'Must be beetween 3 and 15 characters'})
  )(),
})

const TrainerCreateTomeForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createTome, submitting } = rootStore.userLoreStore;
  
  const [loading] = useState(false);
  const [tome] = useState(new TomeFormValues());

  const handleFinalFormSubmit = (values: any) => {
    const { ...tome } = values;
    let newTome = {
      ...tome,
      id: uuid(),
    };
    createTome(newTome);
  };

  return (
    <FinalForm
      validate={validate}
      initialValues={tome}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} loading={loading}>
          <Field 
            name="title" 
            placeholder="Title" 
            value={tome.title} 
            component={TextInput} />
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

export default observer(TrainerCreateTomeForm);
