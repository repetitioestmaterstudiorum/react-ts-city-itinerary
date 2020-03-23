import React, { Fragment, FC, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "./Header.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import BackButton from "../BackButton";

const Header: FC = () => {
  let history = useHistory();
  const [currentUser, setToken] = useContext(CurrentUserContext);
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
                onClick={showMenu ? handleHideMenu : handleShowMenu}
              >
                <FaBars />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {history.length > 2 && (
                  <Fragment>
                    <span
                      style={{
                        padding: ".5rem 0 .25rem 0",
                        textAlign: "center"
                      }}
                      onClick={handleHideMenu}
                    >
                      <BackButton />
                    </span>
                    <hr style={{ width: "80%", margin: "0.5rem auto" }}></hr>
                  </Fragment>
                )}
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
                  Browse cities
                </NavLink>
                <hr style={{ width: "80%", margin: "0.5rem auto" }}></hr>
                {currentUser && currentUser.email ? (
                  <Fragment>
                    <NavLink
                      to="/profile"
                      exact
                      onClick={handleHideMenu}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="#"
                      exact
                      onClick={handleLogout}
                      className="dropdown-item"
                      activeClassName=""
                    >
                      Logout
                    </NavLink>
                  </Fragment>
                ) : (
                  <Fragment>
                    <NavLink
                      to="/log-in"
                      exact
                      onClick={handleHideMenu}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      Log in
                    </NavLink>
                    <NavLink
                      to="/create-account"
                      exact
                      onClick={handleHideMenu}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      Create account
                    </NavLink>
                  </Fragment>
                )}
                <hr style={{ width: "80%", margin: "0.5rem auto" }}></hr>
                <NavLink
                  to="/site-notice"
                  exact
                  onClick={handleHideMenu}
                  className="dropdown-item"
                  activeClassName="active"
                >
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
            {currentUser && currentUser.email ? (
              <img
                src={currentUser.profilePicture}
                alt={currentUser.email}
                onClick={handleShowModal}
              ></img>
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
          aria-labelledby="example-modal-sizes-title-sm"
        >
          {currentUser && currentUser.email ? (
            <Fragment>
              <Modal.Header>
                <h3 style={{ margin: "auto" }}>
                  Logged in as:{" "}
                  {currentUser && (
                    <span>
                      {currentUser.firstName + " " + currentUser.lastName}
                    </span>
                  )}
                </h3>
              </Modal.Header>
              <Modal.Body>
                <Link to="/profile">
                  <Button variant="link" onClick={handleHideModal}>
                    My Profile
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="primary" onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              </Modal.Body>
            </Fragment>
          ) : (
            <Fragment>
              <Modal.Header>
                <h3>You are currently logged out.</h3>
              </Modal.Header>
              <Modal.Body>
                <Link to="/log-in">
                  <Button
                    variant="link"
                    onClick={handleHideModal}
                    style={{ marginRight: ".25rem" }}
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/create-account">
                  <Button variant="link" onClick={handleHideModal}>
                    Create Account
                  </Button>
                </Link>
              </Modal.Body>
            </Fragment>
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
