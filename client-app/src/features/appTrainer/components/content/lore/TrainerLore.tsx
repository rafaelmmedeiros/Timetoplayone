import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import TrainerTomeItem from "./TrainerTomeItem";
import TrainerCreateTomeForm from "./TrainerCreateTomeForm";

const TrainerLore: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userLore, loadUserLore, loadingUserLore, createModeLore, setcreateModeLore } = rootStore.userLoreStore;
  const { createModeCollection, setcreateModeCollection } = rootStore.userCollectionStore;

  useEffect(() => {
    loadUserLore();
    if (createModeCollection) {
      setcreateModeCollection();
    }
  }, [loadUserLore, setcreateModeCollection, createModeCollection]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserLore && <LoadingComponent content="Loading" />}
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="book" content={"Tomes"} />
          {userLore?.tomes.length !== 10 && (
            <Button
              basic
              floated="right"
              color={createModeLore ? "red" : "blue"}
              content={createModeLore ? "Cancel" : "New Tome"}
              onClick={() => setcreateModeLore()}
            />
          )}
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {/* CONDICIONAL FOR NEW TOME */}
          {createModeLore ? (
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
