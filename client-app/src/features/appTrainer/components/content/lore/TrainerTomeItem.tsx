import React, { useContext } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { ITome } from "../../../../../app/models/appTrainer/domain/tome";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerTomeItem: React.FC<{ tome: ITome }> = ({ tome }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setTomeUp,
    setTomeDown,
    loading,
    userLore,
    targetUp,
    setTargetUp,
    targetDown,
    setTargetDown,
    targetDelete,
    setTargetDelete,
    targetActivate,
    setTargetActivate,
    deleteTome,
    changeActive,
  } = rootStore.userLoreStore;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Card
      key={tome.id}
      color={
        tome.position === 1
          ? "red"
          : tome.position === 2
          ? "orange"
          : tome.position === 3
          ? "yellow"
          : tome.position === 4
          ? "olive"
          : tome.position === 5
          ? "green"
          : tome.position === 6
          ? "teal"
          : tome.position === 7
          ? "blue"
          : tome.position === 8
          ? "violet"
          : tome.position === 9
          ? "purple"
          : tome.position === 10
          ? "pink"
          : "black"
      }
    >
      {/* --------------------- */}
      <Card.Content>
        <Card.Header>{tome.title}</Card.Header>
      </Card.Content>

      {/* --------------------- */}
      {tome.totalEtudes >= 1 ? (
        <Card.Content>
          <Icon name="list alternate" style={{ marginRight: "5px" }}></Icon>
          {tome.totalEtudes} Etudes
          <Icon name="clock" style={{ marginRight: "5px", marginLeft: "10px" }}></Icon>
          {tome.totalTime} Minutes
        </Card.Content>
      ) : tome.totalEtudes === 0 ? (
        <Card.Content>
          <Icon name="list alternate" style={{ marginRight: "5px" }}></Icon>
          {tome.totalEtudes} Etude
        </Card.Content>
      ) : (
        <Card.Content>
          <Icon name="list alternate outline" style={{ marginRight: "5px" }}></Icon>
          No etudes
        </Card.Content>
      )}

      <Card.Content extra>
        {/* UP AND DOWN BUTTONS */}
        <Button.Group>
          {/* UP */}
          {tome.position !== 1 && (
            <Button
              name={tome.id}
              basic
              color="blue"
              onClick={(e) => {
                setTomeDown(tome);
                setTargetUp(e.currentTarget.name);
              }}
              loading={loading && targetUp === tome.id}
            >
              <Icon fitted name={isMobile ? "arrow up" : "arrow left"} />
            </Button>
          )}
          {/* DOWN */}
          {userLore?.tomes.length !== tome.position && (
            <Button
              name={tome.id}
              basic
              color="blue"
              onClick={(e) => {
                setTomeUp(tome);
                setTargetDown(e.currentTarget.name);
              }}
              loading={loading && targetDown === tome.id}
            >
              <Icon fitted name={isMobile ? "arrow down" : "arrow right"} />
            </Button>
          )}
        </Button.Group>

        {/* DELETE AND ACTIVATE */}
        <Button.Group floated="right">
          <Button
            name={tome.id}
            basic
            color={tome.active ? "red" : "green"}
            floated="right"
            onClick={(e) => {
              changeActive(tome);
              setTargetActivate(e.currentTarget.name);
            }}
            loading={loading && targetActivate === tome.id}
          >
            <Icon fitted name="power" />
          </Button>

          {!tome.active && tome.totalEtudes === 0 && (
            <Button
              name={tome.id}
              basic
              color="red"
              floated="right"
              onClick={(e) => {
                deleteTome(tome);
                setTargetDelete(e.currentTarget.name);
              }}
              loading={loading && targetDelete === tome.id}
            >
              <Icon fitted name="trash" />
            </Button>
          )}
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerTomeItem);
