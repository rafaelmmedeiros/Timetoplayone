import React, { useContext } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/maindashboard">
          <Icon name="calendar check outline" size="big" />
          Dashboard
        </Menu.Item>
        {user && <Menu.Item icon="user" as={NavLink} to={`/profile/${user.username}`} />}
        {user && <Menu.Item icon="road" as={NavLink} exact to="/takingtheroad" />}
        {user && <Menu.Item position="right" icon="sign-out" onClick={logout} />}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
