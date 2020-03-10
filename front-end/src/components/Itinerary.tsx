import React, { FC, Fragment, useContext } from "react";
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
  currentUser &&
    console.log("currentUser.likedItineraries", currentUser.likedItineraries);
  console.log("props.itinerary._id", props.itinerary._id);

  const handleLikeClick = () => {
    console.log("clickedyclick");
    const backendUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000/"
        : "https://blooming-beyond-66134.herokuapp.com/";
    try {
      const addLike = async () => {
        const res = await axios.put(`${backendUrl}users/like`, {
          userID: currentUser._id
        });
      };
      addLike();
    } catch (err) {
      console.log(err);
    }
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
                <hr></hr>
                <button
                  className="btn btn-link align-middle mr-2"
                  onClick={handleLikeClick}>
                  <FaThumbsUp style={{ fontSize: "0.8rem" }} className="pr-2" />
                  <span>Like</span>
                </button>
                <span className="align-middle pr-3">
                  {props.itinerary.likes} Likes
                </span>
                <hr></hr>
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
