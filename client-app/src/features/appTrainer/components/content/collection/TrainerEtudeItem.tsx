import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Button, Icon } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { IEtude } from "../../../../../app/models/appTrainer/domain/etude";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { ptBR } from "date-fns/locale";

const TrainerEtudeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    fluenceLearning,
    fluenceEvolution,
    fluenceFlowing,
    deleteEtude,
    changeActive,
    loading,
    targetLearning,
    setTargetLearning,
    targetEvolution,
    setTargetEvolution,
    targetFlowing,
    setTargetFlowing,
    targetDelete,
    setTargetDelete,
    targetActivate,
    setTargetActivate,
  } = rootStore.userCollectionStore;

  var neverPlayed;
  if (etude.created > etude.lastPlayed) neverPlayed = true;

  return (
    <Card
      key={etude.id}
      color={
        etude.tomePosition === 1
          ? "red"
          : etude.tomePosition === 2
          ? "orange"
          : etude.tomePosition === 3
          ? "yellow"
          : etude.tomePosition === 4
          ? "olive"
          : etude.tomePosition === 5
          ? "green"
          : etude.tomePosition === 6
          ? "teal"
          : etude.tomePosition === 7
          ? "blue"
          : etude.tomePosition === 8
          ? "violet"
          : etude.tomePosition === 9
          ? "purple"
          : etude.tomePosition === 10
          ? "pink"
          : "black"
      }
    >
      <Card.Content>
        {/* EDIT DATAILS BUTTONS */}
        {/* <Button.Group floated="right">
          <Button basic color="blue" floated="right">
            <Icon fitted name="edit" />
          </Button>
          <Button basic color="violet" floated="right">
            <Icon fitted name="magnify" />
          </Button>
        </Button.Group> */}

        {/* HEADER */}
        <Card.Header>{etude.title}</Card.Header>
        {/* DATES */}
        {neverPlayed ? (
          <Card.Meta>Nunca praticado</Card.Meta>
        ) : (
          <Card.Meta>
            Praticado a {formatDistance(new Date(), etude.lastPlayed, { locale: ptBR })}
          </Card.Meta>
        )}
        <Card.Meta>
          Criado a {formatDistance(new Date(), etude.created, { locale: ptBR })}
        </Card.Meta>
      </Card.Content>

      <Card.Content extra>
        {/* ETUDE FLUENCE LEVEL */}

        <Button.Group fluid>
          <Button
            name={etude.id}
            color={etude.fluence === 1 ? "yellow" : "grey"}
            onClick={(e) => {
              fluenceLearning(etude);
              setTargetLearning(e.currentTarget.name);
            }}
            loading={loading && targetLearning === etude.id}
          >
            Inicio
          </Button>
          <Button.Or text=">>" />
          <Button
            name={etude.id}
            color={etude.fluence === 2 ? "olive" : "grey"}
            onClick={(e) => {
              fluenceEvolution(etude);
              setTargetEvolution(e.currentTarget.name);
            }}
            loading={loading && targetEvolution === etude.id}
          >
            Evoluindo
          </Button>
          <Button.Or text=">>" />
          <Button
            name={etude.id}
            color={etude.fluence === 3 ? "green" : "grey"}
            onClick={(e) => {
              fluenceFlowing(etude);
              setTargetFlowing(e.currentTarget.name);
            }}
            loading={loading && targetFlowing === etude.id}
          >
            Fluente
          </Button>
        </Button.Group>
      </Card.Content>

      <Card.Content extra>
        {/* PLACAR */}
        <Icon size="big" name="retweet" style={{ marginRight: "10px" }} />
        {etude.executions}
        <Icon
          size="big"
          name="history"
          style={{ marginRight: "10px", marginLeft: "10px" }}
        />
        {etude.played}

        {/* ACTIVATE AND DELETE BUTTONS */}
        <Button.Group floated="right">
          <Button
            name={etude.id}
            basic
            color={etude.active ? "red" : "green"}
            floated="right"
            onClick={(e) => {
              changeActive(etude);
              setTargetActivate(e.currentTarget.name);
            }}
            loading={loading && targetActivate === etude.id}
          >
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
                setTargetDelete(e.currentTarget.name);
              }}
              loading={loading && targetDelete === etude.id}
            >
              <Icon fitted name="trash" />
            </Button>
          )}
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerEtudeItem);
