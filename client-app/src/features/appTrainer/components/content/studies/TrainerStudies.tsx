import React from "react";
import { Tab, Grid, Header } from "semantic-ui-react";

const TrainerStudies = () => {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="list" content={"Studies"} />
        </Grid.Column>
        <Grid.Column width={16}></Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default TrainerStudies;
