import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Landing: React.FC = () => {
  return (
    <section className="conatiner pt-4">
      <div className="text-center">
        <h1>City Itinerary</h1>
        <p>
          Find your perfect trip, designed by insiders who know and love their
          cities
        </p>
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
