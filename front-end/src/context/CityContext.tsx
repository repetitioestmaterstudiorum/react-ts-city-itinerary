import React, { ReactNode, createContext, useState } from "react";
import axios from "axios";

//initialize the context
const initCityContext: CityContextInterface = {
  cities: [],
  setCities: (cities: Cities) => {
    throw new Error("setCities() not implemented");
  },
  currentCity: null,
  getCurrentCity: (cityName: string) => {
    throw new Error("getCurrentCity() not implemented");
  },
  fetchCities: () => {
    throw new Error("fetchCities() not implemented");
  }
};

export const CityContext = createContext<CityContextInterface>(initCityContext);

export const CityProvider = (props: { children: ReactNode }) => {
  const [cities, setCities] = useState<Cities | null>(null);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;

  const getCurrentCity = async (cityName: string) => {
    const res = await axios.get(`${backendUrl}cities/${cityName}`);
    setCurrentCity(res.data);
  };

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
