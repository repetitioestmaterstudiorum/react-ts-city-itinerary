import React, { FC, Fragment } from "react";
import Itinerary from "./Itinerary";

interface CityAndItineraryProps {
  cityName: string;
  cityItineraries: Itineraries;
}

const Itineraries: FC<CityAndItineraryProps> = props => {
  const cityItineraries: Itineraries = props.cityItineraries;

  const randomColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(
      16
    );
    return randomColor;
  };

  return (
    <Fragment>
      {cityItineraries &&
        cityItineraries.map((itinerary: Itinerary) => (
          <Itinerary
            itinerary={itinerary}
            key={itinerary._id}
            randomColor={randomColor()}
          />
        ))}
    </Fragment>
  );
};

export default Itineraries;
