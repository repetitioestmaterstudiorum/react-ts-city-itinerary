import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../../img/homeIcon.png";

const Footer: React.FC = () => (
  <footer className="container-fluid mt-2">
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
