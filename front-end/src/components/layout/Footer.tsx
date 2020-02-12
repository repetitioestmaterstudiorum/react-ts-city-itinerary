import React, { useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Footer: React.FC<RouteComponentProps> = props => {
  // RouteComponentProps defines the prop types
  const [isLanding, setIsLanding] = useState(); // like setState, 1st argument: the state, 2nd arugument: the function that will change the state to something (what is in the parameter)
  useEffect(() => {
    setIsLanding(props.location.pathname !== "/"); // setting isLanding to true or false
  }, [props.location.pathname]);

  return (
    <footer className="container-fluid mt-4">
      {isLanding && (
        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "40px" }}
        >
          <Link to="/">
            <FaHome />
          </Link>
        </div>
      )}
      <nav className="pt-3">
        <ul
          className="nav justify-content-center fixed-bottom"
          style={{ backgroundColor: "#efefef" }}
        >
          <li className="nav-item">
            <Link className="nav-link" to="/site-notice">
              Site Notice
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default withRouter(Footer);
