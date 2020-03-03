import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddItinerary from "./AddItinerary";
import { CityContext } from "../context/CityContext";
import Itineraries from "./Itineraries";

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  const [currentCity, setCurrentCity] = useState<City>();
  const [cities] = useContext(CityContext);

  useEffect(() => {
    cities &&
      setCurrentCity(
        cities.filter(
          (city: City) => city.name.toLowerCase() === props.match.params.name
        )[0]
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  return (
    <div className="container mt-2 text-center">
      {currentCity && (
        <div>
          <h1>
            <span style={{ textDecoration: "underline" }}>
              {currentCity.name}
            </span>
            {", "}
            {currentCity.country}
          </h1>
          <img
            src={currentCity.img}
            alt={`${currentCity.name}, ${currentCity.country}`}></img>
        </div>
      )}
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <h2 className="mb-3">Available MYtineraries:</h2>
        {currentCity && <Itineraries city={currentCity} />}
      </div>
      {currentCity && <AddItinerary city={currentCity} />}
    </div>
  );
};

export default CityDetail;
