import React from "react";
import { Grid } from "semantic-ui-react";
import TrainerHeader from "./components/header/TrainerHeader";
import TrainerContent from "./components/content/TrainerContent";

const AppTrainer = () => {
  return (
    <Grid>
      <Grid.Column>
        {/* <TrainerHeatMap /> */}
        <TrainerHeader />
        <TrainerContent />
      </Grid.Column>
    </Grid>
  );
};

export default AppTrainer;
