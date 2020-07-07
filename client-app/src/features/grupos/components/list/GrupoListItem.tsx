import React from "react";
import { Item, Button, Segment, Icon, Progress } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IGrupo } from "../../../../app/models/grupo";

const GrupoListItem: React.FC<{ grupo: IGrupo }> = ({ grupo }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item>
          <Item.Content>
            <Item.Header as="h2">{grupo.titulo}</Item.Header>
            <Item.Description>
              <div>{grupo.subTitulo}</div>
            </Item.Description>
          </Item.Content>
        </Item>
      </Segment>
      <Segment clearing>
        <Icon size="big" name="gem" style={{ marginRight: "10px" }} />5
        <Icon size="big" name="clock" style={{ marginRight: "10px", marginLeft: "10px" }} />
        60
        <Button as={Link} to={`/grupos/${grupo.id}`} floated="right" content=">>" color="teal" />
      </Segment>
      <Segment>
        <Progress
          /*progress*/
          percent={70}
          indicating
        >
          Dedicação
        </Progress>
      </Segment>
    </Segment.Group>
  );
};

export default GrupoListItem;
