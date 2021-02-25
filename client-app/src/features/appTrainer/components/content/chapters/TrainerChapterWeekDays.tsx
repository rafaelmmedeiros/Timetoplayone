import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../../../app/stores/rootStore";
import TrainerChapterWeekDaysItem from "./TrainerChapterWeekDaysItem";

const TrainerChapterWeekDays: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { userChaptersWeek, loadUserChaptersWeek, loadingUserChaptersWeek } = rootStore.userChaptersStore;

  useEffect(() => {
    loadUserChaptersWeek();
  }, [loadUserChaptersWeek]);

  return (
    <Grid>
      {/* LOADING COMPONENT */}
      {loadingUserChaptersWeek && <LoadingComponent content="Loading" />}
      {/* BODY */}
      <Grid.Column width={16}>
        {/* CHAPTER WEEK LIST */}
        {userChaptersWeek?.weekChapters.map((chapter) => (
          <TrainerChapterWeekDaysItem key={chapter.id} chapter={chapter} />
        ))}
      </Grid.Column>
    </Grid>
  );
};

export default observer(TrainerChapterWeekDays);
