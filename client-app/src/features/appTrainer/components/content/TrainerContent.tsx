import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerLore from "./lore/TrainerLore";
import TrainerCollection from "./collection/TrainerCollection";
import TrainerPractice from "./practice/TrainerPractice";
import TrainerChapters from "./chapters/TrainerChapters";

const panes = [
  { menuItem: "Tom", render: () => <TrainerLore /> },
  { menuItem: "Etu", render: () => <TrainerCollection /> },
  { menuItem: "Play!", render: () => <TrainerPractice /> },
  { menuItem: "Cha", render: () => <TrainerChapters /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
