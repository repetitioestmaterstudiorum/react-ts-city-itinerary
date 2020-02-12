import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

// this component does magic on any route after /cities, for example http://localhost:3000/cities/32098

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  // notice the type of type thingy here (<smth<smth>>)

  let data: any = {};

  const port = process.env.PORT || 5000;

  const fetchCity = () => {
    axios
      .get(`http://localhost:${port}/cities/${props.match.params.name}`)
      .then(res => {
        console.log("res", res.data[0]);
        data = res.data[0];
        console.log('data["name"]', data["name"]);
      });
  };

  useEffect(() => {
    fetchCity();
  }, []);

  return (
    <div className="container">
      <p>props.match.params.name:</p>
      {/* <p>{props.match.params.name}</p> */}
      <p>{data && data["name"]}</p>
    </div>
  );
};

export default CityDetail;
