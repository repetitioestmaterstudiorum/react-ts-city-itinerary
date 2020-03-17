import React, { FC, Fragment, useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Profile: FC = () => {
  const [currentUser] = useContext(CurrentUserContext);
  const [likedItineraries] = useState<Itineraries>();

  console.log("currentUser", currentUser);

  return (
    <div className="container pt-1 pb-1 text-center">
      <h1>Your profile</h1>
      {currentUser && currentUser.email ? (
        <div className="row" style={{ maxWidth: "500px", margin: "auto" }}>
          <div className="col-sm-3 pt-2 pb-1">
            <img
              src={currentUser.profilePicture}
              style={{
                borderRadius: "50%",
                border: "1px solid gray",
                maxWidth: "70px"
              }}
              alt={currentUser.email}
            ></img>
          </div>
          <div className="col-sm-9">
            <div>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="text-right">Email: </td>
                    <td className="text-left">{currentUser.email}</td>
                  </tr>
                  <tr>
                    <td className="text-right">Name: </td>
                    <td className="text-left">
                      {currentUser.firstName} {currentUser.lastName}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Liked Itineraries: </td>
                    <td className="text-left">{likedItineraries}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <Link to="/log-in">
            <Button variant="link" style={{ marginRight: ".25rem" }}>
              Log in!
            </Button>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
