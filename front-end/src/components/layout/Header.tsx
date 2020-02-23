import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./Header.css";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideModal = () => setShowModal(false);
  // eslint-disable-next-line
  const handleShowModal = () => (setShowModal(true), setShowMenu(false));

  const handleHideMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  return (
    <header className="sticky-top">
      <div className="container">
        <div className="navbar d-flex justify-content-space-between navbar-dark">
          <div className="menu">
            <Dropdown show={showMenu}>
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                onClick={showMenu ? handleHideMenu : handleShowMenu}
              >
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <NavLink
                  to="/"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/cities"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active"
                >
                  Cities
                </NavLink>{" "}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="logo">
            <Link to="/">
              <span className="title">MYtinerary</span>
            </Link>
          </div>
          <div className="profile">
            <FaUserCircle onClick={handleShowModal} />
          </div>
        </div>

        <Modal
          size="sm"
          show={showModal}
          dialogClassName="modalStyle"
          onHide={handleHideModal}
          animation={false}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <h3>Come on in!</h3>
          </Modal.Header>
          <Modal.Body>
            <Link to="/log-in">
              <Button
                variant="primary"
                onClick={handleHideModal}
                style={{ marginRight: ".25rem" }}
              >
                Log in
              </Button>
            </Link>
            <Link to="/create-account">
              <Button variant="primary" onClick={handleHideModal}>
                Create Account
              </Button>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
