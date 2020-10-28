import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";
import { RootStoreContext } from "../../../../../app/stores/rootStore";

const TrainerChaptersItem: React.FC<{ chapter: IChapter }> = ({ chapter }) => {
  const rootStore = useContext(RootStoreContext);
  const { loading } = rootStore.userChaptersStore;

  return (
    <Card key={chapter.id} color="red">

      {/* --------------------- */}
      <Card.Content>
        {/* HEADER */}
        <Card.Header>{chapter.day}</Card.Header>
      </Card.Content>

      {/* --------------------- */}
      <Card.Content extra>
      </Card.Content>

      {/* --------------------- */}
      <Card.Content extra>
      </Card.Content>

    </Card>
  );
};

export default observer(TrainerChaptersItem);
