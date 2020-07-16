import React from "react";
import { observer } from "mobx-react-lite";
import { IEtude } from "../../../../../app/models/appTrainer/userCollection";
import { Card, Button, Icon } from "semantic-ui-react";
import { format } from 'date-fns';

const TrainerEtudeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  return (
    <Card key={etude.id} color="red">
      <Card.Content>
        <Card.Header>{etude.title}</Card.Header>
        <Card.Meta>{etude.lastPlayed}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button basic color="violet" floated="right">
          <Icon fitted name="magnify" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerEtudeItem);
