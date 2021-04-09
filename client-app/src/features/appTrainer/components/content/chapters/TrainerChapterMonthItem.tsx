import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, Header, Progress } from "semantic-ui-react";
import { IWeekChapter } from "../../../../../app/models/appTrainer/domain/weekChapter";
import { ptBR } from "date-fns/locale";

const TrainerChapterMonthItem: React.FC<{ weekChapter: IWeekChapter }> = ({ weekChapter }) => {
  let hours = (weekChapter.totalTime / 60).toFixed(1);

  return (
    <Grid.Row>
      <Header size="tiny">
        {format(weekChapter.dayStart, "d / MMMM", { locale: ptBR })} - {format(weekChapter.dayEnd, "d / MMMM", { locale: ptBR })}
      </Header>
      <Progress size="large" percent={weekChapter.differenceToBestDay} progress indicating>
        {hours} /H
      </Progress>
    </Grid.Row>
  );
};

export default observer(TrainerChapterMonthItem);
