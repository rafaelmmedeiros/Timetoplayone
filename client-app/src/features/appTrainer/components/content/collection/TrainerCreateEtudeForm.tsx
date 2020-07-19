import React, { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { EtudeFormValues } from "../../../../../app/models/appTrainer/userCollection";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../../../../../app/common/form/TextInput";
import TextAreaInput from "../../../../../app/common/form/TextAreaInput";
import NumberInput from "../../../../../app/common/form/NumbeInput";
import { combineValidators, isRequired, hasLengthBetween, composeValidators, hasLengthLessThan } from "revalidate";

// VALIDATION
const validate = combineValidators({
  title: composeValidators(
    isRequired({message: 'Is required'}),
    hasLengthBetween(3,15)({message: 'Must be beetween 3 and 15 characters'})
  )(),
  tome: composeValidators(
    isRequired({message: 'Is required'}),
    hasLengthBetween(3,15)({message: 'Must be beetween 3 and 15 characters'})
  )(),
  time: composeValidators(
    isRequired({message: 'Is required'}),
    hasLengthLessThan(3)({message: 'Must be beetween 0 and 99'}),
  )(),
  description: composeValidators(
    isRequired({message: 'Is required'}),
    hasLengthLessThan(250)({message: 'Maximun of 250 characters'}),
  )(),
})


const TrainerCreateEtudeForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { createEtude, editEtude, submitting, loadEtude } = rootStore.userCollectionStore;

  const [etude, setEtude] = useState(new EtudeFormValues());
  const [loading, setLoading] = useState(false);


  var idTeste = "e0ca2907-75d0-4869-bf44-afcc9f3e25e7";

  useEffect(() => {
    if (idTeste) {
      setLoading(true);
      loadEtude(idTeste)
        .then(etude => setEtude(new EtudeFormValues(etude)))
        .finally(() => setLoading(false));
    }
  }, [loadEtude, idTeste]);



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
      validate={validate}
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
