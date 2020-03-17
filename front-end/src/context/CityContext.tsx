import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// interface Test {
//   anything?: "" | undefined;
// }

// type Testies = Test[] | undefined;

// export const CityContext = createContext([{}] as Cities | Testies | undefined);

export const CityContext = createContext([{}] as any);

export const CityProvider: React.FC = props => {
  const [cities, setCities] = useState<Cities>();

  useEffect(() => {
    const backendUrl: string =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000/"
        : "https://blooming-beyond-66134.herokuapp.com/";
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${backendUrl}cities/all`);
        const data = res.data;
        setCities(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={[cities, setCities]}>
      {props.children}
    </CityContext.Provider>
  );
};
