import * as React from "react";
import Logo from "../../img/logo.png";

const Header: React.FC = () => (
  <header className="container-fluid">
    <a href="/">
      <img
        src={Logo}
        className="mx-auto d-block"
        alt="MYtinerary Logo"
        style={{ maxWidth: "250px" }}></img>
    </a>
  </header>
);

export default Header;
