import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Button, Icon } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { IEtude } from "../../../../../app/models/appTrainer/domain/etude";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerEtudeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  const rootStore = useContext(RootStoreContext);
  const { fluenceLearning, fluenceEvolution, fluenceFlowing, deleteEtude } = rootStore.userCollectionStore;

  var neverPlayed;
  if (etude.created > etude.lastPlayed) neverPlayed = true;

  return (
    <Card key={etude.id} color="red">
      <Card.Content>
        {/* ACTIVATE AND DELETE BUTTONS */}
        <Button.Group floated="right">
          <Button basic color={etude.active ? "red" : "green"} floated="right">
            <Icon fitted name="power" />
          </Button>
          {!etude.active && (
            <Button
              name={etude.id}
              basic
              color="red"
              floated="right"
              onClick={(e) => {
                deleteEtude(etude);
              }}
            >
              <Icon fitted name="trash" />
            </Button>
          )}
        </Button.Group>
        {/* HEADER */}
        <Card.Header>{etude.title}</Card.Header>
        {/* DATES */}
        {neverPlayed ? <Card.Meta>Never Played</Card.Meta> : <Card.Meta>Last Played {formatDistance(new Date(), etude.lastPlayed)}</Card.Meta>}
        <Card.Meta>Created {formatDistance(new Date(), etude.created)}</Card.Meta>
      </Card.Content>

      <Card.Content extra>
        {/* ETUDE FLUENCE LEVEL */}

        <Button.Group fluid>
          <Button
            name={etude.id}
            color={etude.fluence === 1 ? "yellow" : "grey"}
            onClick={(e) => {
              fluenceLearning(etude);
            }}
          >
            Leaning
          </Button>
          <Button.Or text=">>" />
          <Button
            name={etude.id}
            color={etude.fluence === 2 ? "olive" : "grey"}
            onClick={(e) => {
              fluenceEvolution(etude);
            }}
          >
            Evolution
          </Button>
          <Button.Or text=">>" />
          <Button
            name={etude.id}
            color={etude.fluence === 3 ? "green" : "grey"}
            onClick={(e) => {
              fluenceFlowing(etude);
            }}
          >
            Flowing
          </Button>
        </Button.Group>
      </Card.Content>

      <Card.Content extra>
        {/* PLACAR */}
        <Icon size="big" name="retweet" style={{ marginRight: "10px" }} />
        {etude.executions}
        <Icon size="big" name="history" style={{ marginRight: "10px", marginLeft: "10px" }} />
        {etude.played}
        {/* EDIT DATAILS BUTTONS */}
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
