import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
  { menuItem: "Album", render: () => <ProfilePhotos /> },
];

const ProfileContent = () => {
  return <Tab panes={panes} />;
};

export default ProfileContent;
