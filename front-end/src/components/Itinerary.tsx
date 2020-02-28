import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaRegCheckSquare } from "react-icons/fa";

type ItineraryProps = {
  itinerary: Itinerary;
  randomColor: string;
};

const Itinerary: React.FC<ItineraryProps> = props => {
  return (
    <React.Fragment>
      <div
        className="row"
        style={{
          border: "6px solid #fff",
          borderBottom: "34px solid #fff",
          boxShadow: "2px 2px 7px #777",
          margin: "0 0 13px 0",
          backgroundImage: `linear-gradient(#${props.randomColor}20, white)`
        }}
      >
        <div
          className="col-5 pt-2"
          style={{ backgroundColor: "rgba(183, 183, 183, 0.15)" }}
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
        <div className="col-7" style={{ textAlign: "left" }}>
          <span
            className="fancySpan"
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
            {props.itinerary.likes} Likes
          </span>
          <span
            style={{
              color: "#151515",
              fontStyle: "italic",
              display: "block"
            }}
          >
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
            }}
          >
            <Accordion.Collapse eventKey="0">
              <Card.Body style={{ padding: ".6rem" }}>
                {props.itinerary.activities.map((activity, index) => (
                  <p key={index} style={{ margin: "0.3rem 0 0.3rem 0" }}>
                    <span className="fancySpan">
                      <FaRegCheckSquare /> {activity}
                    </span>
                  </p>
                ))}
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
              }}
            >
              <p
                style={{
                  margin: "auto",
                  fontFamily: "cursive"
                }}
              >
                Click to toggle Activities
              </p>
            </Accordion.Toggle>
          </Card>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export default Itinerary;
