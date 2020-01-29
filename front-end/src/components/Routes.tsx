import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";
import Browse from "./Browse";
import Footer from "./layout/Footer";

const Routes: React.FC<RoutesProps> = ({ isLanding }) => {
  console.log(isLanding);
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/log-in" component={LogIn} />
      <Route exact path="/browse" component={Browse} />
      {isLanding && <Footer />}
    </React.Fragment>
  );
};

export default Routes;
