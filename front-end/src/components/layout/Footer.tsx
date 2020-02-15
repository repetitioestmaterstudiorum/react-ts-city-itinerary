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
    <footer className="container-fluid mt-3">
      <hr />
      <div className="d-flex justify-content-center">
        <Link className="nav-link" to="#" onClick={handleBack}>
          <FaBackward />
          {" Back"}
        </Link>
        {isLanding && (
          <Link className="nav-link" to="/">
            <FaHome />
            {" Home"}
          </Link>
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
