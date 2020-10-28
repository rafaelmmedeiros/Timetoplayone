import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Grid, Icon, Segment, Statistic } from "semantic-ui-react";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { format } from "date-fns";

const TrainerChaptersItem: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  const rootStore = useContext(RootStoreContext);
  const { loading } = rootStore.userChaptersStore;

  return (
    <Card key={chapter.id} color="red">
      {/* --------------------- */}
      <Card.Content>
        {/* HEADER */}
        <Card.Header>{format(chapter.day, "dd/MMM/yy")}</Card.Header>
      </Card.Content>

      {/* --------------------- */}

      {/* --------------------- */}
      <Card.Content extra>

        <Grid columns={2} stackable divided textAlign="center">

          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon size='small' name="clock" />
                {chapter.totalTime}
              </Statistic.Value>
              <Statistic.Label>Minutes</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon size='small' name="list alternate" />
                {chapter.totalEtudes}
              </Statistic.Value>
              <Statistic.Label>Etudes</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>

      </Card.Content>
    </Card>
  );
};

export default observer(TrainerChaptersItem);
