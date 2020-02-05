import React from "react";
import { RouteComponentProps } from "react-router-dom";

// this component does magic on any route after /cities, for example http://localhost:3000/cities/32098

const CityDetail: React.FC<RouteComponentProps<City>> = props => {
  // notice the type of type thingy here (<smth<smth>>)
  return (
    <div>
      <p>props.match.params._id:</p>
      <p>{props.match.params._id}</p>
    </div>
  );
};

export default CityDetail;
