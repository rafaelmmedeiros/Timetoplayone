import React, { useContext, useState } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import ProfileAboutEditForm from "./ProfileAboutEditForm";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateAbout, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Sobre ${profile!.displayName}`} />

          {isCurrentUser && (
            <Button
              basic
              floated="right"
              color={editMode ? "red" : "blue"}
              content={editMode ? "Cancelar" : "Editar Perfil"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? <ProfileAboutEditForm updateProfile={updateAbout} profile={profile!} /> : <span>{profile!.bio}</span>}
        </Grid.Column>

      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
