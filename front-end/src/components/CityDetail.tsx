import React, { useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";
import AddItinerary from "./AddItinerary";
import { ItineraryContext } from "../context/ItineraryContext";

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  // notice the type of type thingy here (<smth<smth>>)
  const [city, setCity] = useState<City>();
  // eslint-disable-next-line
  const [itineraries, setItineraries] = useContext(ItineraryContext);
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();

  const port = process.env.PORT || 5000;

  const fetchCity = () => {
    axios
      .get(`http://localhost:${port}/cities/${props.match.params.name}`)
      .then(res => {
        setCity(res.data[0]);
      });
  };

  const fetchCityItineraries = () => {
    axios
      .get(`http://localhost:${port}/itineraries/${props.match.params.name}`)
      .then(res => {
        setCityItineraries(res.data);
      });
  };

  useEffect(() => {
    fetchCity();
  }, []);

  useEffect(() => {
    fetchCityItineraries();
  }, [itineraries]);

  return (
    <div className="container">
      {city && (
        <div className="mt-2 text-center">
          <div>
            <h1>
              <span style={{ textDecoration: "underline" }}>{city.name}</span>,{" "}
              {city.country}
            </h1>
            <img src={city.img} alt={`${city.name}, ${city.country}`}></img>
          </div>
          <div>
            <h2>Available MYtineraries:</h2>
          </div>
          <AddItinerary city={city.name} />
          {console.log("city", city)}
          {console.log("cityItineraries", cityItineraries)}
          {console.log("itineraries", itineraries)}
        </div>
      )}
    </div>
  );
};

export default CityDetail;
