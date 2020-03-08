import React from 'react'
import { Container, Segment, Header, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Segment
      inverted textAlign='center'
      vertical className='masthead' >
      <Container
        text>
        <Header
          as='h1' inverted>
          <Icon
            name='calendar check outline'>
          </Icon>
          Hora de Tocar
        </Header>
        <Header
          as='h2'
          inverted
          content='Bem-Vindo'
        />
        <Button
          as={Link} to='/grupos'
          size='huge' inverted>
          Começar a tocar!
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage