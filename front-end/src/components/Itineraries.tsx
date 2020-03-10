import React, { FC, Fragment, useEffect, useState, useContext } from "react";
import { ItineraryContext } from "../context/ItineraryContext";
import Itinerary from "./Itinerary";

const Itineraries: FC<CityProps> = props => {
  const [itineraries] = useContext(ItineraryContext);
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();
  const cityName: string = props.city.name;

  const randomColor = () => {
    const randomColor: string = Math.floor(Math.random() * 16777215).toString(
      16
    );
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
