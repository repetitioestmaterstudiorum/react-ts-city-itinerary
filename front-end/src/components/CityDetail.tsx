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
            <img src={city.img} alt={`${city.name}, ${city.country}`}></img>
            <p>
              <strong>{city.name}</strong>, {city.country}
            </p>
          </div>
          <div>
            <p style={{ textDecoration: "underline" }}>
              Available MYtineraries:
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDetail;
