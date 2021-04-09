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
    isRequired({ message: "Is required" }),
    hasLengthBetween(3, 15)({ message: "Must be beetween 3 and 15 characters" })
  )(),
  bio: composeValidators(
    hasLengthLessThan(250)({ message: "Maximum of 250 characters" })
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
            placeholder="Display Name"
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
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

export default observer(ProfileAboutEditForm);
