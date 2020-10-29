import React, { useContext, useEffect } from "react";
import { Statistic, Icon, Segment, Progress, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const TrainerHeader: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadTodayChapter, todayChapter } = rootStore.userChaptersStore;

  useEffect(() => {
    loadTodayChapter();
  }, [loadTodayChapter]);

  return (
    <Segment piled textAlign="center" padded>
      <Grid columns={3} stackable divided>

        <Grid.Column>
          <Statistic>
            <Statistic.Value>
              <Icon name="clock" style={{ marginRight: "10px"}}/>
              {todayChapter?.totalTime}
            </Statistic.Value>
            <Statistic.Label>Minutes Today</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic>
            <Statistic.Value>
              <Icon name="list alternate" style={{ marginRight: "10px"}}/>
              {todayChapter?.totalEtudes}
            </Statistic.Value>
            <Statistic.Label>Etudes Done</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic>
            <Statistic.Value>
              <Icon name="checkmark" style={{ marginRight: "10px"}}/>4
            </Statistic.Value>
            <Statistic.Label>Hours Goal!</Statistic.Label>
          </Statistic>
        </Grid.Column>

      </Grid>
      
      <Grid columns={1} stackable divided>
        <Grid.Column>
          <Progress percent={Math.floor(Math.random() * 101)} indicating progress>
            50 Minutes required.
          </Progress>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TrainerHeader);
