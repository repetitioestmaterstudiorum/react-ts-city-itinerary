import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import Browse from "./components/Browse";
import Header from "./components/layout/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/log-in" component={LogIn}>
          <LogIn />
        </Route>
        <Route path="/create-account" component={CreateAccount}>
          <CreateAccount />
        </Route>
        <Route path="/browse" component={Browse}>
          <Browse />
        </Route>
        <Route path="/" exact={true} component={Landing}>
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
