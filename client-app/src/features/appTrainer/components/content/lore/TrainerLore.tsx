import React from "react";
import { Tab, Grid, Header, Card, Button, Image, Label, Icon } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const TrainerLore = () => {
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="list layout" content={"Lore"} />
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
            <Card color="blue">
              <Card.Content>
                <Card.Header>Coordination</Card.Header>
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
            <Card color="orange">
              <Card.Content>
                <Card.Header>Arpeggios</Card.Header>
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
            <Card color="teal">
              <Card.Content>
                <Card.Header>Tapping</Card.Header>
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
            <Card color="black">
              <Card.Content>
                <Card.Header>Riffs</Card.Header>
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
