import React, { FC, Fragment, useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Profile: FC = () => {
  const { currentUser, setToken } = useContext(CurrentUserContext);
  const [likedItineraries, setLikedItineraries] = useState<Itineraries>();

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
  };

  useEffect(() => {
    if (currentUser) {
      const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;
      try {
        const getLikedItineraries = async () => {
          const res = await axios.get(
            `${backendUrl}itineraries/per-user/${currentUser._id}`
          );
          setLikedItineraries(res.data);
        };
        getLikedItineraries();
      } catch (err) {
        console.log(err);
      }
    }
  }, [currentUser]);

  return (
    <div className="container pt-1 pb-1 text-center">
      <h1>Your profile</h1>
      {currentUser && currentUser.email ? (
        <Fragment>
          <div className="row" style={{ maxWidth: "500px", margin: "auto" }}>
            <div className="col-sm-3 pt-2 pb-1">
              <img
                src={currentUser.profilePicture}
                style={{
                  borderRadius: "50%",
                  border: "1px solid gray",
                  maxWidth: "130px"
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
                      <td className="text-left">
                        {likedItineraries && likedItineraries.length > 0 ? (
                          likedItineraries.map(
                            (itinerary: Itinerary, index: number) => {
                              return (
                                <a
                                  key={index}
                                  href={`cities/${itinerary.city.toLowerCase()}`}
                                >
                                  <span className="d-block">
                                    {itinerary.name}
                                  </span>
                                </a>
                              );
                            }
                          )
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button className="btn btn-primary mb-2" onClick={handleLogout}>
            Log out
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/log-in">
            <Button
              className="mt-2 mb-1"
              variant="link"
              style={{ marginRight: ".25rem" }}
            >
              Log in!
            </Button>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

export default Profile;
