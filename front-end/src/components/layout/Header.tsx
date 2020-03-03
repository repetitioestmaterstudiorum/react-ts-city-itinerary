import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./Header.css";
import { UserContext } from "../../context/UserContext";

const Header: React.FC = () => {
  const [user, setToken] = useContext(UserContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleHideModal = () => setShowModal(false);
  // eslint-disable-next-line
  const handleShowModal = () => (setShowModal(true), setShowMenu(false));

  const handleHideMenu = () => setShowMenu(false);
  const handleShowMenu = () => setShowMenu(true);

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    handleHideMenu();
    handleHideModal();
  };

  return (
    <header className="sticky-top mb-1">
      <div className="container">
        <div className="navbar d-flex justify-content-space-between navbar-dark">
          <div className="menu">
            <Dropdown show={showMenu}>
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                onClick={showMenu ? handleHideMenu : handleShowMenu}>
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <NavLink
                  to="/"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active">
                  Home
                </NavLink>
                <NavLink
                  to="/cities"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active">
                  Browse cities
                </NavLink>
                <hr style={{ width: "80%", margin: "0.5rem auto" }}></hr>
                {user && user.email ? (
                  <NavLink
                    to="/"
                    exact
                    onClick={handleLogout}
                    className="dropdown-item"
                    activeClassName="">
                    Logout
                  </NavLink>
                ) : (
                  <React.Fragment>
                    <NavLink
                      to="/log-in"
                      exact
                      onClick={handleHideMenu}
                      className="dropdown-item"
                      activeClassName="active">
                      Log in
                    </NavLink>
                    <NavLink
                      to="/create-account"
                      exact
                      onClick={handleHideMenu}
                      className="dropdown-item"
                      activeClassName="active">
                      Create account
                    </NavLink>
                  </React.Fragment>
                )}
                <hr style={{ width: "80%", margin: "0.5rem auto" }}></hr>
                <NavLink
                  to="/site-notice"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active">
                  Site Notice
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
            {user && user.email ? (
              <img
                src={user.profilePicture}
                alt={user.email}
                onClick={handleShowModal}></img>
            ) : (
              <FaUserCircle onClick={handleShowModal} />
            )}
          </div>
        </div>

        <Modal
          size="sm"
          show={showModal}
          dialogClassName="modalStyle"
          onHide={handleHideModal}
          animation={false}
          aria-labelledby="example-modal-sizes-title-sm">
          {user && user.email ? (
            <React.Fragment>
              <Modal.Header>
                <h3>You are currently logged in as {user && user.email}</h3>
              </Modal.Header>
              <Modal.Body>
                <Link to="/">
                  <Button variant="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              </Modal.Body>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Modal.Header>
                <h3>You are currently logged out.</h3>
              </Modal.Header>
              <Modal.Body>
                <Link to="/log-in">
                  <Button
                    variant="primary"
                    onClick={handleHideModal}
                    style={{ marginRight: ".25rem" }}>
                    Log in
                  </Button>
                </Link>
                <Link to="/create-account">
                  <Button variant="primary" onClick={handleHideModal}>
                    Create Account
                  </Button>
                </Link>
              </Modal.Body>
            </React.Fragment>
          )}
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
