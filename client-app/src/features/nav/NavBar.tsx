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
                    name='Grupos'
                />
                <Menu.Item
                    name='Dedicação'
                />
                <Menu.Item>
                    <Button
                        positive content='Criar Estudo'
                    />
                </Menu.Item>
                <Menu.Item>
                    <Button
                        positive content='Criar Grupo'
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
