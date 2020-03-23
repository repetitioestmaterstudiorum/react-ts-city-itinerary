import React, { FC, Fragment, useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddItinerary from "./AddItinerary";
import { CityContext } from "../context/CityContext";
import Itineraries from "./Itineraries";
import axios from "axios";
import Loader from "./Loader";

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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewItinerary = (itinerary: Itinerary) => {
    console.log("addint itinerary");
    setCityItineraries([...cityItineraries, itinerary]);
  };

  return (
    <div className="container pt-1 pb-1 text-center">
      {currentCity ? (
        <Fragment>
          {currentCity && (
            <div>
              <h1>
                <span style={{ textDecoration: "underline" }}>
                  {currentCity.name}
                </span>
                {", "}
                {currentCity.country}
              </h1>
              <div
                style={{
                  maxWidth: "500px",
                  height: "250px",
                  overflow: "hidden",
                  backgroundImage: `url(${currentCity.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  margin: "0 auto"
                }}
              ></div>
            </div>
          )}
          <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2 className="pb-2 pt-3">Available MYtineraries:</h2>
            {cityItineraries &&
              (cityItineraries.length > 0 ? (
                <Itineraries
                  cityName={props.match.params.name}
                  cityItineraries={cityItineraries}
                />
              ) : (
                "No itineraries were added yet :("
              ))}
          </div>
          {currentCity && (
            <AddItinerary
              cityName={props.match.params.name}
              addNewItinerary={addNewItinerary}
            />
          )}
        </Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CityDetail;
