import React from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <Grid>
      <Grid.Column>
        <Header>DASHBOARD</Header>
        <Button content="TRAINER" as={NavLink} exact to="/dashboard/trainer"></Button>
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
