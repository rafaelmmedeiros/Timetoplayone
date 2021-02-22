import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import TrainerChapterWeek from "./TrainerChapterWeek";

const TrainerChapters = () => {
  return (
    <Tab.Pane>
      <Grid>
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="pin" content={"Chapters written!"} />
        </Grid.Column>

        {/* LASTE SEVEN DAYS */}
        <Grid.Column width={16}>
          <TrainerChapterWeek />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerChapters);
