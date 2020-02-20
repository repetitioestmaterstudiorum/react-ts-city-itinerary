import React from "react";

type ItinerariesProps = {
  itineraries: Itineraries;
};

const Itinerary: React.FC<ItinerariesProps> = props => {
  console.log("props.itineraries", props.itineraries);

  return (
    <React.Fragment>
      {props.itineraries.map((itinerary: Itinerary, index: Number) => (
        <div key={index.toString()}>
          <img
            src={itinerary.profilePicture}
            style={{ borderRadius: "50%", maxWidth: "50px" }}
          ></img>
          <p>{itinerary.name}</p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Itinerary;
