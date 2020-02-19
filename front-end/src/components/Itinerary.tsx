import React from "react";

type ItinerariesProps = {
  itineraries: Itineraries;
};

const Itinerary: React.FC<ItinerariesProps> = props => {
  return (
    <React.Fragment>
      <h3>Hi</h3>
      {props.itineraries.map((itinerary: Itinerary, index: Number) => (
        <div key={index.toString()}>
          <p>{itinerary.name}</p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Itinerary;
