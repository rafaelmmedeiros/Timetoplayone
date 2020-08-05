import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { ITome } from "../../../../../app/models/appTrainer/domain/tome";

const TrainerTomeItem: React.FC<{ tome: ITome }> = ({ tome }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Card key={tome.id} color="red">
      <Card.Content>
        <Card.Header>{tome.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button basic color="blue">
            <Icon fitted name={isMobile ? "arrow up" : "arrow left"} />
          </Button>
          <Button basic color="blue">
            <Icon fitted name={isMobile ? "arrow down" : "arrow right"} />
          </Button>
        </Button.Group>
        <Button basic color="red" floated="right">
          <Icon fitted name="trash" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerTomeItem);
