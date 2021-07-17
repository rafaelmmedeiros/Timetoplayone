import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./album/ProfilePhotos";
import ProfileAbout from "./about/ProfileAbout";

const panes = [
  { menuItem: "Album", render: () => <ProfilePhotos /> },
  { menuItem: "Sobre", render: () => <ProfileAbout /> },
];

const ProfileContent = () => {
  return <Tab panes={panes} />;
};

export default ProfileContent;
