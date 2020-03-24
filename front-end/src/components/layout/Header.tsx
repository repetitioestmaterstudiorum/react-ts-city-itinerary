import React, { Fragment, FC, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Modal, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Header.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import BackButton from "../BackButton";

const Header: FC = () => {
  let history = useHistory();
  const [currentUser, setToken] = useContext(CurrentUserContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    handleHideModal();
  };

  return (
    <header className="sticky-top mb-1">
      <div className="container">
        <div className="navbar d-flex justify-content-space-between navbar-dark">
          <div className="menu">
            <DropdownButton id="dropdown-item-button" title={<FaBars />}>
              {history.length > 2 && (
                <Fragment>
                  <span
                    style={{
                      padding: ".5rem 0 .25rem 0",
                      textAlign: "center"
                    }}
                  >
                    <BackButton />
                  </span>
                  <hr style={hrStyle}></hr>
                </Fragment>
              )}
              <NavLink to="/" exact>
                <Dropdown.Item as="button">Home</Dropdown.Item>
              </NavLink>
              <NavLink to="/cities" exact>
                <Dropdown.Item as="button">Browse cities</Dropdown.Item>
              </NavLink>
              <hr style={hrStyle}></hr>
              {currentUser && currentUser.email ? (
                <Fragment>
                  <NavLink to="/profile" exact>
                    <Dropdown.Item as="button">My Profile</Dropdown.Item>
                  </NavLink>
                  <Link to="#" onClick={handleLogout}>
                    <Dropdown.Item as="button">Logout</Dropdown.Item>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink to="/log-in" exact>
                    <Dropdown.Item as="button">Log in</Dropdown.Item>
                  </NavLink>
                  <NavLink to="/create-account" exact>
                    <Dropdown.Item as="button">Create account</Dropdown.Item>
                  </NavLink>
                </Fragment>
              )}
              <hr style={hrStyle}></hr>
              <NavLink to="/site-notice" exact>
                <Dropdown.Item as="button">Site Notice</Dropdown.Item>
              </NavLink>
            </DropdownButton>
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

const hrStyle = {
  width: "80%",
  margin: "0.5rem auto"
};

export default Header;
