import React from "react";
import { Tab, Grid, Header, Card, Button, Icon } from "semantic-ui-react";

const TrainerLore = () => {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="list layout" content={"Tomes"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group stackable itemsPerRow={3}>
            <Card color="red">
              <Card.Content>
                <Card.Header>Warm-up</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button.Group>
                  <Button basic color="blue">
                    <Icon fitted name="arrow left" />
                  </Button>
                  <Button basic color="blue">
                    <Icon fitted name="arrow right" />
                  </Button>
                </Button.Group>
                <Button basic color="red" floated="right">
                  <Icon fitted name="trash" />
                </Button>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default TrainerLore;
