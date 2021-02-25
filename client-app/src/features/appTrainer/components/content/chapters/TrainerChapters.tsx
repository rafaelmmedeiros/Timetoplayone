import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Tab } from "semantic-ui-react";
import TrainerChapterMonth from "./TrainerChapterMonth";
import TrainerChapterWeek from "./TrainerChapterWeek";

const TrainerChapters = () => {
  return (
    <Tab.Pane>
      <Grid>
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="chart line" content={"Chapters written!"} />
        </Grid.Column>

        {/* LAST SEVEN DAYS */}
        <Grid.Column width={16}>
          <TrainerChapterWeek />
        </Grid.Column>

        {/* LAST 28 DAYS */}
        <Grid.Column width={16}>
          <TrainerChapterMonth />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerChapters);
