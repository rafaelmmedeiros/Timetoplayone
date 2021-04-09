import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Progress } from "semantic-ui-react";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";
import { ptBR } from "date-fns/locale";

const TrainerChapterWeekDaysItem: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  let hours = (chapter.totalTime / 60).toFixed(1);

  return (
    <Grid.Row>
      <Header size="tiny"> {format(chapter.day, "EEEE - d / MMMM", { locale: ptBR })}</Header>
      <Progress size="medium" percent={chapter.differenceToBestDay} progress indicating>
        {hours} /H
      </Progress>
    </Grid.Row>
  );
};

export default observer(TrainerChapterWeekDaysItem);
