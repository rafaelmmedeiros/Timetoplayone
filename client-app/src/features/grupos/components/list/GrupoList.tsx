import React, { useContext, Fragment } from "react";
import { Item, Label, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import GrupoListItem from "./GrupoListItem";
import { RootStoreContext } from "../../../../app/stores/rootStore";

const GrupoList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { gruposByLabel } = rootStore.grupoStore;

  return (
    <Fragment>
      {gruposByLabel.map(([group, grupos]) => (
        <Fragment key={group}>
          <Label pointing="right" size="huge" color="black">
            <Icon name="tag"></Icon>
            {group}
          </Label>
          <Item.Group divided>
            {grupos.map(grupo => (
              <GrupoListItem key={grupo.id} grupo={grupo} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(GrupoList);
