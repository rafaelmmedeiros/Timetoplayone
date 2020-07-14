import React from "react";
import { ITome } from "../../../../../app/models/appTrainer/userLore";
import { Card, Button, Icon } from "semantic-ui-react";

const TrainerTomeItem: React.FC<{ tome: ITome }> = ({ tome }) => {
  return (
    <Card key={tome.id} color="red">
      <Card.Content>
        <Card.Header>{tome.title}</Card.Header>
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
  );
};

export default TrainerTomeItem;
