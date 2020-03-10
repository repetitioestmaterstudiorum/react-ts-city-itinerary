import React, { FC, useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddItinerary from "./AddItinerary";
import { CityContext } from "../context/CityContext";
import Itineraries from "./Itineraries";
import axios from "axios";

const CityDetail: FC<RouteComponentProps<City>> = props => {
  const [currentCity, setCurrentCity] = useState<City>();
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();
  const [cities] = useContext(CityContext);
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  useEffect(() => {
    try {
      const getCurrentCity = async () => {
        const res = await axios.get(
          `${backendUrl}cities/${props.match.params.name}`
        );
        setCurrentCity(res.data);
      };
      getCurrentCity();
    } catch (err) {
      console.log(err);
    }
    // cities &&
    //   setCurrentCity(
    //     cities.filter(
    //       (city: City) => city.name.toLowerCase() === props.match.params.name
    //     )[0]
    //   );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities]);

  useEffect(() => {
    try {
      const getCityItineraries = async () => {
        const res = await axios.get(
          `${backendUrl}itineraries/${props.match.params.name}`
        );
        setCityItineraries(res.data);
      };
      getCityItineraries();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container pt-1 pb-1 text-center">
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
        <h2 className="pb-2 pt-3">Available MYtineraries:</h2>
        {cityItineraries && (
          <Itineraries
            cityName={props.match.params.name}
            cityItineraries={cityItineraries}
          />
        )}
      </div>
      {currentCity && <AddItinerary cityName={props.match.params.name} />}
    </div>
  );
};

export default CityDetail;
