import React, { useContext } from "react";
import { Menu, Container, Icon, Button, Image, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <Icon name="calendar check outline" size="big" />
        </Menu.Item>
        <Menu.Item icon="road" as={NavLink} exact to="/maindashboard" />
        <Dropdown text="Tools" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Study</Dropdown.Header>
            <Dropdown.Item as={NavLink} exact to="/">
              Trainer
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} exact to="/grupos">
              Old
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Band</Dropdown.Header>
            <Dropdown.Item>Manage</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Menu.Item name="Grupos" as={NavLink} exact to="/grupos" />
        <Menu.Item>
          <Button as={NavLink} exact to="/criarGrupo" positive content="Criar Grupo" />
        </Menu.Item> */}
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/${user.username}`} text="Meu Perfil" icon="user" />
                <Dropdown.Item text="Opções" icon="settings" />
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
