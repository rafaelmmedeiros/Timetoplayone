import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

const TrainerCollection: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userCollection, loadUserCollection, loadingUserCollection, createMode, setCreateMode } = rootStore.userCollectionStore;

  useEffect(() => {
    loadUserCollection();
  }, [loadUserCollection]);

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
            color={createMode ? "red" : "blue"}
            content={createMode ? "Cancel" : "New Etude"}
            onClick={() => setCreateMode()}
          />
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {userCollection?.etudes.map((etude) => (
            <h2 key={etude.id}>{etude.title}</h2>
          ))}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerCollection);
