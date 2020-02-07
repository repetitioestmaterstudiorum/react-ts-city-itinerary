import React, { createContext, useState, useEffect } from "react";

export const CityContext = createContext({} as Cities);

const CityContextProvider: React.FC = () => {
  const [cities, setCities] = useState<Cities>([]);
  setCities([
    {
      _id: "5e3c2e3e816b6b27d11ffb01",
      name: "Los Angeles",
      country: "USA"
    },
    {
      _id: "6e3c2e3e916b6b27d11ffb02",
      name: "Quebec",
      country: "Canada"
    }
  ]);

  return <CityContext.Provider value={cities}>{cities}</CityContext.Provider>;
};

export default CityContextProvider;
