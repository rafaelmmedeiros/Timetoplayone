import React from "react";
import { IProfile } from "../../../../app/models/profile";
import { Form as FinalForm, Field } from "react-final-form";
import { observer } from "mobx-react-lite";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthBetween,
  hasLengthLessThan,
} from "revalidate";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../../app/common/form/TextInput";
import TextAreaInput from "../../../../app/common/form/TextAreaInput";

const validate = combineValidators({
  displayName: composeValidators(
    isRequired({ message: "Deve conter um Nome" }),
    hasLengthBetween(3, 15)({ message: "Titulo deve ter entre 3 e 15 caracteres." })
  )(),
  bio: composeValidators(
    hasLengthLessThan(250)({ message: "Bio deve ter no máximo 250 caracters." })
  )(),
});

interface IProps {
  updateProfile: (profile: Partial<IProfile>) => void;
  profile: IProfile;
}

const ProfileAboutEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
      onSubmit={updateProfile}
      validate={validate}
      initialValues={profile!}
      render={({ handleSubmit, invalid, pristine, submitting }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Nome de Exibição"
            value={profile!.displayName}
          />
          <Field
            name="bio"
            component={TextAreaInput}
            rows={5}
            placeholder="Bio"
            value={profile!.bio}
          />
          <Button
            loading={submitting}
            floated="right"
            disabled={invalid || pristine}
            positive
            content="Atualizar perfil"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileAboutEditForm);
