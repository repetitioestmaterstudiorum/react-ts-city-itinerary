import React, { FC, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

const BackButton: FC = () => {
  let history = useHistory();

  return (
    <Fragment>
      <Link
        className="nav-link"
        style={{ padding: "0.5rem" }}
        to="#"
        onClick={() => history.goBack()}
      >
        <FaBackward />
        {" Back"}
      </Link>
    </Fragment>
  );
};

export default BackButton;
