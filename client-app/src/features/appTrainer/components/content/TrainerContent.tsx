import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerLore from "./lore/TrainerLore";
import TrainerCollection from "./collection/TrainerCollection";
import TrainerPractice from "./practice/TrainerPractice";
import TrainerChapters from "./chapters/TrainerChapters";

//  TODO: Fazer algo melhor aqui
//  Lore / Collection / Practice / Chapters / Dedication

const panes = [
  { menuItem: "Lor", render: () => <TrainerLore /> },
  { menuItem: "Col", render: () => <TrainerCollection /> },
  { menuItem: "Pra", render: () => <TrainerPractice /> },
  { menuItem: "Chp", render: () => <TrainerChapters /> },
  { menuItem: "Ded", render: () => <TrainerPractice /> },
];

const TrainerContent = () => {
  return <Tab panes={panes} />;
};

export default TrainerContent;
