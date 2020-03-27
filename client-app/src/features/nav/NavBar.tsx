import React, { useContext } from "react";
import {
  Menu,
  Container,
  Icon,
  Button,
  Image,
  Dropdown
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  //  PROPS
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <Icon
            name="calendar check outline"
            size="big"
            style={{ marginRight: "10px" }}
          />
          Hora de Tocar
        </Menu.Item>
        <Menu.Item name="Treino" />
        <Menu.Item name="Estudos" />
        <Menu.Item name="Grupos" as={NavLink} exact to="/grupos" />
        <Menu.Item name="Dedicação" />
        <Menu.Item>
          <Button
            as={NavLink}
            exact
            to="/criarGrupo"
            positive
            content="Criar Grupo"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
