import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerChapterWeekBrief: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { weekBrief, loadWeekBrief, loadingWeekBrief } = rootStore.userChaptersStore;

  useEffect(() => {
    loadWeekBrief();
  }, [loadWeekBrief]);

  return (
    <Grid textAlign="center" columns={3} divided>
      {/* LOADING COMPONENT */}
      {loadingWeekBrief && <LoadingComponent content="Loading" />}
      {/* HEADER */}
      <Grid.Column width={16}>
        <Header floated="left" icon="calendar alternate outline" content={"Last Seven Days."} />
      </Grid.Column>

      <Grid.Column>
        <Header size="huge">{weekBrief?.totalTIme || 0}</Header>
        <Header size="small" style={{ marginTop: -10 }}>
          Hours
        </Header>
      </Grid.Column>

      <Grid.Column>
        <Header size="huge">{weekBrief?.totalEtudes || 0}</Header>
        <Header size="small" style={{ marginTop: -10 }}>
          Etudes
        </Header>
      </Grid.Column>

      <Grid.Column>
        <Header size="huge">{weekBrief?.averageDay || 0} </Header>
        <Header size="small" style={{ marginTop: -10 }}>
          Day/H Average
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainerChapterWeekBrief);
