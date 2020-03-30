import React, { FC, Fragment, useEffect, useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import AddItinerary from "../itineraries/AddItinerary";
import { CityContext } from "../../context/CityContext";
import Itineraries from "../itineraries/Itineraries";
import axios from "axios";
import Loader from "../../components/Loader";

const CityDetail: FC<RouteComponentProps<City>> = props => {
  const [cityItineraries, setCityItineraries] = useState<Itineraries>();
  const { currentCity, getCurrentCity } = useContext(CityContext);
  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";
  const urlParameterString: string = props.match.params.name;

  useEffect(() => {
    try {
      getCurrentCity(urlParameterString);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      // could be in itinerary context (to be created)
      const getCityItineraries = async () => {
        const res = await axios.get(
          `${backendUrl}itineraries/${urlParameterString}`
        );
        setCityItineraries(res.data);
      };
      getCityItineraries();
    } catch (err) {
      console.log(err);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNewItinerary = (itinerary: Itinerary) => {
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
                  maxWidth: "850px",
                  height: "400px",
                  overflow: "hidden",
                  backgroundImage: `url(${currentCity.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
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
                  cityName={urlParameterString}
                  cityItineraries={cityItineraries}
                />
              ) : (
                "No itineraries were added yet :("
              ))}
          </div>
          {currentCity && (
            <AddItinerary
              cityName={urlParameterString}
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
