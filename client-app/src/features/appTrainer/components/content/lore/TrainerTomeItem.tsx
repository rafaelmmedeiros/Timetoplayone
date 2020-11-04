import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { ITome } from "../../../../../app/models/appTrainer/domain/tome";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerTomeItem: React.FC<{ tome: ITome }> = ({ tome }) => {
  const rootStore = useContext(RootStoreContext);
  const { setTomeUp, setTomeDown, loading, userLore } = rootStore.userLoreStore;
  
  const [targetUp, setTargetUp] = useState<string | undefined>(undefined);
  const [targetDown, setTargetDown] = useState<string | undefined>(undefined);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Card key={tome.id} color="red">
      {/* --------------------- */}
      <Card.Content>
        <Card.Header>{tome.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        {/* UP AND DOWN BUTTONS */}
        <Button.Group>
          {/* UP */}
          {tome.position != 1 && (
            <Button
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
        <Button basic color="red" floated="right">
          <Icon fitted name="trash" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default observer(TrainerTomeItem);
