import React, { createContext, useState } from "react";

export const CityContext = createContext({} as Cities);

export const CityProvider: React.FC = (props: any) => {
  const [cities, setCities] = useState<Cities>([
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

  return (
    <CityContext.Provider value={cities}>{props.children}</CityContext.Provider>
  );
};
