import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Button, Label, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import TrainerEtudeItem from "./TrainerEtudeItem";
import TrainerCreateEtudeForm from "./TrainerCreateEtudeForm";

const TrainerCollection: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { etudesByTome, loadUserCollection, loadingUserCollection, createModeCollection, setcreateModeCollection } = rootStore.userCollectionStore;
  const { createModeLore, setcreateModeLore } = rootStore.userLoreStore;

  useEffect(() => {
    loadUserCollection();
    if (createModeLore) {
      setcreateModeLore();
    }
  }, [loadUserCollection, setcreateModeLore, createModeLore]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserCollection && <LoadingComponent content="Loading" />}
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="list alternate" content={"Etudes"} />
          <Button
            basic
            floated="right"
            color={createModeCollection ? "red" : "blue"}
            content={createModeCollection ? "Cancel" : "New Etude"}
            onClick={() => setcreateModeCollection()}
          />
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {/* CONDICIONAL FOR NEW TOME */}
          {createModeCollection ? (
            <TrainerCreateEtudeForm />
          ) : (
            etudesByTome.map(([group, etudes]) => (
              <Grid.Column key={group}>
                <Label color="red">{group}</Label>
                <Card.Group stackable itemsPerRow={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
                  {etudes.map((etude) => (
                    <TrainerEtudeItem key={etude.id} etude={etude} />
                  ))}
                </Card.Group>
              </Grid.Column>
            ))
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerCollection);
