import React from "react";
import HomeIcon from "../../img/homeIcon.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="container-fluid mt-3">
    <Link to="/">
      <img
        src={HomeIcon}
        className="mx-auto d-block"
        alt="Back to Home"
        style={{ maxWidth: "20px" }}></img>
    </Link>
  </footer>
);

export default Footer;
