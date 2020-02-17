import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Landing: React.FC = () => {
  return (
    <section className="container pt-4">
      <div className="text-center">
        <h1>City Itinerary</h1>
        <span className="fancySpan" style={{ fontSize: "1.3rem" }}>
          Find your perfect trip, designed by insiders who know and love their
          cities!
        </span>
        <Link to="/cities" className="nav-link" style={{ fontSize: "1.8rem" }}>
          <p>
            <FaArrowCircleRight /> Browse Cities
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
