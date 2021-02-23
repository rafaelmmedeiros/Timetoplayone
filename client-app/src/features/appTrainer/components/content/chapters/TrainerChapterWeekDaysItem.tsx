import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Progress } from "semantic-ui-react";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";

const TrainerChapterWeekDaysItem: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  return (
    <Grid.Row>
      <Header>{chapter.day}</Header>
      <Progress size="large" percent={chapter.differenceToBestDay} progress indicating>SOMETHING GOEs HERE</Progress>
    </Grid.Row>
  );
};

export default observer(TrainerChapterWeekDaysItem);
