import React, { useContext, useState } from "react";
import { IEtude } from "../../../../../app/models/appTrainer/domain/etude";
import { observer } from "mobx-react-lite";
import { Card, Button, Icon, Progress, Label } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerPracticeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  const rootStore = useContext(RootStoreContext);
  const { setEtudeDone, loading } = rootStore.userPracticeStore;
  const [target, setTarget] = useState<string | undefined>(undefined);

  var neverPlayed;
  if (etude.created > etude.lastPlayed) neverPlayed = true;

  return (
    <Card key={etude.id} color="red">
      {/* --------------------- */}
      <Card.Content>
        {/* ACTIVATE AND DELETE BUTTONS */}
        <Button.Group floated="right"></Button.Group>
        {/* HEADER */}
        <Card.Header>{etude.title}</Card.Header>
        {/* DATES */}
        <Label color="red">{etude.tome} </Label>
      </Card.Content>
      {/* --------------------- */}
      <Card.Content extra>
        {/* TIME */}
        <Icon size="big" name="clock" style={{ marginRight: "10px", paddingTop: "5px" }}>
          {etude.time}
        </Icon>
        {/* DATAILS DONE BUTTONS */}
        <Button.Group floated="right">
          <Button name={etude.id} basic color="violet" floated="right">
            <Icon fitted name="magnify" />
          </Button>
          <Button
            name={etude.id}
            basic
            color="green"
            floated="right"
            onClick={(e) => {
              setEtudeDone(etude);
              setTarget(e.currentTarget.name);
            }}
            loading={loading && target === etude.id}
          >
            <Icon fitted name="checkmark" />
          </Button>
        </Button.Group>
      </Card.Content>
      {/* --------------------- */}
      <Card.Content extra>
        {neverPlayed ? <Card.Meta>Never Played</Card.Meta> : <Card.Meta>Last Played {formatDistance(new Date(), etude.lastPlayed)}</Card.Meta>}
        <Progress percent={Math.floor(Math.random() * 101)} indicating>
          Texto aqui...
        </Progress>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerPracticeItem);
