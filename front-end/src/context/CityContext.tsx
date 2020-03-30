import React, { ReactNode, createContext, useState } from "react";
import axios from "axios";

//initialize the context
const initCityContext: CityContextInterface = {
  setCities: (cities: Cities) => {
    throw new Error("setCities() not implemented");
  },
  fetchCities: () => {
    throw new Error("fetchCities() not implemented");
  },
  getCurrentCity: (cityName: string) => {
    throw new Error("getCurrentCity() not implemented");
  },
  cities: [],
  currentCity: null
};

export const CityContext = createContext<CityContextInterface>(initCityContext);

export const CityProvider = (props: { children: ReactNode }) => {
  const [cities, setCities] = useState<Cities | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  const getCurrentCity = async (cityName: string) => {
    const res = await axios.get(`${backendUrl}cities/${cityName}`);
    setCurrentCity(res.data);
  };

  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${backendUrl}cities/all`);
      setCities(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CityContext.Provider
      value={{ cities, setCities, fetchCities, currentCity, getCurrentCity }}
    >
      {props.children}
    </CityContext.Provider>
  );
};
