import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import Browse from "./components/Browse";
import Header from "./components/layout/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact={true} component={Landing} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/log-in" component={LogIn} />
      <Route path="/browse" component={Browse} />
    </Router>
  );
};

export default App;
