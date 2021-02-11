import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import TrainerPracticeItem from "./TrainerPracticeItem";

const TrainerPractice: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userPractice, loadUserPractice, loadingUserPractice } = rootStore.userPracticeStore;

  useEffect(() => {
    loadUserPractice();
  }, [loadUserPractice]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserPractice && <LoadingComponent content="Loading" />}
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="pin" content={"Etudes to Play!"} />
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {/* ETUDE LIST */}

            <Card.Group stackable itemsPerRow={4}>
              {userPractice?.etudes.map((etude) => (
                <TrainerPracticeItem key={etude.id} etude={etude} />
              ))}
            </Card.Group>
          
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerPractice);
