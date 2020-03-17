import React, { FC, Fragment, useEffect, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome, FaBalanceScale } from "react-icons/fa";
import BackButton from "../BackButton";

const Footer: FC<RouteComponentProps> = props => {
  // RouteComponentProps defines the prop types
  const [isLanding, setIsLanding] = useState<boolean>();

  useEffect(() => {
    setIsLanding(props.location.pathname !== "/"); // setting isLanding to true or false
  }, [props.location.pathname]);

  return (
    <footer className="container-fluid mt-2 mb-2">
      <div className="d-flex justify-content-center">
        <BackButton />
        {isLanding && (
          <Fragment>
            <Link className="nav-link" style={{ padding: "0.5rem" }} to="/">
              <FaHome />
              {" Home"}
            </Link>
          </Fragment>
        )}
        <Link
          className="nav-link"
          style={{ padding: "0.5rem" }}
          to="/site-notice"
        >
          <FaBalanceScale />
          {" Site Notice"}
        </Link>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
