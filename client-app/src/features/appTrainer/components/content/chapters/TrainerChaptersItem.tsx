import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Grid, Icon, Segment, Statistic } from "semantic-ui-react";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { format, formatDistance } from "date-fns";

const TrainerChaptersItem: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  const rootStore = useContext(RootStoreContext);
  const { loading } = rootStore.userChaptersStore;

  const minutesEtude = chapter.totalTime / chapter.totalEtudes;

  return (
    <Card key={chapter.id} color="red">
      {/* --------------------- */}
      <Card.Content>
        {/* HEADER */}
        <Card.Header>
          {format(chapter.day, "dd/MMM/yy")} - {formatDistance(new Date(), chapter.day)}
        </Card.Header>
      </Card.Content>

      {/* --------------------- */}

      {/* --------------------- */}
      <Card.Content extra>
        <Grid columns={4} stackable divided textAlign="center">
          <Grid.Column>
            <Statistic size="small">
              <Statistic.Value>
                <Icon name="clock" style={{ marginRight: "10px" }} />
                {chapter.totalTime}
              </Statistic.Value>
              <Statistic.Label>Minutes</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic size="small">
              <Statistic.Value>
                <Icon name="list alternate" style={{ marginRight: "10px" }} />
                {chapter.totalEtudes}
              </Statistic.Value>
              <Statistic.Label>Etudes</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic size="small">
              <Statistic.Value>
                <Icon name="list alternate" style={{ marginRight: "10px" }} />
                {minutesEtude.toFixed(1)}
              </Statistic.Value>
              <Statistic.Label>Minutes/Etudes</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Statistic size="small">
              <Statistic.Value>
                <Icon name="list alternate" style={{ marginRight: "10px" }} />
                {chapter.totalEtudes}
              </Statistic.Value>
              <Statistic.Label>Interval</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerChaptersItem);
