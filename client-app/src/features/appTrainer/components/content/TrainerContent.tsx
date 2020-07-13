import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerStudies from "./studies/TrainerStudies";
import TrainerLore from "./lore/TrainerLore";

const panes = [
  { menuItem: "Lore", render: () => <TrainerLore /> },
  { menuItem: "Studies", render: () => <TrainerStudies /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
