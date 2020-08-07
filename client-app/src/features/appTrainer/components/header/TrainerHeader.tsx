import React from "react";
import { Statistic, Icon, Segment, Progress, Grid } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";

const TrainerHeader = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Segment piled textAlign="center" padded>
      <Grid columns={3} stackable divided>
        <Grid.Column>

          <Statistic>
            <Statistic.Value>
              <Icon name="clock" />
              220
            </Statistic.Value>
            <Statistic.Label>Minutes Today</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic >
            <Statistic.Value>
              <Icon name="list alternate" />
              20
            </Statistic.Value>
            <Statistic.Label>Etudes Done</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic >
            <Statistic.Value>
              <Icon name="checkmark" />4
            </Statistic.Value>
            <Statistic.Label>Hours Goal!</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid>
      <Grid columns={1} stackable divided>
        <Grid.Column>
          <Progress percent={Math.floor(Math.random() * 101)} indicating progress>50 Minutes required.</Progress>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default TrainerHeader;
