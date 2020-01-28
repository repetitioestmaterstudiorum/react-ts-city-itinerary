import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import CircleRight from "../img/circleRight.png";

const Landing: React.FC = () => {
  return (
    <Router>
      <section className="conatiner pt-5">
        <div className="text-center">
          <p>
            Find your perfect trip, designed by insiders who know and love their
            cities
          </p>
          <h2>Start browsing</h2>
          <img src={CircleRight} style={{ maxWidth: "40px" }}></img>
        </div>
      </section>
      <nav className="pt-4">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link" to="/LogIn">
              Log in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/CreateAccount">
              Create Account
            </Link>
          </li>
        </ul>
      </nav>
    </Router>
  );
};

export default Landing;
