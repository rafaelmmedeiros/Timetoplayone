import React, { useContext, useEffect } from "react";
import { Statistic, Icon, Segment, Progress, Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const TrainerHeader: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadTodayChapter,
    todayChapter,
    decreaseObjetive,
    increaseObjetive,
    loadingDecrease,
    loadingIncrease,
    calculateNormalized,
    calculateHours,
  } = rootStore.userTodayChapterStore;

  useEffect(() => {
    loadTodayChapter();
  }, [loadTodayChapter]);

  return (
    <Segment piled textAlign="center" padded>
      <Grid columns={3} stackable divided>
        <Grid.Column>
          <Statistic>
            <Statistic.Value>
              <Icon name="clock" style={{ marginRight: "10px" }} />
              {todayChapter?.totalTime || 0}
            </Statistic.Value>
            <Statistic.Label>Minutos Hoje</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic>
            <Statistic.Value>
              <Icon name="list alternate" style={{ marginRight: "10px" }} />
              {todayChapter?.totalEtudes || 0}
            </Statistic.Value>
            <Statistic.Label>Etudes Feitos</Statistic.Label>
          </Statistic>
        </Grid.Column>

        {todayChapter ? (
          <Grid.Column>
            <Grid columns={2}>
              <Grid.Column width="10">
                <Statistic floated="right">
                  <Statistic.Value>
                    <Icon name="checkmark" style={{ marginRight: "10px" }} />
                    {todayChapter?.objective || 0}
                  </Statistic.Value>
                  <Statistic.Label>Objetivo! ({calculateHours} /h)</Statistic.Label>
                </Statistic>
              </Grid.Column>
              <Grid.Column width="4">
                <Button.Group vertical>
                  {/* UP */}
                  <Button
                    basic
                    color="blue"
                    onClick={(e) => {
                      increaseObjetive();
                    }}
                    loading={loadingIncrease}
                  >
                    <Icon fitted name={"arrow up"} />
                  </Button>

                  {/* DOWN */}
                  {todayChapter.objective >= 10 && (
                    <Button
                      basic
                      color="blue"
                      onClick={(e) => {
                        decreaseObjetive();
                      }}
                      loading={loadingDecrease}
                    >
                      <Icon fitted name={"arrow down"} />
                    </Button>
                  )}
                </Button.Group>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        ) : (
          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                <Icon name="bed" style={{ marginRight: "10px" }} />
              </Statistic.Value>
              <Statistic.Label>Não tocou hoje...</Statistic.Label>
            </Statistic>
          </Grid.Column>
        )}
      </Grid>

      {todayChapter && (
        <Grid columns={1} stackable divided>
          <Grid.Column>
            <Progress percent={calculateNormalized} indicating progress></Progress>
          </Grid.Column>
        </Grid>
      )}
    </Segment>
  );
};

export default observer(TrainerHeader);
