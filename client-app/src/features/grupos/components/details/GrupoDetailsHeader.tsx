import React from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IGrupo } from '../../../../app/models/grupo';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

const grupoImageStyle = {
  filter: 'brightness(50%)'
};

const grupoImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const GrupoDetailsHeader: React.FC<{ grupo: IGrupo }> = ({
  grupo
}) => {

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/gruposimages/default.jpg`}
          fluid
          style={grupoImageStyle}
        />
        <Segment
          basic
          style={grupoImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={grupo.titulo}
                  style={{ color: 'white' }}
                />
                <p>{grupo.subTitulo}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment>
        <Item>
          <Item.Description>
            {grupo.descricao}
          </Item.Description>
        </Item>
      </Segment>
      <Segment
        clearing
        attached='bottom'>
        <Button
          as={Link} 
          to={`/editgrupo/${grupo.id}`}
          color='grey'
          floated='left'>
          Editar Grupo
        </Button>
        <Button
          color='orange'
          floated='right'>
          Excluir Grupo
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default observer (GrupoDetailsHeader);
