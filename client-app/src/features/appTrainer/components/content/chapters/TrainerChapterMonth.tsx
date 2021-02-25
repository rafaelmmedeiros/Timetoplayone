import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import TrainerChapterMonthItem from "./TrainerChapterMonthItem";

const TrainerChapterMonth: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userChaptersMonth, loadUserChaptersMonth, loadingUserChaptersMonth } = rootStore.userChaptersStore;

  useEffect(() => {
    loadUserChaptersMonth();
  }, [loadUserChaptersMonth]);

  return (
    <Grid>
      {/* LOADING COMPONENT */}
      {loadingUserChaptersMonth && <LoadingComponent content="Loading" />}
      {/* HEADER */}
      <Grid.Column width={16}>
        <Header floated="left" icon="calendar alternate" content={"28 Days Later..."} />
      </Grid.Column>
      {/* BODY */}
      <Grid.Column width={16}>
        {/* CHAPTER WEEK LIST */}
        {userChaptersMonth?.monthChapters.map((weekChapter) => (
          <TrainerChapterMonthItem key={weekChapter.id} weekChapter={weekChapter} />
        ))}
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainerChapterMonth);
