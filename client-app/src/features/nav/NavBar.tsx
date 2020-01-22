import React from 'react'
import { Menu, Container, Icon, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {

  return (
    <Menu fixed="top" inverted >
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <Icon
            name='calendar check outline'
            size='big'
            style={{ marginRight: '10px' }}
          />
          Hora de Tocar
        </Menu.Item>
        <Menu.Item
          name='Treino'
        />
        <Menu.Item
          name='Estudos'
        />
        <Menu.Item
          name='Grupos'
          as={NavLink} exact to='/grupos'
        />
        <Menu.Item
          name='Dedicação'
        />
        <Menu.Item>
          <Button
            as={NavLink} exact to='/criarGrupo'
            positive content='Criar Grupo'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
