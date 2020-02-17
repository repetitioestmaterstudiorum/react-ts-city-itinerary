import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./Header.css";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<any>(false); // remove any and define a type
  const handleClose = () => setShowModal(false);

  return (
    <header className="sticky-top">
      <div className="container">
        <div className="navbar d-flex justify-content-space-between navbar-dark">
          <div className="menu">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <NavLink
                  to="/cities"
                  className="dropdown-item"
                  activeClassName="active">
                  Cities
                </NavLink>{" "}
                <NavLink
                  to="/test"
                  className="dropdown-item"
                  activeClassName="active">
                  Test
                </NavLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="logo">
            <Link to="/">
              <span className="title">MYtinerary</span>
            </Link>
          </div>
          <div className="profile">
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
          <Modal.Header>
            <h3>Come on in!</h3>
          </Modal.Header>
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
      </div>
    </header>
  );
};

export default Header;
