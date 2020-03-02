import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Browse: React.FC = () => {
  return (
    <React.Fragment>
      <Link to="/cities" className="nav-link" style={{ fontSize: "1.8rem" }}>
        <p>
          <FaArrowCircleRight /> Browse Cities
        </p>
      </Link>
    </React.Fragment>
  );
};

export default Browse;
