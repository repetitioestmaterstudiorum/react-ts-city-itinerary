import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  // notice the type of type thingy here (<smth<smth>>)
  const [city, setCity] = useState<City>();

  const port = process.env.PORT || 5000;

  const fetchCity = () => {
    axios
      .get(`http://localhost:${port}/cities/${props.match.params.name}`)
      .then(res => {
        setCity(res.data[0]);
      });
  };

  useEffect(() => {
    fetchCity();
  }, []);

  return (
    <div className="container">
      {city && (
        <div className="mt-2 text-center">
          <div>
            <h1>
              <span style={{ textDecoration: "underline" }}>{city.name}</span>,{" "}
              {city.country}
            </h1>
            <img src={city.img} alt={`${city.name}, ${city.country}`}></img>
          </div>
          <div>
            <h2>Available MYtineraries:</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDetail;
