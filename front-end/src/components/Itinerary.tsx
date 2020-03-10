import React, { FC, Fragment, useContext, useState, useEffect } from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaRegCheckSquare, FaThumbsUp } from "react-icons/fa";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";

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
    }
  }, []);

  currentUser &&
    console.log("currentUser.likedItineraries", currentUser.likedItineraries);
  console.log("props.itinerary._id", props.itinerary._id);
  console.log("props.itinerary.likes", props.itinerary.likes);

  const handleLikeClick = () => {
    console.log("handle like click");
    setUserLikesCurrentItinerary(true);
    setItineraryLikes(itineraryLikes + 1);
    // try {
    //   const addLike = async () => {
    //     await axios.put(`${backendUrl}itineraries/increase-likes`, {
    //       id: props.itinerary._id
    //     });
    //     // await axios.put(
    //     //   `${backendUrl}users/add-liked-itinerary`,
    //     //   {
    //     //     userID: currentUser._id
    //     //   }
    //     // );
    //   };
    //   addLike();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleDislikeClick = () => {
    console.log("handle DISlike click");
    setUserLikesCurrentItinerary(false);
    setItineraryLikes(itineraryLikes - 1);
    // setItineraryLikes(itineraryLikes + 1);
    // try {
    //   const addLike = async () => {
    //     await axios.put(`${backendUrl}itineraries/increase-likes`, {
    //       id: props.itinerary._id
    //     });
    //     // await axios.put(
    //     //   `${backendUrl}users/add-liked-itinerary`,
    //     //   {
    //     //     userID: currentUser._id
    //     //   }
    //     // );
    //   };
    //   addLike();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <Fragment>
      <div
        className="row"
        style={{
          border: "6px solid #fff",
          borderBottom: "34px solid #fff",
          boxShadow: "2px 2px 7px #777",
          margin: "0 0 13px 0",
          backgroundImage: `linear-gradient(#${props.randomColor}20, white)`
        }}>
        <div
          className="col-5 pt-2"
          style={{ backgroundColor: "rgba(183, 183, 183, 0.15)" }}>
          <img
            src={props.itinerary.profilePicture}
            style={{
              borderRadius: "50%",
              maxWidth: "40px",
              marginRight: "5px"
            }}
            alt="Profilepicture of Itinerary Creator"></img>
          <span style={{ display: "block" }}>
            {props.itinerary.profileName}
          </span>
        </div>
        <div className="col-7" style={{ textAlign: "left" }}>
          <span
            className="fancySpan"
            style={{ display: "block", marginTop: "1px" }}>
            {props.itinerary.name}
          </span>
          <span
            style={{
              color: "#151515",
              display: "block"
            }}></span>
          <span
            style={{
              color: "#151515",
              fontStyle: "italic",
              display: "block"
            }}>
            {props.itinerary.hashtags.map((hashtag, index) => (
              <span key={index} style={{ fontStyle: "italic" }}>
                #{hashtag}{" "}
              </span>
            ))}
          </span>
        </div>
        <Accordion style={{ width: "100%" }}>
          <Card
            style={{
              overflow: "initial",
              border: "none",
              borderRadius: "none",
              backgroundColor: "#f9f9f9",
              padding: "0 0.5rem 0"
            }}>
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ padding: ".6rem" }}>
                {props.itinerary.activities.map((activity, index) => (
                  <p key={index} style={{ margin: "0.3rem 0 0.3rem 0" }}>
                    <span className="fancySpan">
                      <FaRegCheckSquare /> {activity}
                    </span>
                  </p>
                ))}
                {/* <hr className="mb-1"></hr> */}
                <div className="alert alert-secondary pt-1 pb-1" role="alert">
                  {userLikesCurrentItinerary ? (
                    <button
                      className="btn btn-sm btn-primary active align-middle mr-3"
                      onClick={handleDislikeClick}>
                      <FaThumbsUp
                        style={{ fontSize: "0.8rem" }}
                        className="pr-2"
                      />
                      <span>Like</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary align-middle mr-3"
                      onClick={handleLikeClick}>
                      <FaThumbsUp
                        style={{ fontSize: "0.8rem" }}
                        className="pr-2"
                      />
                      <span>Like</span>
                    </button>
                  )}
                  <span className="align-middle pr-1">
                    <strong>{itineraryLikes} Likes</strong>
                  </span>
                </div>
                {/* <hr className="mt-1"></hr> */}
                <span>Last Comments:</span>
                <span className="d-block">coming soon..</span>
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Toggle
              eventKey="0"
              style={{
                textAlign: "center",
                marginBottom: "-37px",
                width: "100%",
                border: "none",
                backgroundColor: "transparent",
                height: "37px"
              }}>
              <p
                style={{
                  margin: "auto",
                  fontFamily: "cursive"
                }}
                className="blink">
                Click to toggle Activities
              </p>
            </Accordion.Toggle>
          </Card>
        </Accordion>
      </div>
    </Fragment>
  );
};

export default Itinerary;
