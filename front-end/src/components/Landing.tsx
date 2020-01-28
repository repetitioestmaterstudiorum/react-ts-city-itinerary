import React from "react";
import { Link } from "react-router-dom";
import CircleRight from "../img/circleRight.png";

const Landing: React.FC = () => {
    return (
        <React.Fragment>
            <section className="conatiner pt-5">
                <div className="text-center">
                    <p>
                        Find your perfect trip, designed by insiders who know
                        and love their cities
                    </p>
                    <h2>Start browsing</h2>
                    <Link to="/browse">
                        <img
                            src={CircleRight}
                            style={{ maxWidth: "40px" }}
                            alt="Start browsing"
                        ></img>
                    </Link>
                </div>
            </section>
            <nav className="pt-4">
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
