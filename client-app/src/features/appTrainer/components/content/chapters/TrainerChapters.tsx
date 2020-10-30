import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { IChapter } from "../../../../../app/models/appTrainer/domain/chapter";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import TrainerChaptersItem from "./TrainerChaptersItem";

const TrainerChapters: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userChapters, loadUserChapters, loadingUserChapters } = rootStore.userChaptersStore;

  useEffect(() => {
    loadUserChapters();
  }, [loadUserChapters]);

  return (
    <Tab.Pane>
      <Grid>
        {/* LOADING COMPONENT */}
        {loadingUserChapters && <LoadingComponent content="Loading" />}
        {/* HEADER */}
        <Grid.Column width={16}>
          <Header floated="left" icon="pin" content={"Chapters written."} />
        </Grid.Column>
        {/* BODY */}
        <Grid.Column width={16}>
          {/* CHAPTER LIST */}

          <Card.Group stackable itemsPerRow={1}>


            {userChapters?.chapters.map((chapter, index: number, array: IChapter[] ) => (
              <TrainerChaptersItem key={chapter.id} chapter={chapter} before={array[index+1]} />
            ))}


          </Card.Group>

        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(TrainerChapters);
