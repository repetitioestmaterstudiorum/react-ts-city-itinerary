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
  </footer>
);

export default Footer;
