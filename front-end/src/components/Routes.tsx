import React, { useEffect, useState } from "react";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";
import Cities from "./Cities";
import Footer from "./layout/Footer";

const Routes: React.FC<RouteComponentProps> = props => {
  const [isLanding, setIsLanding] = useState(); // like setState, 1st argument: the state, 2nd arugument: the function that will change the state to something (what is in the parameter)
  useEffect(() => {
    setIsLanding(props.location.pathname !== "/"); // setting isLanding to true or false
  }, [props.location.pathname]);
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/log-in" component={LogIn} />
      <Route exact path="/cities" component={Cities} />
      {isLanding && <Footer />}
    </React.Fragment>
  );
};

export default withRouter(Routes); // without "withRouter", the component rendering Routes.tsx would need to pass props to Routes.tsx. withRoutes
