import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerRepertoire from "./repertoire/TrainerRepertoire";
import TrainerStudies from "./studies/TrainerStudies";

const panes = [
  { menuItem: "Repertoires", render: () => <TrainerRepertoire /> },
  { menuItem: "Studies", render: () => <TrainerStudies /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
