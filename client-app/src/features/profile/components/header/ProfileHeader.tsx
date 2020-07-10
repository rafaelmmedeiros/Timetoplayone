import React from "react";
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from "semantic-ui-react";
import { IProfile } from "../../../../app/models/profile";
import { observer } from "mobx-react-lite";

interface IProps {
  profile: IProfile;
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
  return (
    <Segment>
      <Grid columns={2} stackable>
        <Grid.Column width={10}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.image || "/assets/user.png"} />
              <Item.Content verticalAlign="middle">
                <Header as="h1">{profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={6}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value="20" />
            <Statistic label="Following" value="12" />
          </Statistic.Group>
          <Divider />
          <Reveal animated="move">
            <Reveal.Content visible style={{ width: "100%" }}>
              <Button fluid color="teal" content="Following" />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button fluid basic color={true ? "red" : "green"} content={true ? "Unfollow" : "Follow"} />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
