import React from "react";

type CitiesProps = {
  city: City;
};

const City: React.FC<CitiesProps> = ({ city }) => {
  const { name } = city;
  return (
    <React.Fragment>
      <p>{name}</p>
    </React.Fragment>
  );
};

export default City;
