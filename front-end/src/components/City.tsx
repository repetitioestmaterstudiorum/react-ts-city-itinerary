import React from "react";

const City: React.FC<CitiesProps> = ({ oneCity }) => {
  const { city } = oneCity;
  console.log(city);
  return <React.Fragment>{<p>{city}</p>}</React.Fragment>;
};

export default City;
