import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import { observer } from "mobx-react-lite";
import GrupoDashboard from "../../features/grupos/GrupoDashboard";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import GrupoForm from "../../features/grupos/components/GrupoForm";
import GrupoDetails from "../../features/grupos/components/details/GrupoDetails";
import NotFound from "./errors/NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../modals/ModalContainer";
import ProfilePage from "../../features/profile/ProfilePage";
import TakingTheRoad from "../../features/takingTheRoad/TakingTheRoad";
import Dashboard from "../../features/dashboard/Dashboard";
import AppTrainer from "../../features/appTrainer/AppTrainer";
import PrivateRoute from "./PrivateRoute";
import TrainerCreateEtudeForm from "../../features/appTrainer/components/content/collection/TrainerCreateEtudeForm";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-center" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                {/* --NAVBAR-- */}
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile/:username" component={ProfilePage} />
                <PrivateRoute exact path="/takingtheroad" component={TakingTheRoad} />
                {/* --DASHBOARD-- */}
                <PrivateRoute path="/dashboard/trainer" component={AppTrainer} />
                {/* --APPTRAINER-- */}
                <Route key={location.key} path={["/criaretude", "/editetude/:id"]} component={TrainerCreateEtudeForm} />
                
                {/* --DELETAR PROVAVEL-- */}
                <Route exact path="/grupos" component={GrupoDashboard} />
                <Route path="/grupos/:id" component={GrupoDetails} />
                <Route key={location.key} path={["/criargrupo", "/editgrupo/:id"]} component={GrupoForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
