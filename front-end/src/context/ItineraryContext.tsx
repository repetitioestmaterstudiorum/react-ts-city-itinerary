import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ItineraryContext = createContext([{}] as any);

export const ItineraryProvider: React.FC = props => {
  const [itineraries, setItineraries] = useState<Itineraries>();

  const port = process.env.PORT || 5000;
  const fetchItineraries = async () => {
    let res = await axios.get(`http://localhost:${port}/itineraries/all`);
    let data = res.data;
    setItineraries(data);
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={[itineraries, setItineraries]}>
      {props.children}
    </ItineraryContext.Provider>
  );
};
