import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// interface Test {
//   anything?: "" | undefined;
// }

// type Testies = Test[] | undefined;

// export const CityContext = createContext([{}] as Cities | Testies | undefined);

//initialize your context
const initCityContext: CityContextInterface = {
  setCities: (cities: Cities) => {
    throw new Error('setCities() not implemented');
  },
  fetchCities: () => {
    throw new Error('fetchCities() not implemented');
  },
  cities: []

}

//added context type
export const CityContext = createContext<CityContextInterface>(initCityContext);

export const CityProvider = (props: { children: React.ReactNode; }) => {
  const [cities, setCities] = useState<Cities | null>(null);

  //writing it this way retriggered fetch citest for every component calling the context
  //better to leave the components in control as context is here to povide an actions and data
  // useEffect(() => {
  //   fetchCities();
  // }, []);

  //you could hold these values in a .env file to avoid repeating
  const backendUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://blooming-beyond-66134.herokuapp.com/";

  //creating fetchCities as a context action to provide to components, 
  //this way components can decide when to call the action
  const fetchCities = async () => {
    try {
      const res = await axios.get(`${backendUrl}cities/all`);
      const data = res.data;
      setCities(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CityContext.Provider value={{ cities, setCities, fetchCities }}>
      {props.children}
    </CityContext.Provider>
  );
};
