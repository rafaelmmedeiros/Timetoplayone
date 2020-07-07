import React from "react";
import { Tab } from "semantic-ui-react";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
  { menuItem: "Album", render: () => <Tab.Pane>Album Content</Tab.Pane> },
]

const ProfileContent = () => {
  return <Tab panes={panes} />
}

export default ProfileContent;
