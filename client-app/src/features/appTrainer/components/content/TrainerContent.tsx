import React from "react";
import { Tab } from "semantic-ui-react";
import TrainerLore from "./lore/TrainerLore";
import TrainerCollection from "./collection/TrainerCollection";
import TrainerPractice from "./practice/TrainerPractice";
import TrainerChapters from "./chapters/TrainerChapters";
import { useMediaQuery } from "react-responsive";

const TrainerContent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  let menu1 = "Grupos";
  let menu2 = "Etudes";
  let menu3 = "Hora de Tocar!";
  let menu4 = "Capítulos";

  if (isMobile) {
    menu1 = "";
    menu2 = "";
    menu3 = "";
    menu4 = "";
  }

  const panes = [
    {
      menuItem: { key: "tomes", content: menu1, icon: "book" },
      render: () => <TrainerLore />,
    },
    {
      menuItem: { key: "etudes", content: menu2, icon: "list alternate" },
      render: () => <TrainerCollection />,
    },
    {
      menuItem: { key: "practice", content: menu3, icon: "pin" },
      render: () => <TrainerPractice />,
    },
    {
      menuItem: { key: "chapters", content: menu4, icon: "chart bar" },
      render: () => <TrainerChapters />,
    },
  ];

  return <Tab panes={panes} />;
};

export default TrainerContent;
