import React, { useContext, useEffect, useState } from "react";
import { Tab, Grid, Header, Card, Button, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import TrainerTomeItem from "./TrainerTomeItem";
import TrainerCreateTomeForm from "./TrainerCreateTomeForm";

const TrainerLore: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userLore, loadUserLore, loadingUserLore, submitting, createMode, setCreateMode } = rootStore.userLoreStore;

  useEffect(() => {
    loadUserLore();
  }, [loadUserLore]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserLore && <LoadingComponent content="Loading" />}
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="list layout" content={"Tomes"} />
          <Button
            basic
            floated="right"
            color={createMode ? "red" : "blue"}
            content={createMode ? "Cancel" : "New Tome"}
            onClick={() => setCreateMode()}
          />
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {/* CONDICIONAL FOR NEW TOME */}
          {createMode ? (
            <TrainerCreateTomeForm />
          ) : (
            <Card.Group stackable itemsPerRow={3}>
              {userLore?.tomes.map((tome) => (
                <TrainerTomeItem key={tome.id} tome={tome} />
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerLore);
