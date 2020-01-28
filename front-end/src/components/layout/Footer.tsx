import React from "react";
import HomeIcon from "../../img/homeIcon.png";

const Footer: React.FC = () => (
  <footer className="container-fluid">
    <a href="/">
      <img
        src={HomeIcon}
        className="mx-auto d-block"
        alt="Back to Home"
        style={{ maxWidth: "50px" }}></img>
    </a>
  </footer>
);

export default Footer;
