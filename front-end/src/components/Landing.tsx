import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Landing: React.FC = () => {
  return (
    <section className="conatiner pt-4">
      <div className="text-center">
        <p>
          Find your perfect trip, designed by insiders who know and love their
          cities
        </p>
        <h2>Browse Cities</h2>
        <Link to="/cities">
          <FaArrowCircleRight />
        </Link>
      </div>
    </section>
  );
};

export default Landing;
