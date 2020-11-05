import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { ITome } from "../../../../../app/models/appTrainer/domain/tome";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerTomeItem: React.FC<{ tome: ITome }> = ({ tome }) => {
  const rootStore = useContext(RootStoreContext);
  const { setTomeUp, setTomeDown, loading, userLore, targetUp, targetDown, setTargetUp, setTargetDown } = rootStore.userLoreStore;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Card key={tome.id} color="red">
      {/* --------------------- */}
      <Card.Content>
        <Card.Header>{tome.title}</Card.Header>
      </Card.Content>
      {/* --------------------- */}
      {tome.totalEtudes > 1 ? (
        <Card.Content>
          <Icon name="list alternate" style={{ marginRight: "5px" }}></Icon>
          {tome.totalEtudes} Etudes
        </Card.Content>
      ) : tome.totalEtudes == 1 ? (
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
          {tome.position != 1 && (
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
          {userLore?.tomes.length != tome.position && (
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
        {/* DELETE */}
        <Button basic color="red" floated="right">
          <Icon fitted name="trash" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerTomeItem);
