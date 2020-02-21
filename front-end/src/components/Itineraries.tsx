import React from "react";
import { Accordion, Card } from "react-bootstrap";

type ItinerariesProps = {
  itineraries: Itineraries;
};

const Itineraries: React.FC<ItinerariesProps> = props => {
  console.log("props.itineraries", props.itineraries);

  return (
    <React.Fragment>
      {props.itineraries.map((itinerary: Itinerary, index: Number) => (
        <div key={index.toString()} style={{}}>
          <div>
            <img
              src={itinerary.profilePicture}
              style={{
                borderRadius: "50%",
                maxWidth: "50px",
                marginRight: "5px"
              }}
              alt="Profilepicture of Itinerary Creator"
            ></img>
            <span className="fancySpan">{itinerary.name}</span>
          </div>
          <div>Hashtags:</div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Itineraries;
