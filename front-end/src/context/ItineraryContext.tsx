import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ItineraryContext = createContext([{}] as any);

export const ItineraryProvider: React.FC = props => {
  const [itineraries, setItineraries] = useState<Itineraries>();

  useEffect(() => {
    const backendUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000"
        : "https://blooming-beyond-66134.herokuapp.com/";
    const fetchItineraries = async () => {
      try {
        const res = await axios.get(`${backendUrl}/itineraries/all`);
        const data = res.data;
        setItineraries(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItineraries();
  }, []);

  return (
    <ItineraryContext.Provider value={[itineraries, setItineraries]}>
      {props.children}
    </ItineraryContext.Provider>
  );
};
