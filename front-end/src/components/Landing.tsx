import React from "react";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const Landing: React.FC = () => {
  return (
    <React.Fragment>
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
      <nav className="pt-3">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/log-in">
              Log in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-account">
              Create Account
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Landing;
