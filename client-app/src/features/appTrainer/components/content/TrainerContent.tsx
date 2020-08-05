import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerLore from "./lore/TrainerLore";
import TrainerCollection from "./collection/TrainerCollection";
import TrainerPractice from "./practice/TrainerPractice";

const panes = [
  { menuItem: "Lore", render: () => <TrainerLore /> },
  { menuItem: "Collection", render: () => <TrainerCollection /> },
  { menuItem: "Practice", render: () => <TrainerPractice /> },
  // { menuItem: "Chapters", render: () => <TrainerPractice /> },
  // { menuItem: "Dedication", render: () => <TrainerPractice /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
