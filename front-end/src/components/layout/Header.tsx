import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./Header.css";
import { Modal, Button } from "react-bootstrap";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<any>(false); // remove any and define a type
  const handleClose = () => setShowModal(false);

  return (
    <header className="container-fluid">
      <div className="navbar fixed-top navbar-dark bg-white">
        <div className="pl-1">
          <FaBars />
        </div>
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              className="mx-auto d-block"
              alt="MYtinerary Logo"
              style={{ maxWidth: "150px" }}></img>
          </Link>
        </div>
        <div className="pr-1">
          <FaUserCircle onClick={() => setShowModal(true)} />
        </div>
      </div>

      <Modal
        size="sm"
        show={showModal}
        dialogClassName="modalStyle"
        onHide={() => setShowModal(false)}
        animation={false}
        aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Body>
          <Link to="/log-in">
            <Button
              variant="primary"
              onClick={handleClose}
              style={{ marginRight: ".25rem" }}>
              Log in
            </Button>
          </Link>
          <Link to="/create-account">
            <Button variant="primary" onClick={handleClose}>
              Create Account
            </Button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
