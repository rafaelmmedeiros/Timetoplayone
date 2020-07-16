import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerLore from "./lore/TrainerLore";
import TrainerCollection from "./collection/TrainerCollection";

const panes = [
  { menuItem: "Lore", render: () => <TrainerLore /> },
  { menuItem: "Collection", render: () => <TrainerCollection /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
