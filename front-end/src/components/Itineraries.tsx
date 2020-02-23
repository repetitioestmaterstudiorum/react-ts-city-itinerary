import React, { useEffect, useState, useContext } from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import Itinerary from "./Itinerary";

const Itineraries: React.FC<CityProps> = props => {
  // eslint-disable-next-line
  const [itineraries, setItineraries] = useContext(ItineraryContext);
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();
  const cityName = props.city.name;

  const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  useEffect(() => {
    itineraries &&
      setCityItineraries(
        itineraries.filter(
          (itinerary: Itinerary) =>
            itinerary.city.toLowerCase() === cityName.toLowerCase()
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itineraries]);

  return (
    <React.Fragment>
      {cityItineraries &&
        cityItineraries.map((itinerary: Itinerary) => (
          <Itinerary
            itinerary={itinerary}
            key={itinerary._id}
            randomColor={randomColor()}
          />
        ))}
    </React.Fragment>
  );
};

export default Itineraries;
