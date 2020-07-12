import React, { useContext } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useMediaQuery } from "react-responsive";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <Menu fixed="top" inverted>
      <Container>
        {/* ----DASHBOARD---- */}
        <Menu.Item header as={NavLink} exact to="/dashboard">
          <Icon name="calendar check outline" size="big" />
          {isMobile ? "Go!" : "Dashboard"}
        </Menu.Item>
        {/* ----PROFILE---- */}
        {user && <Menu.Item content={isMobile ? "" : "Profile"} icon="user" as={NavLink} to={`/profile/${user.username}`} />}
        {/* ----TAKING THE ROAD---- */}
        {user && <Menu.Item content={isMobile ? "" : "Taking The Road"} icon="road" as={NavLink} exact to="/grupos" />}
        {/* ----LOGOUT---- */}
        {user && <Menu.Item content={isMobile ? "" : "Logout"} position="right" icon="sign-out" onClick={logout} />}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
