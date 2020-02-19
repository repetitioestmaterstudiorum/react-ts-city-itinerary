import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddItinerary from "./AddItinerary";
import { ItineraryContext } from "../context/ItineraryContext";
import { CityContext } from "../context/CityContext";
import Itinerary from "./Itinerary";

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  const [city, setCity] = useState<City>();
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();
  // eslint-disable-next-line
  const [itineraries, setItineraries] = useContext(ItineraryContext);
  // eslint-disable-next-line
  const [cities, setCities] = useContext(CityContext);
  // const [cityItineraries, setCityItineraries] = useState<Itineraries>();

  useEffect(() => {
    cities &&
      setCity(
        cities.filter(
          (city: City) => city.name.toLowerCase() === props.match.params.name
        )[0]
      );
  }, [cities]);

  useEffect(() => {
    itineraries &&
      setCityItineraries(
        itineraries.filter(
          (itinerary: Itinerary) =>
            itinerary.city.toLowerCase() === props.match.params.name
        )
      );
  }, [itineraries]);

  return (
    <div className="container">
      <div className="mt-2 text-center">
        {city && (
          <div>
            <h1>
              <span style={{ textDecoration: "underline" }}>{city.name}</span>{" "}
              {city.country}
            </h1>
            <img src={city.img} alt={`${city.name}, ${city.country}`}></img>
          </div>
        )}
        <div>
          <h2>Available MYtineraries:</h2>
          {cityItineraries && <Itinerary itineraries={cityItineraries} />}
        </div>
        {city && <AddItinerary city={city} />}
      </div>
    </div>
  );
};

export default CityDetail;
