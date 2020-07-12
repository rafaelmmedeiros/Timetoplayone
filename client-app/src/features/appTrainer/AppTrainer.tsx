import React from "react";
import { Grid } from "semantic-ui-react";
import TrainerHeader from "./components/header/TrainerHeader";
import TrainerHeatMap from "./components/heatMap/TrainerHeatMap";
import TrainerContent from "./components/content/TrainerContent";

const AppTrainer = () => {
  return (
    <Grid>
      <Grid.Column>
        <TrainerHeader />
        <TrainerHeatMap />
        <TrainerContent />
      </Grid.Column>
    </Grid>
  );
};

export default AppTrainer;
