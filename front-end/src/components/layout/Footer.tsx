import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaBalanceScale, FaBackward } from "react-icons/fa";

const Footer: React.FC<RouteComponentProps> = props => {
  // RouteComponentProps defines the prop types
  const [isLanding, setIsLanding] = useState(); // like setState, 1st argument: the state, 2nd arugument: the function that will change the state to something (what is in the parameter)
  useEffect(() => {
    setIsLanding(props.location.pathname !== "/"); // setting isLanding to true or false
  }, [props.location.pathname]);

  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <footer className="container-fluid mt-2 mb-2">
      <div className="d-flex justify-content-center">
        {isLanding && (
          <React.Fragment>
            <Link className="nav-link" to="#" onClick={handleBack}>
              <FaBackward />
              {" Back"}
            </Link>
            <Link className="nav-link" to="/">
              <FaHome />
              {" Home"}
            </Link>
          </React.Fragment>
        )}
        <Link className="nav-link" to="/site-notice">
          <FaBalanceScale />
          {" Legal"}
        </Link>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
