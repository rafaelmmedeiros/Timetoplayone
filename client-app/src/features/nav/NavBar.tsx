import React from 'react'
import { Menu, Container, Icon, Button } from 'semantic-ui-react'

interface IProps {
  openCreateForm: () => void;
}


export const NavBar: React.FC<IProps> = ({
  openCreateForm
}) => {
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
            onClick={openCreateForm}
            positive content='Criar Grupo'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}
