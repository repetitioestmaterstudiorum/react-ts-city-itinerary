import React, { useEffect } from "react";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import Landing from "./Landing";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";
import Browse from "./Browse";
import Footer from "./layout/Footer";
const Routes: React.FC<RouteComponentProps> = props => {
  console.log("props", props.location.pathname);
  const location = props.location.pathname;
  const [isLanding, setIsLanding] = React.useState();
  useEffect(() => {
    let test = location !== "/";
    setIsLanding(test);
  });
  return (
    <React.Fragment>
      <Route exact path="/" component={Landing} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Route exact path="/log-in" component={LogIn} />
      <Route exact path="/browse" component={Browse} />
      {/* <Route exact path="/" render={() => isLanding && <Footer />} /> */}
      {/* {isLanding && <Route exact path="/" component={Footer} />} */}
      {isLanding && <Footer />}
      {console.log(isLanding)}
    </React.Fragment>
  );
};

export default withRouter(Routes);
