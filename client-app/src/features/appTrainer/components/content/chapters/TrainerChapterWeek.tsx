import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import TrainerChapterWeekBrief from "./TrainerChapterWeekBrief";
import TrainerChapterWeekDays from "./TrainerChapterWeekDays";

const TrainerChapterWeek = () => {
  return (
    <Grid>
      {/* HEADER WITH BRIEF */}
      <Grid.Column width={16}>
        <TrainerChapterWeekBrief />
      </Grid.Column>

      {/* LASTE SEVEN DAYS */}
      <Grid.Column width={16}>
        <TrainerChapterWeekDays />
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainerChapterWeek);
