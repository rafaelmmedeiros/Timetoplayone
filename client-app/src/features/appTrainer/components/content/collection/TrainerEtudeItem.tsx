import React from "react";
import { observer } from "mobx-react-lite";
import { IEtude } from "../../../../../app/models/appTrainer/userCollection";
import { Card, Button, Icon } from "semantic-ui-react";
import { format } from "date-fns";

const TrainerEtudeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  var today = new Date();
  var last = new Date(etude.lastPlayed);
  var created = new Date(etude.created);
  var diffPlayed = today.valueOf() - last.valueOf();
  var diffCreated = today.valueOf() - created.valueOf();

  return (
    <Card key={etude.id} color="red">
      <Card.Content>
        <Button.Group floated="right" toggle>
          <Button basic color={etude.active ? "red" : "green"} floated="right">
            <Icon fitted name="power" />
          </Button>
        </Button.Group>
        <Card.Header>{etude.title}</Card.Header>
        <Card.Meta>Last Played {format(diffPlayed, "d") + " days ago."}</Card.Meta>
        <Card.Meta>Created {format(diffCreated, "d") + " days ago."}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon size="big" name="retweet" style={{ marginRight: "10px" }} />
        {etude.executions}
        <Icon size="big" name="history" style={{ marginRight: "10px", marginLeft: "10px" }} />
        {etude.played}
        <Button.Group floated="right">
          <Button basic color="blue" floated="right">
            <Icon fitted name="edit" />
          </Button>
          <Button basic color="violet" floated="right">
            <Icon fitted name="magnify" />
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerEtudeItem);
