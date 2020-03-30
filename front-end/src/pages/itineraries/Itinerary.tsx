import React, { FC, Fragment, useContext, useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaRegCheckSquare, FaThumbsUp } from "react-icons/fa";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

type ItineraryProps = {
  itinerary: Itinerary;
  randomColor: string;
};

const Itinerary: FC<ItineraryProps> = props => {
  const [currentUser] = useContext(CurrentUserContext);
  const [userLikesCurrentItinerary, setUserLikesCurrentItinerary] = useState<
    boolean
  >();
  const [itineraryLikes, setItineraryLikes] = useState<number>(0);

  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  useEffect(() => {
    setItineraryLikes(props.itinerary.likes); // set initial load likes
    if (
      currentUser &&
      currentUser.likedItineraries.includes(props.itinerary._id)
    ) {
      setUserLikesCurrentItinerary(true); // check if current user likes current itinerary
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleLikeClick = () => {
    setUserLikesCurrentItinerary(true);
    setItineraryLikes(itineraryLikes + 1);
    try {
      const addLike = () => {
        axios.put(`${backendUrl}itineraries/increase-likes`, {
          itineraryID: props.itinerary._id
        });
        axios.put(`${backendUrl}users/add-liked-itinerary`, {
          userID: currentUser._id,
          itineraryID: props.itinerary._id
        });
      };
      addLike();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislikeClick = () => {
    setUserLikesCurrentItinerary(false);
    setItineraryLikes(itineraryLikes - 1);
    try {
      const removeLike = () => {
        axios.put(`${backendUrl}itineraries/decrease-likes`, {
          itineraryID: props.itinerary._id
        });
        axios.put(`${backendUrl}users/remove-liked-itinerary`, {
          userID: currentUser._id,
          itineraryID: props.itinerary._id
        });
      };
      removeLike();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div
        className="row"
        style={{
          border: "0",
          borderBottom: "34px solid #fff",
          boxShadow: "2px 2px 7px #777",
          borderRadius: "5px",
          margin: "0 0 13px 0",
          backgroundImage: `linear-gradient(#${props.randomColor}20, white)`
        }}
      >
        <div
          className="col-5 pt-2 pb-1"
          style={{
            backgroundColor: "#fff",
            borderRadius: "5px 0 5px 0",
            opacity: "0.9"
          }}
        >
          <img
            src={props.itinerary.profilePicture}
            style={{
              borderRadius: "50%",
              maxWidth: "40px",
              marginRight: "5px"
            }}
            alt="Profilepicture of Itinerary Creator"
          ></img>
          <span style={{ display: "block" }}>
            {props.itinerary.profileName}
          </span>
        </div>
        <div className="col-7 pt-2" style={{ textAlign: "left" }}>
          <span
            className="fancySpan pt-1 pb-1"
            style={{ display: "block", marginTop: "1px" }}
          >
            {props.itinerary.name}
          </span>
          <span
            style={{
              color: "#151515",
              display: "block"
            }}
          >
            Likes: {itineraryLikes}
          </span>
        </div>
        <Accordion style={{ width: "100%" }}>
          <Card
            style={{
              overflow: "initial",
              border: "none",
              borderRadius: "none",
              padding: "0 0.5rem 0",
              backgroundColor: "unset"
            }}
          >
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ padding: ".6rem" }}>
                <span
                  style={{
                    color: "#151515",
                    fontStyle: "italic",
                    display: "block"
                  }}
                  className="pt-2"
                >
                  {props.itinerary.hashtags.map((hashtag, index) => (
                    <span key={index} style={{ fontStyle: "italic" }}>
                      #{hashtag}{" "}
                    </span>
                  ))}
                </span>
                <hr className="mb-2" style={{ width: "15%" }}></hr>
                {props.itinerary.activities.map((activity, index) => (
                  <p key={index} style={{ margin: "0.3rem 0 0.3rem 0" }}>
                    <span className="fancySpan">
                      <FaRegCheckSquare /> {activity}
                    </span>
                  </p>
                ))}
                <hr className="mb-2" style={{ width: "15%" }}></hr>
                <div className="rounded pt-1 pb-1">
                  {currentUser && currentUser.email ? (
                    userLikesCurrentItinerary ? (
                      <button
                        className="btn btn-sm btn-primary active align-middle"
                        onClick={handleDislikeClick}
                      >
                        <FaThumbsUp
                          style={{ fontSize: "0.8rem" }}
                          className="pr-2"
                        />
                        <span>Liked</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary align-middle"
                        onClick={handleLikeClick}
                      >
                        <FaThumbsUp
                          style={{ fontSize: "0.8rem" }}
                          className="pr-2"
                        />
                        <span>Like</span>
                      </button>
                    )
                  ) : (
                    <Link to="/log-in">
                      <Button variant="link">Log in to like</Button>
                    </Link>
                  )}
                </div>
                {/* <hr className="mt-2" style={{ width: "15%" }}></hr>
                <span>Last Comments:</span>
                <span className="d-block">coming soon..</span> */}
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey="0"
              className="btn btn-sm btn-secondary"
              style={{
                textAlign: "center",
                width: "100%",
                border: "none",
                backgroundColor: "#f0f0f0",
                margin: "10px 0 -25px 0",
                textDecoration: "none"
              }}
            >
              <span
                className="fancySpan"
                style={{
                  margin: "auto"
                }}
              >
                Click to toggle Details
              </span>
            </Accordion.Toggle>
          </Card>
        </Accordion>
      </div>
    </Fragment>
  );
};

export default Itinerary;
