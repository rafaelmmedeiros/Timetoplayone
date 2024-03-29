import React, { useContext } from "react";
import { IEtude } from "../../../../../app/models/appTrainer/domain/etude";
import { observer } from "mobx-react-lite";
import { Card, Button, Icon, Progress, Label } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import { ptBR } from "date-fns/locale";

const TrainerPracticeItem: React.FC<{ etude: IEtude }> = ({ etude }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setEtudeDone,
    loading,
    targetDone,
    setTargetDone,
  } = rootStore.userPracticeStore;

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
      {/* --------------------- */}
      <Card.Content>
        {/* ACTIVATE AND DELETE BUTTONS */}
        <Button.Group floated="right"></Button.Group>
        {/* HEADER */}
        <Card.Header>{etude.title}</Card.Header>
        {/* DATES */}
        <Label
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
          {etude.tome}
        </Label>
        <Label
          color={
            etude.fluence === 1
              ? "yellow"
              : etude.fluence === 2
              ? "olive"
              : etude.fluence === 3
              ? "green"
              : "black"
          }
        >
          {etude.fluence === 1 ? "Ini" : etude.fluence === 2 ? "Evo" : "Flu"}
        </Label>
      </Card.Content>
      {/* --------------------- */}
      <Card.Content>
        {/* TIME */}
        <Icon size="big" name="clock" style={{ marginRight: "10px", paddingTop: "5px" }}>
          {etude.time}
        </Icon>
        {/* DATAILS DONE BUTTONS */}
        <Button.Group floated="right">
          {/* <Button name={etude.id} basic color="violet" floated="right">
            <Icon fitted name="magnify" />
          </Button> */}
          <Button
            name={etude.id}
            basic
            color="green"
            floated="right"
            onClick={(e) => {
              setEtudeDone(etude);
              setTargetDone(e.currentTarget.name);
            }}
            loading={loading && targetDone === etude.id}
          >
            <Icon fitted name="checkmark" />
          </Button>
        </Button.Group>
      </Card.Content>
      {/* --------------------- */}
      <Card.Content extra>
        {neverPlayed ? (
          <Card.Meta>Nunca praticado</Card.Meta>
        ) : (
          <Card.Meta>
            Praticado a {formatDistance(new Date(), etude.lastPlayed, { locale: ptBR })}
          </Card.Meta>
        )}
        <Progress size="tiny" percent={etude.priority} indicating>
          {etude.priority === 100
            ? "Perfeito!"
            : etude.priority >= 80
            ? "Progredindo bem"
            : etude.priority >= 60
            ? "Precisa melhorar"
            : etude.priority >= 40
            ? "Começando a esfriar"
            : etude.priority >= 20
            ? "Esfriando..."
            : "Abandonado"}
        </Progress>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerPracticeItem);
