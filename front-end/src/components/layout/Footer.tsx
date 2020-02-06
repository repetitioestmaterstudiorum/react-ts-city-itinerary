import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="container-fluid mt-4">
    <div className="d-flex justify-content-center">
      <Link to="/">
        <FaHome />
      </Link>
    </div>
    <nav className="pt-3">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/site-notice">
            Site Notice
          </Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
