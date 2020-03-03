import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CityContext = createContext([{}] as any);

export const CityProvider: React.FC = props => {
  const [cities, setCities] = useState<Cities>();

  useEffect(() => {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${backendUrl}/cities/all`);
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
