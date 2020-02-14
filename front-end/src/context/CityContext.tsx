import React, { createContext, useState, useEffect, Dispatch } from "react";
import axios from "axios";

// export const CityContext = createContext({} as any);
export const CityContext = createContext([{}] as any);

export const CityProvider: React.FC = props => {
  const [cities, setCities] = useState<Cities>();

  const port = process.env.PORT || 5000;
  const fetchCities = async () => {
    let res = await axios.get(`http://localhost:${port}/cities/all`);
    let data = res.data;
    setCities(data);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={[cities, setCities]}>
      {props.children}
    </CityContext.Provider>
  );
};
