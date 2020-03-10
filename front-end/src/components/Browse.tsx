import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Browse: FC = () => {
  return (
    <Fragment>
      <Link to="/cities" className="nav-link" style={{ fontSize: "1.8rem" }}>
        <p>
          <FaArrowCircleRight /> Browse Cities
        </p>
      </Link>
    </Fragment>
  );
};

export default Browse;
