import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ItineraryContext = createContext([{}] as any);

export const ItineraryProvider: React.FC = props => {
  const [itineraries, setItineraries] = useState<Itineraries>();

  useEffect(() => {
    const port = process.env.PORT || 5000;
    const fetchItineraries = async () => {
      let res = await axios.get(`http://localhost:${port}/itineraries/all`);
      let data = res.data;
      setItineraries(data);
    };
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={[itineraries, setItineraries]}>
      {props.children}
    </ItineraryContext.Provider>
  );
};
