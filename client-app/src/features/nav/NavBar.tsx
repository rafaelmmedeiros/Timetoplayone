import React from 'react'
import { Menu, Container, Icon, Button } from 'semantic-ui-react'

export const NavBar = () => {
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
                    name='Performance'
                />
                <Menu.Item>
                    <Button
                        positive content='Criar Estudo'
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
