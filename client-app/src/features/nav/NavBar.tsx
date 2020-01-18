import React, { useContext } from 'react'
import { Menu, Container, Icon, Button } from 'semantic-ui-react'
import GrupoStore from '../../app/stores/grupoStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
  const grupoStore = useContext(GrupoStore);

  return (
    <Menu fixed="top" inverted >
      <Container>
        <Menu.Item header>
          <Icon
            name='calendar check outline'
            size='big'
            style={{ marginRight: '10px' }}
          />
          Hora de Tocar
                </Menu.Item>
        <Menu.Item
          name='Home'
        />
        <Menu.Item
          name='Treino'
        />
        <Menu.Item
          name='Estudos'
        />
        <Menu.Item
          name='Grupos'
        />
        <Menu.Item
          name='Dedicação'
        />
        <Menu.Item>
          <Button
            onClick={grupoStore.openCreateForm}
            positive content='Criar Grupo'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
