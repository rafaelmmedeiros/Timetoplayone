import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage = () => {
  //  PROPS
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Icon name="calendar check outline"></Icon>
          Hora de Tocar
        </Header>

        {isLoggedIn && user ? (
          <Fragment>
            <Image size="small" circular centered src={user.image || "/assets/user.png"} />
            <Header inverted as="h2" content={`${user.displayName} , inspirado hoje?`} />
            <Button as={Link} to="/grupos" size="huge">
              Chega de moleza!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Seja bem-vindo!" />
            <Button onClick={() => openModal(<LoginForm />)} size="huge">
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Registrar
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
