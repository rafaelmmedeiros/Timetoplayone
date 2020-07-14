import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card, Button, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import TrainerTomeItem from "./TrainerTomeItem";

const TrainerLore: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userLore, loadUserLore, loadingUserLore } = rootStore.userLoreStore;

  useEffect(() => {
    loadUserLore();
  }, [loadUserLore]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserLore && <LoadingComponent content="Loading" />}
        <Grid.Column width={16}>
          <Header floated="left" icon="list layout" content={"Tomes"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group stackable itemsPerRow={3}>
            {/* TOME COMPONENTE */}
            {userLore?.tomes.map((tome) => (
              <TrainerTomeItem key={tome.id} tome={tome} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerLore);
